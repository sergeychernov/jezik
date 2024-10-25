import { BaseSideService } from '@zeppos/zml/base-side'
import { settingsLib } from '@zeppos/zml/base-side'

import { CURRENT_DEFAULT, DEFAULT_SETTINGS } from '../constants'

function getSettings() {
  const settings = settingsLib.getItem('settings');
  console.log('settings', settings);
  return settings
    ? settings
    : [...DEFAULT_SETTINGS]
}
AppSideService(
  BaseSideService({
    onInit() {},
    onRequest(req, res) {
      console.log('app-side.onRequest', req.method)
      if (req.method === 'SETTINGS') {
        res(null, {
          result: getSettings()
        })
      } 
    },
    onSettingsChange({ key, newValue, oldValue }) {
      this.call({
        result: getSettings()
      })
    },
    onRun() {},
    onDestroy() {}
  })
)
