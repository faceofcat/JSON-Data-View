/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityinfo.ts" />

namespace net.ndrei.json {
    export const entityMinerRegistry: { [key: string]: EntityMiner } = {};

    export abstract class EntityMiner {
        abstract digIntoEntity(entity: EntityInfo) : EntityInfo;
    }
}