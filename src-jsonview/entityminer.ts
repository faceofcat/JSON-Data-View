/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityinfo.ts" />

namespace net.ndrei.json {
    export const entityMinerRegistry: { [key: string]: EntityMiner } = {};

    export interface EntityMiner {
        digIntoEntity(context: JsonContext) : EntityInfo;
    }
}