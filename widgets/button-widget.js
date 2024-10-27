import { createWidget, widget, align, prop, text_style, event } from '@zos/ui';
import { getTextLayout } from '@zos/ui'
import { DEVICE_WIDTH } from './constants';

function color(style){
    switch(style){
        case 'blue':
            return {normal_color: 0x0f52ba,
                press_color: 0x0f52ba};
        case 'green':
            return {normal_color: 0x0fba52,
                press_color: 0x0fba52};
        case 'red':
            return {normal_color: 0xba0f52,
                press_color: 0xba0f52};
        default:
            return 12;
    }
}

export const createTextButtonWidget = (text, callback = ()=>{}, style = {}, position= {}) => {
    const {
        name = 'primary'
    } = style;
    const {
        x = 16,
        y = 64,
        w = DEVICE_WIDTH,
    } = position;
    const layout = getTextLayout(text, {
        text_size: 14,
        text_width: w,
        wrapped: 1
      })
      const buttonH = Math.max(layout.height, 64);
      const buttonWidget = createWidget(widget.BUTTON, {
        x,
        y,
        w,
        h: buttonH,
        text_size: 14,
        text,
        radius: 8,
        ...color(name),
        click_func:callback
      });
      return {buttonWidget, layout, bottom:(y+buttonH), right:(x + w)};
}
