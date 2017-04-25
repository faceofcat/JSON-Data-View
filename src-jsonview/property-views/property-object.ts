/// <reference path="property-labeledbase.ts" />

namespace net.ndrei.json.properties {
    export class PropertyObject extends PropertyLabeledBase<any> {
        constructor (label: string, value: any) {
            super(label, value);
        }

        render(container: JQuery): void {
            if (this.label && this.label.length) {
                // child property, render label
                super.render(container);
            }
            const ul = $('<ul class="property-list" />');

            if (this.value) {
                for(let key in this.value) {
                    const value = this.value[key];
                    const li = $('<li />');

                    const view = PropertiesFactory.createProperty(key, value);
                    if (view) {
                        view.render(li);
                    }
                    else {
                        // skip this item as it has no view
                        continue;
                    }
                    ul.append(li);
                }
            }
            container.append(ul);
        }
    }
}