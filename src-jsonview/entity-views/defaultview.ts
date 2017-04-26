/// <reference path="../entityview.ts" />

namespace net.ndrei.json.entityviews {
    import entityViewRegistry = net.ndrei.json.entityViewRegistry;
    export class DefaultView implements EntityView {
        constructor(private entityInfo: EntityInfo) {
        }

        render(context: JsonContext): void {
            if (this.entityInfo && entityLayoutRegistry) {
                const layoutBuilder = entityLayoutRegistry[this.entityInfo.layoutKey || 'list'];
                const layout: EntityLayout = layoutBuilder ? layoutBuilder(context.container) : undefined;
                if (layout && this.entityInfo.data && this.entityInfo.data.length && dataLayoutRegistry) {
                    this.entityInfo.data.forEach(data => {
                        const dataLayoutBuilder = (data && data.layoutKey) ? dataLayoutRegistry[data.layoutKey] : undefined;
                        const dataLayout = dataLayoutBuilder ? dataLayoutBuilder() : undefined;
                        if (dataLayout) {
                            const view = data.createView();
                            if (view) {
                                layout.addData(dataLayout);
                                view.render(context, dataLayout);
                            }
                        }
                    });
                }
            }
        }
    }
}

net.ndrei.json.entityViewRegistry['default'] = (entityInfo) => new net.ndrei.json.entityviews.DefaultView(entityInfo);