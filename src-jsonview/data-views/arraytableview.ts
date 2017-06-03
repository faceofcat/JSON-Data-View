/// <reference path="../dataview.ts" />

namespace net.ndrei.json.dataviews {
    export class ArrayTableDataView implements DataView {
        constructor(private info: DataInfo, public layoutKey: string = "titled") {
        }

        render(context: JsonContext, layout: DataLayout): void {
            layout.renderDefaultLabel(this.info.label);

            const value = context.getValue(this.info.dataPath);
            if ($.isArray(value)) {
                const arr = <any[]>value;
                const root = layout.getValueContainer();

                const table = $('<table />');
                root.append(table);

                for(let i = 0; i < arr.length; i++) {
                    const tr = $('<tr />');
                    const td = $('<td />');
                    tr.append(td);
                    td.text(arr[i]);
                    table.append(tr);
                }
            }
        }
    }
}

net.ndrei.json.dataViewRegistry['array-table'] = info => new net.ndrei.json.dataviews.ArrayTableDataView(info);