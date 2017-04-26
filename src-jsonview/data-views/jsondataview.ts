/// <reference path="../dataview.ts" />

namespace net.ndrei.json.dataviews {
    export abstract class JsonDataView<T> implements DataView {
        constructor(protected label: string, protected value: T, private _layoutKey: string = 'labeled') {
        }

        get layoutKey(): string { return this._layoutKey; }

        render(context: JsonContext, layout: DataLayout): void {
            layout.renderDefaultLabel(this.label);

            layout.getValueContainer()
                .addClass(this.getValueClass())
                .text(this.getValueText());
        }

        protected abstract getValueClass(): string;

        protected getValueText(): string {
            return ((this.value != null) && (this.value != undefined)) ? this.value.toString() : 'null';
        }
    }

    export class SimpleDataView<T> extends JsonDataView<T> {
        constructor(label: string, value: T, private valueClass: string) {
            super(label, value);
        }

        protected getValueClass(): string {
            return this.valueClass;
        }
    }
}