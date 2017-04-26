/// <reference path="../entitylayout.ts" />

namespace net.ndrei.json.entitylayouts {
    export class DataList implements EntityLayout {
        private ul: JQuery;

        constructor(private container: JQuery) {
            this.ul = $('<ul class="entity-list" />');
            this.ul.data({ layout: this });
            this.container.append(this.ul);
        }

        addData(data: DataLayout): EntityLayout {
            const li = $('<li />');
            this.ul.append(li);
            data.initialize(li);
            li.data({ layout: data });
            return this;
        }
    }
}

net.ndrei.json.entityLayoutRegistry['list'] = (container: JQuery) => new net.ndrei.json.entitylayouts.DataList(container);