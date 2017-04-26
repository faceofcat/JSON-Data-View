/// <reference path="entityinfo.ts" />
/// <reference path="jsoncontext.ts" />

namespace net.ndrei.json {
    export const entityViewRegistry: { [key: string]: (entity: EntityInfo) => EntityView } = {};

    export interface EntityView {
        render(context: JsonContext): void;
    }
}