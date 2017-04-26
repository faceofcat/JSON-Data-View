/// <reference path="../datalayout.ts" />

namespace net.ndrei.json.datalayouts {
    import DataLayout = net.ndrei.json.DataLayout;
    export class Titled implements DataLayout {
        private container: JQuery = undefined;

        constructor() {
        }

        initialize(container: JQuery): DataLayout {
            (this.container = container).append($(`<span class="data-label"></span><div class="data-value"></div>`));
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
            return this.container.find('div.data-value');
        }
    }
}

net.ndrei.json.dataLayoutRegistry['titled'] = () => new net.ndrei.json.datalayouts.Titled();