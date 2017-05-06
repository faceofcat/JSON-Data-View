/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityminer.ts" />
/// <reference path="entityinfoprovider.ts" />
/// <reference path="datainfoprovider.ts" />

namespace net.ndrei.json {
    export class EntityContext {
        protected constructor(
            private _dataPath: string,
            private _entityInfoProviders: EntityInfoProvider[],
            private _dataFilters: DataFilter[],
            private _dataInfoProviders: DataInfoProvider[],
            private _dataViewFactories: DataViewFactory[],
            private _miner: EntityMiner,
            private _parent: EntityContext = undefined) {
        }

        getJsonContext(): JsonContext {
            return this._parent ? this._parent.getJsonContext() : undefined;
        }

        getValue(path: string = undefined): any {
            const context = this.getJsonContext();
            if (context) {
                return context.getValue(this.fullDataPath + ((path && path.length) ? ('.' + path) : ''));
            }
            return undefined;
        }

        get dataPath(): string {
            return this._dataPath;
        }

        get fullDataPath(): string {
            const parentPath = this._parent ? this._parent.fullDataPath : undefined;
            return (parentPath && parentPath.length) ? (parentPath + '.' + this._dataPath) : this._dataPath;
        }

        get entityInfoProviders(): EntityInfoProvider[] {
            return this._entityInfoProviders || (this._parent ? this._parent.entityInfoProviders : undefined);
        }

        get dataFilters(): DataFilter[] {
            return this._dataFilters || (this._parent ? this._parent.dataFilters : undefined);
        }

        get dataInfoProviders(): DataInfoProvider[] {
            return this._dataInfoProviders || (this._parent ? this._parent.dataInfoProviders : undefined);
        }

        get dataViewFactories(): DataViewFactory[] {
            return this._dataViewFactories || (this._parent ? this._parent.dataViewFactories : undefined);
        }

        get miner(): EntityMiner {
            return this._miner || (this._parent ? this._parent.miner : undefined);
        }

        toJSON(): any {
            return {
                entityInfoProviders: this._entityInfoProviders,
                dataFilters: this._dataFilters,
                dataInfoProviders: this._dataInfoProviders,
                dataViewFactories: this._dataViewFactories,
                miner: this._miner
            };
        }

        createChildContext(dataPath: string, config?: {
            entityInfoProviders?: EntityInfoProvider[],
            dataFilters?: DataFilter[],
            dataInfoProviders?: DataInfoProvider[],
            dataViewFactories?: DataViewFactory[],
            miner?: EntityMiner
        }): EntityContext {
            config = config || {};
            return new EntityContext(
                dataPath,
                config.entityInfoProviders || this._entityInfoProviders,
                config.dataFilters || this._dataFilters,
                config.dataInfoProviders || this._dataInfoProviders,
                config.dataViewFactories || this._dataViewFactories,
                config.miner || this._miner,
                this);
        }

        applyTo(entity: EntityInfo) {
            const miner = this.miner;
            if (miner) {
                miner.digIntoEntity(entity);
            }
        }
    }
}
