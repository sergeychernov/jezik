import { getText } from '@zos/i18n'
import { getDeviceInfo } from "@zos/device";
import { createWidget, widget, prop, text_style, event, align } from '@zos/ui'
import { updateStatusBarTitle } from '@zos/ui'

import * as Styles from 'zosLoader:./index.[pf].layout.js'
import { getDiskInfo } from '@zos/device'

const { total } = getDiskInfo()
console.log('getDiskInfo',total)


const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
const BAR_HEIGHT = 64;
const PADDING = 16;
const GAP = 16;

Page({
  state: {
    question: 'Ja sam',
    first:'sr',
    second:'en',
    strict: true,
    variants: {
      'I am': true,
      'You are': false,
      'He is': false,
      'We are': false
    }
  },
  build() {
    const page = getCurrentPage()
    console.log('Page Build', DEVICE_WIDTH, DEVICE_HEIGHT)
    console.log(getText(page.state.answer))
    const textH = 64;
    const text = createWidget(widget.TEXT, {
      x: 0,
      y: BAR_HEIGHT,
      w: DEVICE_WIDTH,
      h: textH,
      color: 0xffffff,
      text_size: 16,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: page.state.question
    })
    const entries = Object.entries(this.state.variants);
    entries.forEach(([value, result], index)=>{

      const buttonW = (DEVICE_WIDTH-48)/2;

      const buttonX = index % 2?16:PADDING+GAP+buttonW;
      const buttonH = (DEVICE_HEIGHT - textH - BAR_HEIGHT - PADDING - GAP * 2)/2
      const buttonY = BAR_HEIGHT + textH + GAP + (index >> 1)*(buttonH + GAP);


      createWidget(widget.BUTTON, {
        x: buttonX,
        y: buttonY,
        w: buttonW,
        h: buttonH,
        radius: 8,
        normal_color: 0x0f52ba,
        press_color: 0x1E90FF,
        text: value,
        click_func: (button_widget) => {
          
        }
      })

    })
    

    this.state.strict?updateStatusBarTitle(`${this.state.first} - ${this.state.second}`):updateStatusBarTitle(`${this.state.second} - ${this.state.first}`)
  }
})


