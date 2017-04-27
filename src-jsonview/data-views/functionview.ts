/// <reference path="jsondataview.ts" />

namespace net.ndrei.json.dataviews {
    export class FunctionDataView extends SimpleDataView<string> {
        constructor(info: DataInfo) {
            super(info, 'data-value-function');
        }

        protected getValueText(): string {
            return 'function';
        }
    }
}

net.ndrei.json.dataViewRegistry['function'] = info => new net.ndrei.json.dataviews.FunctionDataView(info);