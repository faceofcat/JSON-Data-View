/// <reference path="../datalayout.ts" />

namespace net.ndrei.json.datalayouts {
    import DataLayout = net.ndrei.json.DataLayout;
    export class Labeled implements DataLayout {
        private container: JQuery = undefined;

        constructor() {
        }

        initialize(container: JQuery): DataLayout {
            (this.container = container).append($(`<span class="data-label"></span><span class="data-value"></span>`));
            return this;
        }

        renderDefaultLabel(label: string): DataLayout {
            this.getLabelContainer().text(label);
            return this;
        }

        getContainer(): JQuery {
            return this.container;
        }

        getLabelContainer(): JQuery {
            return this.container.find('span.data-label');
        }

        getValueContainer(): JQuery {
            return this.container.find('span.data-value');
        }
    }
}

net.ndrei.json.dataLayoutRegistry['labeled'] = () => new net.ndrei.json.datalayouts.Labeled();