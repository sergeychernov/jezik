import { createWidget, widget, align, prop, text_style, event } from '@zos/ui';
import { createTextButtonWidget } from './button-widget'
import { DEVICE_WIDTH, PADDING, BAR_HEIGHT, DEVICE_HEIGHT, GAP } from './constants';

export const createMenu = (button, callback = ()=>{}, options = []) => {
    button.buttonWidget.addEventListener(event.CLICK_DOWN, (info) => {
        selectLanguageWidget.setProperty(prop.VISIBLE, true);
      });
      const selectLanguageWidget = createWidget(widget.GROUP , {})
      selectLanguageWidget.setProperty(prop.VISIBLE, false);
      selectLanguageWidget.createWidget(widget.FILL_RECT, {
        x: PADDING,
        y: BAR_HEIGHT,
        w: DEVICE_WIDTH-2*PADDING,
        h: DEVICE_HEIGHT-PADDING - BAR_HEIGHT,
        radius: 8,
        color: 0xffffff
      })
      const buttonHeight = Math.floor((DEVICE_HEIGHT - BAR_HEIGHT - 3*PADDING + GAP) /  options.length - GAP);
      options.forEach(({name, value}, i) => {
        
        selectLanguageWidget.createWidget(widget.BUTTON, {
          x: 2 * PADDING,
          y: BAR_HEIGHT + PADDING +  i*(buttonHeight+GAP),
          w: DEVICE_WIDTH-4*PADDING,
          h: buttonHeight,
          text_size: 14,
          text: name,
          radius: 8,
          normal_color: 0xdddddd,
          press_color: 0xcccccc,
          color:0x000000,
          click_func:()=>{
            callback({name, value});
            selectLanguageWidget.setProperty(prop.VISIBLE, false);
          }
        })
      });
}
export const createSelectWidget = (text,style = {}, position= {}) => {
    const button = createTextButtonWidget(text, ()=>{}, style, position );
   const buttonWidgetProps = button.buttonWidget.getProperty(prop.MORE, {});
    const img = createWidget(widget.IMG, {
        x: button.right - 32,
        y: buttonWidgetProps.y + (buttonWidgetProps.h-24)/2,
        src: 'select.png',
        w:24,
        h:24,
        auto_scale:true
      })

    return button;
}
