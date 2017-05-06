/// <reference path="../entitylayout.ts" />

namespace net.ndrei.json.entitylayouts {
    export class DataList implements EntityLayout {
        private container: JQuery
        private ul: JQuery;

        constructor(private hasTitle: boolean) {
        }

        public initialize(container: JQuery): BaseLayout {
            this.container = container;

            if (this.hasTitle) {
                this.container.append($(`<div class="entity-list-title">TITLE</div>`));
            }

            this.ul = $('<ul class="entity-list" />');
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

net.ndrei.json.entityLayoutRegistry['list'] = () => new net.ndrei.json.entitylayouts.DataList(false);
net.ndrei.json.entityLayoutRegistry['titled-list'] = () => new net.ndrei.json.entitylayouts.DataList(true);