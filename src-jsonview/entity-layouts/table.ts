/// <reference path="../entitylayout.ts" />

namespace net.ndrei.json.entitylayouts {
    export class DataTable implements EntityLayout {
        private table: JQuery;
        private container: JQuery;

        constructor() {
        }

        initialize(container: JQuery): BaseLayout {
            this.container = container;

            this.container.append($(`<div class="entity-list-title not-set"></div>`));

            this.table = $('<div class="entity-table" />');
            this.table.data({ layout: this });
            this.container.append(this.table);

            const header = $('<div class="entity-table-row entity-table-header"><span class="data-label">Property</span><span class="data-value">Value</span></div>')
            this.table.append(header);
            
            return this;
        }

        setLabel(label: string): EntityLayout {
            this.container.find('.entity-list-title')
                .removeClass('not-set')
                .html(label);
            return this;
        }

        addData(data: DataLayout): DataCategoryLayout {
            const tr = $('<div class="entity-table-row" />');
            this.table.append(tr);
            data.initialize(tr);
            tr.data({ layout: data });
            return this;
        }
    }
}

net.ndrei.json.entityLayoutRegistry['table'] = () => new net.ndrei.json.entitylayouts.DataTable();