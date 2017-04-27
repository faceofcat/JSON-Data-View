/// <reference path="jsondataview.ts" />

namespace net.ndrei.json.dataviews {
    export class BooleanDataView extends SimpleDataView<Boolean> {
        constructor(info: DataInfo) {
            super(info, 'data-value-boolean');
        }

        protected getValueText(): string {
            return this.info.getValue() ? 'true' : 'false';
        }
    }
}

net.ndrei.json.dataViewRegistry['boolean'] = info => new net.ndrei.json.dataviews.BooleanDataView(info);