/// <reference path="property-labeledbase.ts" />

namespace net.ndrei.json.properties {
    export class PropertyBoolean extends PropertyLabeledBase<boolean> {
        constructor (label: string, value: boolean) {
            super(label, value);
        }

        render(container: JQuery): void {
            super.render(container);
            container.append(`<span class="property-value property-value-boolean">${this.value ? 'true' : 'false'}</span>`);
        }
    }
}