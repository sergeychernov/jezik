import { log as Logger } from "@zos/utils";
App({
  globalData: {
    text:'text'
  },
  onCreate(options) {
    console.log('app on create invoke')
    console.log(this.globalData.text)
  },

  onDestroy(options) {
    console.log('app on destroy invoke')
    console.log(this.globalData.text)
  }
})


const app = getApp()
console.log('----------------------')
console.log(app._options.globalData.text)
