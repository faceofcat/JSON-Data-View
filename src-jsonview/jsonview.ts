/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityminer.ts" />
/// <reference path="entityinfoprovider.ts" />
/// <reference path="datainfoprovider.ts" />
/// <reference path="viewtree.ts" />
/// <reference path="jsonviewconfig.ts" />

namespace net.ndrei.json {
    import ViewTree = net.ndrei.json.viewtree.ViewTree;
    export class JSONView {
        public static create(host: JQuery, json: any, config: JSONViewConfig = {}): JSONView {
            return new JSONView(host, json, config);
        }

        private _context: JsonContext | undefined = undefined;
        private _viewTree: ViewTree | undefined = undefined;

        private constructor(protected readonly host: JQuery, protected readonly target: any, protected readonly config: JSONViewConfig = {}) {
            this.host.data({ _jsonView: this });
            !this.config && (this.config = {});
            this.initialLoad();
        }

        private initialLoad(): void {
            if (!this.target) {
                return;
            }

            const entityInfoProviderKeys = this.config.entityInfoProviderKeys || ['json_metadata'];
            const filterKeys = this.config.filterKeys || ['underscore'];
            const dataInfoProviderKeys = this.config.dataInfoProviderKeys || ['json_metadata'];
            const dataViewFactorykeys = this.config.dataViewFactorykeys || ['json'];
            const entityMinerKey = this.config.entityMinerKey || 'json';
            const categoryLayoutKey = this.config.categoryLayoutKey || 'list';

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

            const miner: EntityMiner = entityMinerRegistry ? entityMinerRegistry[entityMinerKey] : undefined;
            if (miner) {
                this._context = new JsonContext(
                    entityInfoProviders,
                    filters,
                    dataInfoProviders,
                    viewFactories,
                    miner,
                    'labeled',
                    categoryLayoutKey, // 'json',
                    this.host,
                    this.target);
                this._viewTree = new ViewTree(this._context);
                this._viewTree.render();
            }
        }

        get context(): JsonContext | undefined {
            return this._context;
        }

        get viewTree(): ViewTree | undefined {
            return this._viewTree;
        }

        valueChanged(path: string): void {
            
        }
    }
}