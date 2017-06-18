/// <reference path="../datacategorylayout.ts" />

namespace net.ndrei.json.datacategorylayouts {
    export class CategoryDataTable implements DataCategoryLayout {
        private table: JQuery;
        private container: JQuery;

        constructor(private readonly label: string) {
        }

        initialize(container: JQuery): BaseLayout {
            this.container = container;

            this.label && this.label.length && this.container.append($(`<div class="category-label category-table-label">${this.label}</div>`));

            this.table = $('<div class="category-table" />');
            this.table.data({ layout: this });
            this.container.append(this.table);

            const header = $('<div class="category-table-row category-table-header"><span class="data-label">Property</span><span class="data-value">Value</span></div>')
            this.table.append(header);
            
            return this;
        }

        addData(data: DataLayout): DataCategoryLayout {
            const tr = $('<div class="category-table-row" />');
            this.table.append(tr);
            data.initialize(tr);
            tr.data({ layout: data });
            return this;
        }
    }
}

net.ndrei.json.dataCategoryLayoutRegistry['table'] = (label: string) =>
    new net.ndrei.json.datacategorylayouts.CategoryDataTable(label);
