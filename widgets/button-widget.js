import { createWidget, widget, align, prop, text_style, event } from '@zos/ui';
import { getTextLayout } from '@zos/ui'
import { DEVICE_WIDTH, PADDING, GAP } from './constants';

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

export const createTextButtonWidget = (text, callback = ()=>{}, style = {}, position= {}, addText) => {
  
    const {
        name = 'red',
        textSize = 14,
    } = style;
    const {
        x = 16,
        y = 64,
        w = DEVICE_WIDTH,
    } = position;
    const layout = getTextLayout(text, {
        text_size: textSize,
        text_width: w - 2 * PADDING,
        wrapped: 1
      });
    const {h = Math.max(layout.height, 64)
    } = position;
      const addLayout = getTextLayout(addText, {
        text_size: textSize - 3,
        text_width: w - 2 * PADDING,
        wrapped: 1
      });
      const buttonWidget = createWidget(widget.BUTTON, {
        x,
        y,
        w,
        h,
        //text_size: 14,
        //text,
        radius: 8,
        ...color(name),
        click_func:callback
      });
      const textWidget = createWidget(widget.TEXT, {
        x,
        y,
        w,
        h:addLayout?h/2:h,
        color: 0xffffff,
        text_size: textSize,
        align_h: align.CENTER_H,
        align_v: align.CENTER_V,
        text_style: text_style.WRAP,
        text,
      });
      textWidget.addEventListener(event.CLICK_UP, callback);
      const widgets = [buttonWidget, textWidget];
      
      if(addLayout){
        const addWidget = createWidget(widget.TEXT, {
            x,
            y:y+h/2,
            w,
            h:h/2,
            color: 0xffffff,
            text_size: textSize-3,
            align_h: align.CENTER_H,
            align_v: align.CENTER_V,
            text_style: text_style.WRAP,
            text:addText,
          });
          addWidget.addEventListener(event.CLICK_UP, callback);
          widgets.push(addWidget);
      }
      return {widgets, layout, bottom:(y+h), right:(x + w)};
}
