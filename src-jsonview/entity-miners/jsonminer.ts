/// <reference path="../entityminer.ts" />

namespace net.ndrei.json.entityminers {
    export class JsonMiner implements EntityMiner {
        digIntoEntity(context: JsonContext): EntityInfo {
            const info = new SimpleEntityInfo(context.entityLayoutKey || 'list');

            if (context.entityInfoProviders) {
                context.entityInfoProviders.forEach(p => {
                    p.addInformation(context, info);
                });
            }

            let entity = context.entity;
            if (entity && !$.isPlainObject(entity)) {
                entity = { value: entity };
            }

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

                        const data = new JsonDataInfo([], memberName, 0, descriptor.value, viewKey || 'string');
                        if (context.dataInfoProviders) {
                            context.dataInfoProviders.forEach(p => {
                                p.addInformation(context, memberName, data);
                            });
                        }
                        info.addData(data);
                    }
                });
            }

            return info;
        }
    }
}

net.ndrei.json.entityMinerRegistry['json'] = new net.ndrei.json.entityminers.JsonMiner();