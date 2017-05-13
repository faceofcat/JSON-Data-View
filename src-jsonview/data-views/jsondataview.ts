/// <reference path="../jsoncontext.ts" />
/// <reference path="../datainfo.ts" />
/// <reference path="../dataview.ts" />

namespace net.ndrei.json.dataviews {
    function formatString(pattern: string, ...args: any[]): string {
        return (pattern && args) ? pattern.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined'
            ? args[number]
            : match;
        }) : pattern;
    }

    export abstract class JsonDataView<T> implements DataView {
        constructor(protected info: DataInfo, private _template: string = '{0}', private _layoutKey: string = 'labeled') {
        }

        get layoutKey(): string { return this._layoutKey; }

        render(context: JsonContext, layout: DataLayout): void {
            layout.renderDefaultLabel(this.info.label);

            layout.getValueContainer()
                .addClass(this.getValueClass())
                .text(formatString(this._template, this.getValueText(context)));
        }

        protected abstract getValueClass(): string;

        protected getValueText(context: JsonContext): string {
            const value = this.info.getValue(context);
            return ((value != null) && (value != undefined)) ? value.toString() : 'null';
        }
    }

    export class SimpleDataView<T> extends JsonDataView<T> {
        constructor(info: DataInfo, private valueClass: string, template: string = '{0}',  layoutKey: string = 'labeled') {
            super(info, template, layoutKey);
        }

        protected getValueClass(): string {
            return this.valueClass;
        }
    }
}

net.ndrei.json.dataViewRegistry['number'] = info => new net.ndrei.json.dataviews.SimpleDataView(info, 'data-value-numeric', '{0}');
net.ndrei.json.dataViewRegistry['string'] = info => new net.ndrei.json.dataviews.SimpleDataView(info, 'data-value-string', '"{0}"');
