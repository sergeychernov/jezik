
import { MemorizationStorage } from '../utils/memorization-storage';
import { GAP, DEVICE_HEIGHT, DEVICE_WIDTH, PADDING } from '../widgets/constants';
import createText from '../widgets/text-widget';
import { createWidget, widget, prop, text_style, event, align } from '@zos/ui'
import {createTextButtonWidget} from '../widgets/button-widget';
import { updateStatusBarTitle, redraw, deleteWidget } from '@zos/ui'

import { Vibrator, VIBRATOR_SCENE_SHORT_STRONG } from '@zos/sensor'

const pageName = 'memorization';
Page({

    state: {
      settings: {},
      step: 'question',
      strict: true,

    },
    db: {
    
    },
    widgets: [],
    initDB() {
      this.memorizationStorage = new MemorizationStorage();
    },
    makeAQuestion(){
      const four = this.memorizationStorage.getRandomCards(4);
      this.state.strict = Math.random() > 0.5;
      this.state.question = this.state.strict ? {word: four[0].from, add: four[0].addFrom}:{word: four[0].to, add: four[0].addTo};
      this.state.variants = four.sort(() => 0.5 - Math.random());
      this.state.step = 'question';
      this.state.wordsToStudy = this.memorizationStorage.progressLength(true);
      this.state.progressRating = this.memorizationStorage.progressRating();
    },
    makeResult(answers, index, correct){
      this.state.step = { result: correct, index };
      this.memorizationStorage.sendResult(answers[index][0], correct);
      if (!correct) {
        answers.filter(([,c])=>c).forEach(([a])=>{this.memorizationStorage.sendResult(a, correct);});
        this.vibrator.start({ mode: VIBRATOR_SCENE_SHORT_STRONG });
      }
    },
    onInit() {
      console.log(`${pageName}.onInit`);
      this.initDB();
      this.makeAQuestion();
      this.vibrator = new Vibrator();
    },
    draw() {
      while (this.widgets.length) {
        const widget = this.widgets.pop();
        deleteWidget(widget);
      }
      redraw();
      const {question, variants, strict, step, wordsToStudy, progressRating} = this.state;
        const { right: titleRight, bottom:questionBottom, textWidget} = createText(question.word, {name:'title'});
        this.widgets.push(textWidget);
        if(question.add){
          const {textWidget: subtitleWidget} = createText(question.add, {name:'subtitle'},{x:(titleRight + GAP)});
          this.widgets.push(subtitleWidget);
        }

        const {textWidget: statsWidget, right: statsRight} =  createText(wordsToStudy.toString(), {},{x:DEVICE_WIDTH-100});
        this.widgets.push(statsWidget);
        const {textWidget: ratingWidget} =  createText(progressRating.toString(), {},{x:statsRight + GAP});
        this.widgets.push(ratingWidget);

        

        const buttonWidth = (DEVICE_WIDTH - GAP - 2* PADDING)/2;
        const buttonHeight = (DEVICE_HEIGHT - 2 * GAP - PADDING - questionBottom)/2;
        const answers = variants.map(variant=>[variant, (strict ? variant.from : variant.to) === question.word && (strict ? variant.addFrom : variant.addTo) === question.add])
        answers.forEach(([answer, correct], index) => {
          
          const buttonColor = step === 'question' ? 'blue' :(correct ? 'green' : 'red');

          const buttonX = index % 2 ? PADDING : PADDING + GAP + buttonWidth;
          const buttonY = questionBottom + GAP + (index >> 1) * (buttonHeight + GAP);
          if(step === 'question' || step.index === index || correct)
          {
            const {buttonWidget, textWidget: buttonTextWidget, addWidget } = createTextButtonWidget(strict? answer.to: answer.from, ()=>{
              console.log('correct', correct);
              if (step === 'question') {
                this.makeResult(answers, index, correct);
              }
              else if( correct){
                this.makeAQuestion();
              }
              this.draw();
            },{name: buttonColor, textSize: 20},{x: buttonX,
                  y: buttonY,
                  w: buttonWidth,
                  h: buttonHeight}, strict? answer.addTo: answer.addFrom);
                  this.widgets.push(buttonWidget);
                  this.widgets.push(buttonTextWidget);
                  if(addWidget)
                    this.widgets.push(addWidget);
          }

          
        
        });

    },
    build() {
        console.log(`${pageName}.build`);
        this.draw();
    }
  })
