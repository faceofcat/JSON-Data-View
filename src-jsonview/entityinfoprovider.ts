/// <reference path="entityinfo.ts" />
/// <reference path="jsoncontext.ts" />

namespace net.ndrei.json {
    export const entityInfoProviderRegistry: { [key: string]: EntityInfoProvider } = {};

    export interface EntityInfoProviderMeta {
        /**
         * Key of the Entitylayout to use.
         */
        layoutKey?: string;
    }

    export abstract class EntityInfoProvider {
        abstract addInformation(info: EntityInfo): void;
    }
}