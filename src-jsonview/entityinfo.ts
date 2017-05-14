/// <reference path="nodeinfo.ts" />
/// <reference path="datainfo.ts" />

namespace net.ndrei.json {
    export interface EntityInfo extends NodeInfo {
        readonly data: NodeInfo[];
        addData(data: NodeInfo): EntityInfo;
        
        view: EntityView;

        readonly context: EntityContext; 
    }

    export class JsonEntityInfo extends JsonNodeInfo implements EntityInfo {
        private _data: NodeInfo[] = [];

        constructor(public readonly context: EntityContext/* , original: DataInfo */) {
            super(context.dataPath);

            // copy metadata
            // this.label = original.label;
            // this.category = original.category;
            // this.index = original.index;

            context.applyTo(this);
        }

        view: EntityView = undefined;

        get data(): NodeInfo[] {
            // TODO: find a way to 'protect' this
            return this._data.map(d => d);
        }

        addData(data: NodeInfo): EntityInfo {
            this._data.push(data);
            data.parent = this;
            return this;
        }

        toJSON(): any {
            return $.extend(super.toJSON(), {
                data: this.data
            });
        }
    }
}