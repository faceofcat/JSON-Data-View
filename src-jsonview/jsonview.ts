/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityminer.ts" />

namespace net.ndrei.json {
    export class JSONView {
        public static create(host: JQuery, json: any): JSONView {

            if (json) {
                const filterKeys = ['underscore'];
                const dataViewFactorykeys = ['json'];
                const entityMinerKey = 'json';
                const entityViewKey = 'default';

                const filters: DataFilter[] = [];
                if(dataFilterRegistry) {
                    filterKeys.forEach(k => {
                        const f = dataFilterRegistry[k];
                        if (f) {
                            filters.push(f());
                        }
                    });
                }

                const viewFactories: DataViewFactory[] = [];
                if (dataViewFactoryRegistry) {
                    dataViewFactorykeys.forEach(k => {
                        const f = dataViewFactoryRegistry[k];
                        if (f) {
                            viewFactories.push(f());
                        }
                    });
                }

                const entityViewBuilder = (entityViewKey && entityViewRegistry) ? entityViewRegistry[entityViewKey] : undefined;

                const miner: EntityMiner = entityMinerRegistry ? entityMinerRegistry[entityMinerKey] : undefined;
                if (miner) {
                    new JsonContext(filters, viewFactories, miner, entityViewBuilder, host, json).render();
                }
            }

            return undefined;
        }
    }
}