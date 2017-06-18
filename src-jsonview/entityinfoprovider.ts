/// <reference path="entityinfo.ts" />
/// <reference path="jsoncontext.ts" />
/// <reference path="datacategorylayout.ts" />

namespace net.ndrei.json {
    export const entityInfoProviderRegistry: { [key: string]: EntityInfoProvider } = {};

    export interface EntityInfoProviderMeta extends DataCategoryLayoutInfo {
        /**
         * Specify the category metada for this entity.
         * Use '_.' at the start of category path to specify a global category.
         */
        categoriesInfo?: { [localPath: string]: string | DataCategoryLayoutInfo };
    }

    export abstract class EntityInfoProvider {
        abstract addInformation(info: EntityInfo): void;
    }
}