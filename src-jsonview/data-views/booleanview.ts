/// <reference path="jsondataview.ts" />

namespace net.ndrei.json.dataviews {
    export class BooleanDataView extends SimpleDataView<Boolean> {
        constructor(info: DataInfo) {
            super(info, 'data-value-boolean');
        }

        protected getValueText(context: JsonContext): string {
            return this.info.getValue(context) ? 'true' : 'false';
        }
    }
}

net.ndrei.json.dataViewRegistry['boolean'] = info => new net.ndrei.json.dataviews.BooleanDataView(info);