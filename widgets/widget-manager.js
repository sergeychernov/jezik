import { redraw, deleteWidget } from '@zos/ui'

export class WidgetManager {
    constructor() {
        this.widgets = [];
    }
    redraw() {
        console.log('redraw:', this.widgets.length)
        while (this.widgets.length) {
            const widget = this.widgets.pop();
            deleteWidget(widget);
        }
        redraw();
    }

    push(widget) {

        if (widget) {
            if (widget.length > 0) {
                this.widgets.push(...widget)
            } else {
                this.widgets.push(widget)
            }
            return true;
        }
        return false;

    }
}