
import { MEMORIZATION_FILE_NAME } from '../constants';
import { FileStorage } from './storage';

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
          return {from, to, add, ex, rating: 0} })
      });
    }
  }

  

  getPack(){
    const ratings = this.state.progress.map(pack=>(pack.dictionary.reduce((acc, {rating})=> acc + rating, 0)||1)/pack.dictionary.length);

    const sum = ratings.reduce((a,i)=>a+i);

    const weights = ratings.map(i=>(i/sum));

  }


  isEmpty(){
    const { queue, progress, done } = this.state;
    return queue.length === 0 && progress.length === 0 && done.length === 0;
  }

  isEnough(){
    return this.progressLength() >= PROGRESS_MIN_LENGTH;
  }

  progressLength(){
    return this.state.progress.reduce((acc, item)=>{
      return item.dictionary.length + acc
    },0)
  }

  save(){
    this.db.set(this.state);
  }

}