import { createWidget, widget, align, prop, text_style } from '@zos/ui';
import { getText } from '@zos/i18n'
import { SETTINGS_FILE_NAME } from '../constants';

import createText from '../widgets/text-widget';
import {createSelectWidget, createMenu} from '../widgets/select-widget';
import {createTextButtonWidget} from '../widgets/button-widget';
import {GAP, PADDING, DEVICE_WIDTH, BAR_HEIGHT, DEVICE_HEIGHT} from '../widgets/constants';
import { showToast } from '@zos/interaction'
import { push } from '@zos/router'
import { FileStorage } from '../utils/storage'
Page({

    state: {
      settings: {},
      state:'menu'
    },
    db: {
    
    },
    initDB() {
      this.db.settings = new FileStorage(SETTINGS_FILE_NAME);
    },
    onInit() {
      console.log('settings.onInit');
      this.initDB();
    },
    build() {
      console.log('settings.build')
      const { bottom: titleBottom} = createText(getText('settings'), {name:'title'});
      
      const { bottom: nativeTextBottom, right: nativeTextRight, layout: nativeTextLayout} = createText(getText('native-language'), {name: 'subtitle'}, {y:titleBottom+ GAP});
      const nativeValues = [{name:'Английский', value:'en'}, {name:'Русский', value:'ru'}];
      const selectNativeLanguage = createSelectWidget('Выбрать', {name: 'blue'}, {y:titleBottom+ GAP, x:nativeTextRight + GAP, w: DEVICE_WIDTH - nativeTextRight - GAP- PADDING});
      
      const { bottom: foreignTextBottom, right: foreignTextRight, layout: foreignTextLayout} = createText(getText('foreign-language'), {name: 'subtitle'}, {y:selectNativeLanguage.bottom+ GAP});
      
      const foreignValues = [{name:'Английский', value:'en'}, {name:'Сербский', value:'sr'}];
      const selectForeignLanguage = createSelectWidget('Выбрать',{name: 'blue'}, {y:selectNativeLanguage.bottom+ GAP, x:foreignTextRight + GAP, w: DEVICE_WIDTH - foreignTextRight - GAP- PADDING});
      
      createTextButtonWidget('Сохранить', ()=>{
        if(!this.state.settings.nativeLanguage){
          showToast({
            content: 'Необходимо выбрать родной язык',
          });
        } else if(!this.state.settings.foreignLanguage){
          showToast({
            content: 'Необходимо выбрать иностранный язык',
          });
        } else {
          console.log('this.db.settings',this.db.settings);
          this.db.settings.set(this.state.settings);
          push({
            url: 'page/index'
          });
        }
      }, {name:"blue"}, {y:selectForeignLanguage.bottom+ GAP,x:PADDING,w:DEVICE_WIDTH - 2* PADDING})
      createMenu(selectNativeLanguage,({name, value})=>{
        selectNativeLanguage.buttonWidget.setProperty(prop.TEXT, 
          name
        );
        this.state.settings = {...this.state.settings, nativeLanguage: value};
        
        selectNativeLanguage.buttonWidget.setProperty(prop.MORE, {
          text: name
        })
      }, nativeValues,
      );

      createMenu(selectForeignLanguage,({name, value})=>{
        selectForeignLanguage.buttonWidget.setProperty(prop.TEXT, 
          name
        );
        this.state.settings = {...this.state.settings, foreignLanguage: value};
        
        selectForeignLanguage.buttonWidget.setProperty(prop.MORE, {
          text: name
        })
      }, foreignValues);

      
    }
  })
