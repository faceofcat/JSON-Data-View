/// <reference path="../entityview.ts" />

namespace net.ndrei.json.entityviews {
    import entityViewRegistry = net.ndrei.json.entityViewRegistry;
    
    export class DefaultView extends EntityViewBase /* implements EntityView */ {
        constructor(entity: EntityInfo) {
            super(entity);
        }

        render(/* context: ViewContext, */ layout: EntityLayout): void {
            if (this.entity /* && entityLayoutRegistry */) {
                // const layoutBuilder = entityLayoutRegistry[this.entity.layoutKey || 'list'];
                // const layout: EntityLayout = layoutBuilder ? layoutBuilder() : undefined;

                if (/* layout && */ this.entity.data && this.entity.data.length && dataLayoutRegistry) {
                    // layout.initialize(context.container);
                    if (this.entity.label && this.entity.label.length) {
                        layout.setLabel(this.entity.label);
                    }

                    this.layoutCategory(this.entity.context.getJsonContext(), 0, this.entity.data, layout);
                }
            }
        }

        private layoutCategory(context: JsonContext, depth: number, data: NodeInfo[], parent: DataCategoryLayout) {
            if (!data || !data.length) {
                return;
            }

            const categories: string[] = [];
            const organized: { [category: string]: /* { data: DataInfo, depth: number}*/ NodeInfo[] } = {};
            organized[''] = [];
            data.forEach(data => {
                let categoryKey = '';
                let dataDepth = depth + 1;
                if (data && data.category && (data.category.length > depth)) {
                    // sub-category
                    categoryKey = data.category[depth];
                }
                if (categoryKey && categoryKey.length && (categories.indexOf(categoryKey) < 0)) {
                    categories.push(categoryKey);
                    organized[categoryKey] = [];
                }

                organized[categoryKey].push(data); // { data: data, depth: dataDepth });
            });

            if (categories.length) {
                const categoryLayoutBuilder = dataCategoryLayoutRegistry ? dataCategoryLayoutRegistry['default'] : undefined;
                if (categoryLayoutBuilder) {
                    categories.sort((a, b) => {
                            return a.localeCompare(b);
                        }).forEach(c => {
                        const layout = categoryLayoutBuilder(c);
                        if (layout) {
                            parent.addData(layout);
                            this.layoutCategory(context, depth + 1, organized[c], layout);
                        }
                    });
                }
            }

            organized[''].sort((a, b) => {
                    if (!a && !b) {
                        return 0;
                    }
                    else if (!a && b) {
                        return -1;
                    }
                    else if (a && !b) {
                        return 1;
                    }
                    else if (a.index == b.index) {
                        return (a.label || '').localeCompare(b.label || '');
                    }
                    else {
                        return a.index - b.index;
                    }
                }).forEach(data => {
                if (data instanceof JsonDataInfo) {
                    const dataLayoutKey = (data ? data.layoutKey : undefined) || 'labeled';
                    const dataLayoutBuilder = dataLayoutRegistry ? dataLayoutRegistry[dataLayoutKey] : undefined;
                    const dataLayout = dataLayoutBuilder ? dataLayoutBuilder() : undefined;
                    if (dataLayout) {
                        const view = JsonDataInfo.createView(data);
                        if (view) {
                            parent.addData(dataLayout);
                            view.render(context, dataLayout);
                        }
                    } 
                    else {
                        console.log(`Data layout '${dataLayoutKey}' not found!`);
                    }
                } else if (data instanceof JsonEntityInfo) {
                    const entityLayoutKey = (data ? data.layoutKey : undefined) || 'list';
                    const entityLayoutBuilder = entityLayoutRegistry ? entityLayoutRegistry[entityLayoutKey] : undefined;
                    const entityLayout = entityLayoutBuilder ? entityLayoutBuilder() : undefined;
                    if (entityLayout) {
                        const view = getEntityView(data);
                        if (view) {
                            parent.addData(entityLayout);
                            view.render(entityLayout);
                        }
                    }
                }
                else {
                    console.log('Unknown node info type.', data);
                }
            });
        }
    }
}

net.ndrei.json.entityViewRegistry['default'] = (entityInfo) => new net.ndrei.json.entityviews.DefaultView(entityInfo);