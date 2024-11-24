import { MEMORIZATION_FILE_NAME } from '../constants';

import { FileStorage } from '../utils/storage'
Page({

    state: {
      settings: {},
      state:'menu'
    },
    db: {
    
    },
    initDB() {
      this.db.memorization = new FileStorage(MEMORIZATION_FILE_NAME);
    },
    onInit() {
      console.log('memorization.onInit');
      this.initDB();
    },
    build() {
      console.log('memorization.build')
      
      
    }
  })
