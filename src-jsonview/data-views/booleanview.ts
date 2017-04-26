/// <reference path="jsondataview.ts" />

namespace net.ndrei.json.dataviews {
    export class BooleanDataView extends SimpleDataView<Boolean> {
        constructor(label: string, value: Boolean) {
            super(label, value, 'data-value-boolean');
        }

        protected getValueText(): string {
            return this.value ? 'true' : 'false';
        }
    }
}