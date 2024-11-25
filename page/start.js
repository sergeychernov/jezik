import { DEMO, SETTINGS_FILE_NAME } from '../constants';
import { getText } from '@zos/i18n';
import createText from '../widgets/text-widget';
import {createTextButtonWidget} from '../widgets/button-widget';

import { FileStorage } from '../utils/storage';
import { MemorizationStorage } from '../utils/memorization-storage';


import {GAP, PADDING, DEVICE_WIDTH} from '../widgets/constants';

import { push } from '@zos/router'

const pageName = 'start';


Page({

    state: {
      settings: {},
      state:'menu'
    },
    db: {
    
    },
    initDB() {
      this.memorizationStorage = new MemorizationStorage();
      this.state.settings = (new FileStorage(SETTINGS_FILE_NAME)).get();
    },
    onInit() {
      console.log(`${pageName}.onInit`);
      this.initDB();
    },
    build() {
      console.log(`${pageName}.build`);
      const { bottom: titleBottom} = createText(getText(pageName), {name:'title'});

      const {nativeLanguage, foreignLanguage } = this.state.settings;
      if(DEMO[foreignLanguage] && DEMO[foreignLanguage][nativeLanguage]){

        //TODO: fetch demo
        createTextButtonWidget(DEMO[foreignLanguage][nativeLanguage].topic, ()=>{
          const languagePack = DEMO[foreignLanguage][nativeLanguage];
          this.memorizationStorage.addLanguagePack(languagePack);
          push({
            url: 'page/index'
          })
          
  
  
  
        }, {name:"blue"}, {y:titleBottom+ GAP,x:PADDING,w:DEVICE_WIDTH - 2* PADDING})
        
  
      }
      
    }
  })
