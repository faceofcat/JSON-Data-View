/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
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
            public readonly defaultDataLayoutKey: string = 'labeled',
            public readonly defaultCategoryLayoutKey: string = 'list',
            // public readonly entityViewBuilder: (entity: EntityInfo) => EntityView,
            public readonly container: JQuery,
            public readonly entity: any,
            public readonly entityLayoutKey: string = 'list') {
            super(undefined, entityInfoProviders, dataFilters, dataInfoProviders, dataViewFactories, miner);

            // TODO: add EntityPreProcessor interface to handle this
            // test for 'toJSON' method
            if ($.isFunction(entity.toJSON)) {
                this.entity = entity.toJSON() || entity;
            }
        }

        getJsonContext(): JsonContext {
            return this;
        }

        get rootEntityInfo(): EntityInfo | undefined {
            if (!this._entityInfo) {
                this._entityInfo = new EntityInfo(this);
            }
            return this._entityInfo;
        }

        getValue(dataPath: string, overrideLastPart: string = undefined) {
            let result = this.entity;
            (dataPath || '').split('.').every((p, i, a) => {
                if (overrideLastPart && (i == (a.length - 1))) {
                    p = overrideLastPart;
                }

                if (p && p.length) {
                    result = result[p];
                    // TODO: add EntityPreProcessor interface to handle this
                    result && $.isFunction(result.toJSON) && (result = result.toJSON() || result);
                }
                
                return (result != undefined) && (result != null);
            });
            return result;
        }
    }
}
