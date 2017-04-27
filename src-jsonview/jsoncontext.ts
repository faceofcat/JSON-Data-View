/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityview.ts" />
/// <reference path="entityminer.ts" />
/// <reference path="entityinfoprovider.ts" />
/// <reference path="datainfoprovider.ts" />

namespace net.ndrei.json {
    export class JsonContext {
        constructor(
            public readonly entityInfoProviders: EntityInfoProvider[],
            public readonly dataFilters: DataFilter[],
            public readonly dataInfoProviders: DataInfoProvider[],
            public readonly dataViewFactories: DataViewFactory[],
            public readonly miner: EntityMiner,
            public readonly entityViewBuilder: (entity: EntityInfo) => EntityView,
            public readonly container: JQuery,
            public readonly entity: any,
            public readonly entityLayoutKey: string = 'list') {
        }

        public render() {
            const entityInfo = this.miner.digIntoEntity(this);
            if (entityInfo) {
                const entityView = this.entityViewBuilder(entityInfo);
                entityView.render(this);
            }
        }

        public clone(container: JQuery, entity: any, entityLayoutKey: string = null): JsonContext {
            return new JsonContext(
                this.entityInfoProviders,
                this.dataFilters,
                this.dataInfoProviders,
                this.dataViewFactories,
                this.miner,
                this.entityViewBuilder,
                container || this.container,
                entity || this.entity,
                entityLayoutKey || this.entityLayoutKey);
        }
    }
}