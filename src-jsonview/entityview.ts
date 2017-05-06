/// <reference path="entityinfo.ts" />
/// <reference path="jsoncontext.ts" />

namespace net.ndrei.json {
    export const entityViewRegistry: { [key: string]: (entity: EntityInfo) => EntityView } = {};

    export function getEntityView(entity: EntityInfo): EntityView {
        const key = (entity ? entity.viewKey : undefined) || 'default';
        const builder = (key && entityViewRegistry) ? entityViewRegistry[key] : undefined;
        return builder ? builder(entity) : undefined;
    }

    export interface EntityView {
        render(/* context: ViewContext, */ layout: EntityLayout): void;
    }

    export abstract class EntityViewBase implements EntityView {
        protected constructor(protected readonly entity: EntityInfo) {
            entity.view = this;
        }

        abstract render(/* context: ViewContext, */ layout: EntityLayout): void;
    }
}