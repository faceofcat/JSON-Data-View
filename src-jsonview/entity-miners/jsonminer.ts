/// <reference path="../entityminer.ts" />

namespace net.ndrei.json.entityminers {
    export class JsonMiner implements EntityMiner {
        digIntoEntity(context: JsonContext): EntityInfo {
            const info = new SimpleEntityInfo(context.entityLayoutKey || 'list');

            let entity = context.entity;
            if (entity && !$.isPlainObject(entity)) {
                entity = { value: entity };
            }

            if (entity) {
                Object.getOwnPropertyNames(entity).forEach(memberName => {
                    if (!context.filters || !context.filters.length || context.filters.every(f => f.canBeUsed(entity, memberName))) {
                        const descriptor = Object.getOwnPropertyDescriptor(entity, memberName);
                        let view: DataView = undefined;
                        for(let index in (context.dataViewFactories || [])) {
                            const factory = context.dataViewFactories[index];
                            view = factory ? factory.getView(entity, memberName, descriptor) : null;
                            if (view) {
                                break;
                            }
                        }

                        if (view) {
                            info.addData(new JsonDataInfo([], memberName, descriptor.value, i => view));
                        }
                    }
                });
            }

            return info;
        }
    }
}

net.ndrei.json.entityMinerRegistry['json'] = new net.ndrei.json.entityminers.JsonMiner();