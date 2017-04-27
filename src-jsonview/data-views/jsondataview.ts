/// <reference path="../jsoncontext.ts" />
/// <reference path="../datainfo.ts" />
/// <reference path="../dataview.ts" />

namespace net.ndrei.json.dataviews {
    export abstract class JsonDataView<T> implements DataView {
        constructor(protected info: DataInfo, private _layoutKey: string = 'labeled') {
        }

        get layoutKey(): string { return this._layoutKey; }

        render(context: JsonContext, layout: DataLayout): void {
            layout.renderDefaultLabel(this.info.label);

            layout.getValueContainer()
                .addClass(this.getValueClass())
                .text(this.getValueText());
        }

        protected abstract getValueClass(): string;

        protected getValueText(): string {
            const value = this.info.getValue();
            return ((value != null) && (value != undefined)) ? value.toString() : 'null';
        }
    }

    export class SimpleDataView<T> extends JsonDataView<T> {
        constructor(info: DataInfo, private valueClass: string, _layoutKey: string = 'labeled') {
            super(info, _layoutKey);
        }

        protected getValueClass(): string {
            return this.valueClass;
        }
    }
}

net.ndrei.json.dataViewRegistry['number'] = info => new net.ndrei.json.dataviews.SimpleDataView(info, 'data-value-number');
net.ndrei.json.dataViewRegistry['string'] = info => new net.ndrei.json.dataviews.SimpleDataView(info, 'data-value-string');
