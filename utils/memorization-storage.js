
import { MEMORIZATION_FILE_NAME } from '../constants';
import { FileStorage } from './storage';
import {weightRandom} from './weight-random';

const PROGRESS_MIN_LENGTH = 10;

export class MemorizationStorage {
  constructor() {
      this.db = new FileStorage(MEMORIZATION_FILE_NAME);
      
      if(this.db.has()){
        this.state = this.db.get();
      } else {
        this.state = {
          queue: [],
          progress: [],
          done:[]
        }
      }
  }

  addLanguagePack(languagePack) {
    const { queue, progress, done } = this.state;
    if(queue.some(item=>item.topic === languagePack.topic)){
      console.log('language pack with this topic is already in queue')
    } else if(progress.some(item=>item.topic === languagePack.topic)){
      console.log('language pack with this topic is already in progress')
    } else if(done.some(item=>item.topic === languagePack.topic)){
      console.log('language pack with this topic is already in done')
    } else {
      queue.push(languagePack);
      if(this.progressLength() < PROGRESS_MIN_LENGTH){
        this.moveFromQueueToProgress();
      }
      this.save();
    }
  }

  moveFromQueueToProgress(){
    const { queue, progress} = this.state;
    const languagePack = queue.shift();
    if(languagePack){
      const {topic, dictionary} =languagePack;
      progress.push({
        topic,
        dictionary:dictionary.map(([from, to, adds={}])=>{
          const {add, ex} = adds;
          const [addFrom, addTo] = add||[];
          return {from, to, addFrom, addTo, ex, rating: 0} })
      });
    }
  }

  sendResult(card, correct){
    console.log(correct);
    if(correct)
      card.rating = card.rating + 1;
    else
      card.rating = Math.max(card.rating - 1, 0);
    console.log(JSON.stringify(card));
    this.save();
  }

  getRandomPack(){
    const ratings = this.state.progress.map((pack)=> {
      const rating = pack.dictionary.reduce((acc, {rating})=> acc + rating, 0)/pack.dictionary.length;
      return Math.max(1,Math.min(4, rating));
    });
    const index = weightRandom(ratings);
    return this.state.progress[index];
  }

  getRandomCards(num){
    const pack = this.getRandomPack();
    let dictionary = pack.dictionary
    .filter((i)=>i.rating < 4)
    .map(i=>({order: Math.max(1,Math.min(4, i.rating))*Math.random(),i}))
    .sort((a,b)=>  a.order - b.order)
    .map(i=>i.i);
    if(dictionary.length < num ){
      const add = pack.dictionary
      .filter((i)=>i.rating >= 4)
      .sort(()=> Math.random < 0.5)
      .slice(0, num - dictionary.length);
      dictionary.push(...add);
    }
    return dictionary.slice(0, num);
  }


  isEmpty(){
    const { queue, progress, done } = this.state;
    return queue.length === 0 && progress.length === 0 && done.length === 0;
  }

  isEnough(){
    return this.progressLength() >= PROGRESS_MIN_LENGTH;
  }

  progressLength(onlyActive = false){
    return this.state.progress.reduce((acc, item)=>{
      if(onlyActive){
        return item.dictionary.filter(i=>i.rating < 4).length + acc;
      }else{
        return item.dictionary.length + acc;
      }
    },0)
  }

  progressRating(){
    return this.state.progress.reduce((acc, item)=>{
      
      return item.dictionary.reduce((a,i)=>i.rating + a, 0) + acc;

    },0)
  }

  save(){
    this.db.set(this.state);
  }

}