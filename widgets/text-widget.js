import { createWidget, widget, align, prop, text_style, event } from '@zos/ui';
import { getDeviceInfo } from "@zos/device";
import { getTextLayout } from '@zos/ui'

const { width: DEVICE_WIDTH } = getDeviceInfo();
function fontSize(style) {
    switch (style) {
        case 'title':
            return 20;
        case 'subtitle':
            return 16;
        case 'button':
            return 16;
        default:
            return 12;
    }
}

const createTextWidget = (text, style = {}, position = {}) => {

    const {
        name = 'normal',
        color = 0xffffff
    } = style;
    const {
        x = 16,
        y = 64,
        w = DEVICE_WIDTH,
    } = position;
    const layout = getTextLayout(text, {
        text_size: fontSize(name),
        text_width: w,
        wrapped: 1
    });
    const textWidget = createWidget(widget.TEXT, {
        x,
        y,
        w,
        h: layout.height,
        color,
        text_size: fontSize(name),
        align_v: align.CENTER_V,
        text_style: text_style.WRAP,
        text
    });
    return { widgets: [textWidget], layout, bottom: (y + layout.height), right: (x + layout.width) };
}

export default createTextWidget;