/// <reference path="../entityview.ts" />

namespace net.ndrei.json.entityviews {
    import entityViewRegistry = net.ndrei.json.entityViewRegistry;
    
    export class DefaultView implements EntityView {
        constructor(private entityInfo: EntityInfo) {
        }

        render(context: JsonContext): void {
            if (this.entityInfo && entityLayoutRegistry) {
                const layoutBuilder = entityLayoutRegistry[this.entityInfo.layoutKey || 'list'];
                const layout: EntityLayout = layoutBuilder ? layoutBuilder() : undefined;

                if (layout && this.entityInfo.data && this.entityInfo.data.length && dataLayoutRegistry) {
                    layout.initialize(context.container);
                    this.layoutCategory(context, 0, this.entityInfo.data, layout);
                }
            }
        }

        private layoutCategory(context: JsonContext, depth: number, data: DataInfo[], parent: DataCategoryLayout) {
            if (!data || !data.length) {
                return;
            }

            const categories: string[] = [];
            const organized: { [category: string]: DataInfo[] } = {};
            organized[''] = [];
            data.forEach(data => {
                let categoryKey = '';
                if (data && data.category && (data.category.length > depth)) {
                    // sub-category
                    categoryKey = data.category[depth];
                }
                if (categoryKey && categoryKey.length && (categories.indexOf(categoryKey) < 0)) {
                    categories.push(categoryKey);
                    organized[categoryKey] = [];
                }
                organized[categoryKey].push(data);
            });

            if (categories.length) {
                const categoryLayoutBuilder = dataCategoryLayoutRegistry ? dataCategoryLayoutRegistry['default'] : undefined;
                if (categoryLayoutBuilder) {
                    categories.forEach(c => {
                        const layout = categoryLayoutBuilder(c);
                        if (layout) {
                            parent.addData(layout);
                            this.layoutCategory(context, depth + 1, organized[c], layout);
                        }
                    });
                }
            }

            organized[''].forEach(data => {
                const dataLayoutBuilder = (data && data.layoutKey) ? dataLayoutRegistry[data.layoutKey] : undefined;
                const dataLayout = dataLayoutBuilder ? dataLayoutBuilder() : undefined;
                if (dataLayout) {
                    const view = data.createView();
                    if (view) {
                        parent.addData(dataLayout);
                        view.render(context, dataLayout);
                    }
                }
            });
        }
    }
}

net.ndrei.json.entityViewRegistry['default'] = (entityInfo) => new net.ndrei.json.entityviews.DefaultView(entityInfo);