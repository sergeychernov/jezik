import { BaseApp } from '@zeppos/zml/base-app'
App(BaseApp({

  onCreate(options) {
    console.log('app on create invoke')
  },

  onDestroy(options) {
    console.log('app on destroy invoke')
  }
}))


const app = getApp();
