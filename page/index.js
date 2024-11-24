import { getText } from '@zos/i18n'
import { getDeviceInfo } from "@zos/device";
import { createWidget, widget, prop, text_style, event, align } from '@zos/ui'
import { updateStatusBarTitle, redraw, deleteWidget } from '@zos/ui'
import { Vibrator, VIBRATOR_SCENE_SHORT_STRONG } from '@zos/sensor'

import { CURRENT_FILE_NAME, DEFAULT_SETTINGS, SETTINGS_FILE_NAME, MEMORIZATION_FILE_NAME } from '../constants';
import { BasePage } from '@zeppos/zml/base-page'
import * as Styles from 'zosLoader:./index.[pf].layout.js'
import { getDiskInfo } from '@zos/device'
import { push } from '@zos/router'
import { FileStorage } from '../utils/storage';
import { MemorizationStorage } from '../utils/memorization-storage';

const tobe = {"group": "to be",
  "first":"sr",
  "second":"en",
  "dictionary":[
      {"first":"ja sam", "second":"I am"},
      {"first":"ti si", "second":"you are (sing.)"},
      {"first":"on je", "second":"he/it (masculine) is"},
      {"first":"ona je", "second":"she/it (feminine) is"},
      {"first":"ono je", "second":"it (neuter) is"},
      {"first":"mi smo", "second":"we are"},
      {"first":"vi ste", "second":"you are (pl.)"},
      {"first":"oni su", "second":"they (masculine) are"},
      {"first":"one su", "second":"they (feminine) are"},
      {"first":"ona su", "second":"they (neuter) are"}
  ]
  
  }

const { total } = getDiskInfo()
console.log('getDiskInfo',total)


const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
const BAR_HEIGHT = 64;
const PADDING = 16;
const GAP = 8;



Page(BasePage({
  //buzzer: new Buzzer(),
  state: {
    step: 'question',
    question: 'Ja sam',
    first: 'sr',
    second: 'en',
    strict: true,
    variants: {
      'I am': true,
      'You are': false,
      'He is': false,
      'We are': false
    },
    settings: {}
  },
  db: {
    
  },

  updateStatusBarTitle() {
    const settings = this.db.settings.get();
    console.log(this.state.strict, settings.nativeLanguage);
    
    this.state.strict ? updateStatusBarTitle(`${settings.nativeLanguage} - ${settings.foreignLanguage}`) : updateStatusBarTitle(`${settings.foreignLanguage} - ${settings.nativeLanguage}`)
  
  },
  initDB() {
    this.db.current = new FileStorage(CURRENT_FILE_NAME, []);
    this.db.settings = new FileStorage(SETTINGS_FILE_NAME);
    this.memorizationStorage = new MemorizationStorage();
  },
  initState(table) {
    const state = this.state;
    state.step = 'question';
    state.first = table.first;
    state.second = table.second;
    const dictionary = [...(table.dictionary)].sort(() => 0.5 - Math.random());
    
    state.strict = Math.random() > 0.5;
    if (state.strict) {
      state.question = dictionary[0].first;
    } else {
      state.question = dictionary[0].second;
    }
  
    const four = dictionary.slice(0, 4);

    state.variants = {};
    four.forEach((variant) => {
      state.variants[state.strict ? variant.second : variant.first] = (state.strict ? variant.first : variant.second) === state.question;
    })
    state.entries = Object.entries(this.state.variants).sort(() => 0.5 - Math.random());
    this.updateStatusBarTitle();
  },
  sizes: {},
  calcSizes() {
    const textH = 64;
    const buttonW = (DEVICE_WIDTH - GAP - 2 * PADDING) / 2;
    const buttonH = (DEVICE_HEIGHT - textH - BAR_HEIGHT - PADDING - GAP * 2) / 2
    this.sizes.text = { h: 64 };
    this.sizes.button = { h: buttonH, w: buttonW };
  },
  widgets: [],
  draw() {
    while (this.widgets.length) {
      const widget = this.widgets.pop();
      deleteWidget(widget);
    }
    redraw();
    const { text: { h: textH }, button: { w: buttonW, h: buttonH } } = this.sizes;
    
    this.widgets.push(createWidget(widget.TEXT, {
      x: 0,
      y: BAR_HEIGHT,
      w: DEVICE_WIDTH,
      h: textH,
      color: 0xffffff,
      text_size: 20,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.WRAP,
      text: this.state.question
    }));
    this.state.entries.forEach(([value, result], index) => {

      const buttonX = index % 2 ? PADDING : PADDING + GAP + buttonW;
      
      const buttonY = BAR_HEIGHT + textH + GAP + (index >> 1) * (buttonH + GAP);

      const buttonColor = this.state.step === 'question' ? 0x0f52ba :
        (result ? 0x0fba52 : 0xba0f52);

      if (this.state.step === 'question' || result || (!this.state.step.result && this.state.step.index === index)) {
        const button = createWidget(widget.BUTTON, {
          x: buttonX,
          y: buttonY,
          w: buttonW,
          h: buttonH,
          radius: 16,
          normal_color: buttonColor,
          press_color: buttonColor,
        })
  
        this.widgets.push(button);

        const answer = createWidget(widget.TEXT, {
          x: buttonX + GAP,
          y: buttonY,
          w: buttonW - 2 * GAP,
          h: buttonH,
          color: 0xffffff,
          text_size: 20,
          align_h: align.CENTER_H,
          align_v: align.CENTER_V,
          text_style: text_style.WRAP,
          text: value,
        });

        if (this.state.step === 'question' || result) {

          answer.addEventListener(event.CLICK_DOWN, (info) => {
          
            button.setProperty(prop.MORE, {
              x: buttonX,
              y: buttonY,
              w: buttonW,
              h: buttonH,
              radius: 12,
              normal_color: this.state.step === 'question' ? 0x1E90FF : 0x3fda72,
              press_color: this.state.step === 'question' ? 0x1E90FF : 0x3fda72,
            })
            
          });
  
          answer.addEventListener(event.CLICK_UP, (info) => {
            if (this.state.step === 'question') {
              this.state.step = { result: result, index }
              if (!result) {
                this.vibrator.start({ mode: VIBRATOR_SCENE_SHORT_STRONG });
              }
              
            } else {
              this.initState(tobe);
            }
            
            this.draw();
          });

        }

        this.widgets.push(answer);
      }

    })
  },
  onInit() {
    console.log('index.onInit');
    this.initDB();
    if(!this.db.settings.has()){
      push({
        url: 'page/settings'
      })
      return;
    }
    if(this.memorizationStorage.isEmpty()){
      push({
        url: 'page/start'
      })
      return;
    }

    if(this.memorizationStorage.isEnough()){
      push({
        url: 'page/memorization'
      })
      return;
    }

    console.log('2');
    this.vibrator = new Vibrator();
    this.calcSizes();
    
    
    this.initState(tobe);
  },
  build() {
    console.log('index.build')
    this.draw();
    
  },
  onCall({ result }) {
    this.applySettings(result);
    },
    onDestroy() {
      console.log('index.onDestroy')
    }
}));


