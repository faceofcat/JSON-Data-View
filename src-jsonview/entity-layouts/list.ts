/// <reference path="../entitylayout.ts" />

namespace net.ndrei.json.entitylayouts {
    export class DataList implements EntityLayout {
        private container: JQuery
        private ul: JQuery;

        constructor() {
        }

        initialize(container: JQuery): BaseLayout {
            this.container = container;

            this.container.append($(`<div class="entity-list-title not-set"></div>`));

            this.ul = $('<ul class="entity-list" />');
            this.ul.data({ layout: this });
            this.container.append(this.ul);
            return this;
        }

        setLabel(label: string): EntityLayout {
            this.container.find('.entity-list-title')
                .removeClass('not-set')
                .html(label);
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

net.ndrei.json.entityLayoutRegistry['list'] = () => new net.ndrei.json.entitylayouts.DataList();