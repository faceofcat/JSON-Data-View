/// <reference path="nodeinfo.ts" />
/// <reference path="datainfo.ts" />

namespace net.ndrei.json {
    export class EntityInfo extends NodeInfo {
        private _data: NodeInfo[] = [];

        constructor(public readonly context: EntityContext/* , original: DataInfo */) {
            super(context.dataPath);

            // copy metadata
            // this.label = original.label;
            // this.category = original.category;
            // this.index = original.index;

            context.applyTo(this);
        }

        get children(): NodeInfo[] {
            // TODO: find a way to 'protect' this
            return this._data.map(d => d);
        }

        addChild(data: NodeInfo): EntityInfo {
            this._data.push(data);
            data.parent = this;
            return this;
        }
        
        view: EntityView = undefined;

        // readonly context: EntityContext; 
    // }

    // export class JsonEntityInfo extends JsonNodeInfo implements EntityInfo {
        // private _data: NodeInfo[] = [];

        // constructor(public readonly context: EntityContext/* , original: DataInfo */) {
        //     super(context.dataPath);

        //     // copy metadata
        //     // this.label = original.label;
        //     // this.category = original.category;
        //     // this.index = original.index;

        //     context.applyTo(this);
        // }

        // view: EntityView = undefined;

        // get children(): NodeInfo[] {
        //     // TODO: find a way to 'protect' this
        //     return this._data.map(d => d);
        // }

        // addChild(data: NodeInfo): EntityInfo {
        //     this._data.push(data);
        //     data.parent = this;
        //     return this;
        // }

        toJSON(): any {
            return $.extend(super.toJSON(), {
                data: this.children
            });
        }
    }
}