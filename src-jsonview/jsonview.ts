/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityminer.ts" />
/// <reference path="entityinfoprovider.ts" />
/// <reference path="datainfoprovider.ts" />

namespace net.ndrei.json {
    export class JSONView {
        public static create(host: JQuery, json: any): JSONView {
            return new JSONView(host, json);
        }

        private constructor(protected readonly host: JQuery, protected readonly target: any) {
            this.host.data({ _jsonView: this });
            this.initialLoad();
        }

        private initialLoad(): void {
            if (this.target) {
                const entityInfoProviderKeys = ['json_metadata'];
                const filterKeys = ['underscore'];
                const dataInfoProviderKeys = ['json_metadata'];
                const dataViewFactorykeys = ['json'];
                const entityMinerKey = 'json';
                const entityViewKey = 'default';

                const entityInfoProviders: EntityInfoProvider[] = [];
                if (entityInfoProviderRegistry) {
                    entityInfoProviderKeys.forEach(k => {
                        const f = entityInfoProviderRegistry[k];
                        if (f) {
                            entityInfoProviders.push(f);
                        }
                    });
                }

                const filters: DataFilter[] = [];
                if(dataFilterRegistry) {
                    filterKeys.forEach(k => {
                        const f = dataFilterRegistry[k];
                        if (f) {
                            filters.push(f());
                        }
                    });
                }

                const dataInfoProviders: DataInfoProvider[] = [];
                if (dataInfoProviderRegistry) {
                    dataInfoProviderKeys.forEach(k => {
                        const f = dataInfoProviderRegistry[k];
                        if (f) {
                            dataInfoProviders.push(f);
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
                    new JsonContext(entityInfoProviders, filters, dataInfoProviders, viewFactories, miner, entityViewBuilder, this.host, this.target).render();
                }
            }
        }

        public valueChanged(path: string): void {
            
        }
    }
}