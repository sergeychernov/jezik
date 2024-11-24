
import { MemorizationStorage } from '../utils/memorization-storage';
import { getText } from '@zos/i18n';
import createText from '../widgets/text-widget';

const pageName = 'memorization';
Page({

    state: {
      settings: {},
      state:'menu'
    },
    db: {
    
    },
    initDB() {
      this.memorizationStorage = new MemorizationStorage();
    },
    onInit() {
        console.log(`${pageName}.onInit`);
      this.initDB();
    },
    draw() {
        
        const { bottom: titleBottom} = createText(getText(pageName), {name:'title'});
    },
    build() {
        console.log(`${pageName}.build`);
        this.draw();
    }
  })
