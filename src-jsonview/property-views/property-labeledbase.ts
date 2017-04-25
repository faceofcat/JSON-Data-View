/// <reference path="propertyview.ts" />

namespace net.ndrei.json.properties {
    export class PropertyLabeledBase<T> implements PropertyView {
        constructor (protected label: string, protected value: T) {
        }

        render(container: JQuery): void {
            // assume container is the LI
            container.append(`<span class="property-label">${this.label}</span>`);
        }
    }
}