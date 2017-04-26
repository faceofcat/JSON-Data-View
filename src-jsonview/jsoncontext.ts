/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityview.ts" />
/// <reference path="entityminer.ts" />

namespace net.ndrei.json {
    export class JsonContext {
        constructor(
            public readonly filters: DataFilter[],
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

        public clone(container: JQuery, entity: any, entityLayoutKey: string): JsonContext {
            return new JsonContext(
                this.filters,
                this.dataViewFactories,
                this.miner,
                this.entityViewBuilder,
                container || this.container,
                entity || this.entity,
                entityLayoutKey || entityLayoutKey);
        }
    }
}