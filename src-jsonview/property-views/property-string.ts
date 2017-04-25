/// <reference path="property-labeledbase.ts" />

namespace net.ndrei.json.properties {
    export class PropertyString extends PropertyLabeledBase<string> {
        constructor (label: string, value: string) {
            super(label, value);
        }

        render(container: JQuery): void {
            super.render(container);
            container.append(`<span class="property-value property-value-string">${this.value}</span>`);
        }
    }
}