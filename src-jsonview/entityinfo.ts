/// <reference path="nodeinfo.ts" />
/// <reference path="datainfo.ts" />

namespace net.ndrei.json {
    export class EntityInfo extends NodeInfo implements EntityInfoProviderMeta {
        private _data: NodeInfo[] = [];

        constructor(public readonly context: EntityContext/* , original: DataInfo */) {
            super(context.dataPath);
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
        
        // view: EntityView = undefined;
        
        toJSON(): any {
            return $.extend(super.toJSON(), {
                data: this.children
            });
        }

        /**
         * Specify the category metada for this entity.
         * Use '_.' at the start of category path to specify a global category.
         */
        categoriesInfo?: { [localPath: string]: string | DataCategoryLayoutInfo };

        layoutData?: any;
    }
}