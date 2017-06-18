/// <reference path="../logger.ts" />
/// <reference path="../entityminer.ts" />
/// <reference path="../data-views/objectview.ts" />

namespace net.ndrei.json.entityminers {
    import ObjectDataView = net.ndrei.json.dataviews.ObjectDataView;
    import Log = net.ndrei.json.logging.Log;

    const LOG = new Log("json entity miner");

    export class JsonMiner extends EntityMiner {
        digIntoEntity(info: EntityInfo): EntityInfo {
            try {
                LOG.enterSection('json entity miner');
                LOG.info('path: "{0}"', info.dataPath, info);

                if (info && info.context) {
                    if (info.context.entityInfoProviders) {
                        info.context.entityInfoProviders.forEach(p => {
                            p.addInformation(info);
                        });
                    }

                    const entity = info.context.getValue();

                    this.gatherEntityData(info.context.getJsonContext(), info.dataPath, entity, d => info.addChild(d));
                }

                return info;
            }
            finally {
                LOG.leaveSection();
            }
        }

        private gatherEntityData(context: JsonContext, parentPath: string, entity: any, callback: (data: NodeInfo) => void) {
            if (entity) {
                Object.getOwnPropertyNames(entity).forEach(memberName => {
                    if (!context.dataFilters || !context.dataFilters.length || context.dataFilters.every(f => f.canBeUsed(entity, memberName))) {
                        const descriptor = Object.getOwnPropertyDescriptor(entity, memberName);
                        const dataPath = parentPath ? `${parentPath}.${memberName}`: memberName;
                        const metadata: DataInfoProviderMeta = {};
                        if (context.dataInfoProviders) {
                            context.dataInfoProviders.forEach(p => {
                                $.extend(metadata, p.gatherInformation(context, dataPath));
                            });
                        }

                        if (!metadata.viewKey || !metadata.viewKey.length) {
                            // find view key from factories
                            let viewKey: string = undefined;
                            for(let index in (context.dataViewFactories || [])) {
                                const factory = context.dataViewFactories[index];
                                viewKey = factory ? factory.getViewKey(entity, memberName, descriptor) : null;
                                if (viewKey) {
                                    break;
                                }
                            }
                            metadata.viewKey = viewKey;
                        }

                        if (metadata.viewKey && (!dataViewRegistry || !dataViewRegistry[metadata.viewKey])) {
                            // unknown view key
                            LOG.debug(`Unknown data view key :'${metadata.viewKey}'.`);
                            metadata.viewKey = undefined;
                        }

                        if ((typeof descriptor.value == "object") && (!metadata.viewKey || !metadata.viewKey.length)) {
                            // this is an object with no specific view set...
                            // if (metadata.flattenHierarchy) {
                            //     this.gatherEntityData(context, dataPath, descriptor.value, callback);
                            // }
                            // else {
                                callback(new EntityInfo(context.createChildContext(dataPath)).apply(metadata));
                            // }
                        }
                        else {
                            const data: NodeInfo = new DataInfo(dataPath).apply(metadata);
                            callback(data);
                        }
                    }
                });
            }
        }
    }
}

net.ndrei.json.entityMinerRegistry['json'] = new net.ndrei.json.entityminers.JsonMiner();