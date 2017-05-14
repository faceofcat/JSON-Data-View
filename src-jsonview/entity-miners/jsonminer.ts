/// <reference path="../entityminer.ts" />
/// <reference path="../data-views/objectview.ts" />

namespace net.ndrei.json.entityminers {
    import ObjectDataView = net.ndrei.json.dataviews.ObjectDataView;

    export class JsonMiner implements EntityMiner {
        digIntoEntity(info: EntityInfo): EntityInfo {
            if (info && info.context) {
                if (info.context.entityInfoProviders) {
                    info.context.entityInfoProviders.forEach(p => {
                        p.addInformation(info);
                    });
                }

                const entity = info.context.getValue();

                this.gatherEntityData(info.context.getJsonContext(), info.dataPath, entity, d => info.addData(d));
            }
        
            return info;
        }

        private gatherEntityData(context: JsonContext, parentPath: string, entity: any, callback: (data: NodeInfo) => void) {
            if (entity) {
                Object.getOwnPropertyNames(entity).forEach(memberName => {
                    if (!context.dataFilters || !context.dataFilters.length || context.dataFilters.every(f => f.canBeUsed(entity, memberName))) {
                        const descriptor = Object.getOwnPropertyDescriptor(entity, memberName);
                        let viewKey: string = undefined;
                        for(let index in (context.dataViewFactories || [])) {
                            const factory = context.dataViewFactories[index];
                            viewKey = factory ? factory.getViewKey(entity, memberName, descriptor) : null;
                            if (viewKey) {
                                break;
                            }
                        }

                        if (viewKey && (!dataViewRegistry || !dataViewRegistry[viewKey])) {
                            // unknown view key
                            viewKey = undefined;
                        }

                        const dataPath = parentPath ? `${parentPath}.${memberName}`: memberName;

                        const data: NodeInfo = ((viewKey && viewKey.length) || !$.isPlainObject(descriptor.value))
                            ? new JsonDataInfo(dataPath)
                            : new JsonEntityInfo(context.createChildContext(dataPath));
                        if (context.dataInfoProviders) {
                            context.dataInfoProviders.forEach(p => {
                                p.addInformation(context, dataPath, data);
                            });
                        }

                        // if ((!viewKey || !viewKey.length) && $.isPlainObject(descriptor.value)) {
                        //     // looks like an unhandled object
                        //     const childContext = context.createChildContext(dataPath);
                        //     const child = new JsonEntityInfo(childContext, data);
                        //     callback(child);
                        // }
                        // else if (viewKey) {
                        data.viewKey = viewKey;
                        callback(data);
                        // }
                    }
                });
            }
        }
    }
}

net.ndrei.json.entityMinerRegistry['json'] = new net.ndrei.json.entityminers.JsonMiner();