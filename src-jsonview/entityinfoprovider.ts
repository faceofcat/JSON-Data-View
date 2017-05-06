/// <reference path="entityinfo.ts" />
/// <reference path="jsoncontext.ts" />

namespace net.ndrei.json {
    export const entityInfoProviderRegistry: { [key: string]: EntityInfoProvider } = {};

    export interface EntityInfoProvider {
        addInformation(info: EntityInfo): void;
    }
}