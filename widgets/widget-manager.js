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
                console.log('push+', this.widgets.length)
                console.log('push=', widget.length)
                this.widgets.push(...widget)
                console.log('push', this.widgets.length)
            } else {
                this.widgets.push(widget)
            }
            return true;
        }
        return false;

    }
}