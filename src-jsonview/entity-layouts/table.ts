/// <reference path="../entitylayout.ts" />

namespace net.ndrei.json.entitylayouts {
    export class DataTable implements EntityLayout {
        private table: JQuery;

        constructor(private container: JQuery) {
            this.table = $('<div class="entity-table" />');
            this.table.data({ layout: this });
            this.container.append(this.table);

            const header = $('<div class="entity-table-row entity-table-header"><span class="data-label">Property</span><span class="data-value">Value</span></div>')
            this.table.append(header);
        }

        addData(data: DataLayout): EntityLayout {
            const tr = $('<div class="entity-table-row" />');
            this.table.append(tr);
            data.initialize(tr);
            tr.data({ layout: data });
            return this;
        }
    }
}

net.ndrei.json.entityLayoutRegistry['table'] = (container: JQuery) => new net.ndrei.json.entitylayouts.DataTable(container);