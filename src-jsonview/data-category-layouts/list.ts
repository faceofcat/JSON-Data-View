/// <reference path="../datacategorylayout.ts" />

namespace net.ndrei.json.datacategorylayouts {
    export class CategoryDataList implements DataCategoryLayout {
        private container: JQuery;
        private ul: JQuery;

        constructor(private readonly label: string) {
        }

        public initialize(container: JQuery): BaseLayout {
            this.container = container;
            this.label && this.label.length && this.container.append($(`<div class="category-label category-list-label">${this.label}</div>`));
            this.ul = $('<ul class="category-list" />');
            this.ul.data({ layout: this });
            this.container.append(this.ul);
            return this;
        }

        addData(data: DataLayout): DataCategoryLayout {
            const li = $('<li />');
            this.ul.append(li);
            data.initialize(li);
            li.data({ layout: data });
            return this;
        }
    }
}

net.ndrei.json.dataCategoryLayoutRegistry['list'] = (label: string) =>
    new net.ndrei.json.datacategorylayouts.CategoryDataList(label);
