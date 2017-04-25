/// <reference path="property-labeledbase.ts" />

namespace net.ndrei.json.properties {
    export class PropertyNumeric extends PropertyLabeledBase<number> {
        constructor (label: string, value: number) {
            super(label, value);
        }

        render(container: JQuery): void {
            super.render(container);
            container.append(`<span class="property-value property-value-numeric">${this.value}</span>`);
        }
    }
}