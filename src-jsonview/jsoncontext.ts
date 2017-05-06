/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityview.ts" />
/// <reference path="entitycontext.ts" />
/// <reference path="entityminer.ts" />
/// <reference path="entityinfoprovider.ts" />
/// <reference path="datainfoprovider.ts" />

namespace net.ndrei.json {
    export class JsonContext extends EntityContext {
        private _entityInfo: EntityInfo | undefined = undefined;

        constructor(
            entityInfoProviders: EntityInfoProvider[],
            dataFilters: DataFilter[],
            dataInfoProviders: DataInfoProvider[],
            dataViewFactories: DataViewFactory[],
            miner: EntityMiner,
            public readonly entityViewBuilder: (entity: EntityInfo) => EntityView,
            public readonly container: JQuery,
            public readonly entity: any,
            public readonly entityLayoutKey: string = 'list') {
            super(undefined, entityInfoProviders, dataFilters, dataInfoProviders, dataViewFactories, miner);
        }

        getJsonContext(): JsonContext {
            return this;
        }

        public render() {
            const entity = this.rootEntityInfo;
            const entityLayoutKey = (entity ? entity.layoutKey : undefined) || 'list';
            const entityLayoutBuilder = entityLayoutRegistry ? entityLayoutRegistry[entityLayoutKey] : undefined;
            const entityLayout = entityLayoutBuilder ? entityLayoutBuilder() : undefined;
            if (entityLayout) {
                const view = getEntityView(entity);
                if (view) {
                    entityLayout.initialize(this.container);
                    view.render(entityLayout);
                }
            }
        }

        get rootEntityInfo(): EntityInfo | undefined {
            if (!this._entityInfo) {
                this._entityInfo = new JsonEntityInfo(this);
            }
            return this._entityInfo;
        }

        // clone(container: JQuery, entity: any, entityLayoutKey: string = null): JsonContext {
        //     return new JsonContext(
        //         this.entityInfoProviders,
        //         this.dataFilters,
        //         this.dataInfoProviders,
        //         this.dataViewFactories,
        //         this.miner,
        //         this.entityViewBuilder,
        //         container || this.container,
        //         entity || this.entity,
        //         entityLayoutKey || this.entityLayoutKey);
        // }

        getValue(dataPath: string) {
            let result = this.entity;
            (dataPath || '').split('.').every(p => {
                if (p && p.length) {
                    result = result[p];
                }
                return (result != undefined) && (result != null);
            });
            return result;
        }
    }
}