/// <reference path="datainfo.ts" />
/// <reference path="jsoncontext.ts" />

namespace net.ndrei.json {
    export const dataInfoProviderRegistry: { [key: string]: DataInfoProvider } = {};

    export interface DataInfoProvider {
        addInformation(context: JsonContext, member: string, info: DataInfo): void;
    }
}