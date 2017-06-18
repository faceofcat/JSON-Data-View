/// <reference path="nodeinfo.ts" />
/// <reference path="logger.ts" />

namespace net.ndrei.json.viewtree {
    const LOG = new logging.Log('view tree');

    abstract class ViewNode {
        private _parent: ViewNodeGroup;

        abstract getLabel(): string;
        abstract getLayoutKey(): string;
        abstract getViewKey(): string;
        abstract getSortIndex(): number;

        get parent(): ViewNodeGroup { return this._parent; }
        set parent(value: ViewNodeGroup) { this._parent = value; }

        abstract render(context: JsonContext): void;

        get path(): string {
            return `${((this.parent) ? `${this.parent.path}.` : '')}${this.getLabel()}`;
        }

        toJSON(): any {
            return { label: this.getLabel() };
        }
    }

    class ViewNodeLeaf extends ViewNode {
        constructor(private dataInfo: DataInfo) {
            super();

        }

        getLabel() { return this.dataInfo.label; }
        getLayoutKey() { return this.dataInfo.layoutKey; }
        getViewKey() { return this.dataInfo.viewKey; }
        getSortIndex() { return this.dataInfo.index; }

        toJSON() {
            return $.extend(super.toJSON(), { leafDataPath: this.dataInfo.dataPath });
        }

        render(context: JsonContext) {
            const view = DataInfo.createView(this.dataInfo);
            if (!view) {
                LOG.warn(`Could not create view for node: '${this.path}'.`);
                return;
            }

            const layoutKey = this.getLayoutKey() || view.layoutKey || context.defaultDataLayoutKey || 'labeled';
            const layoutBuilder = dataLayoutRegistry[layoutKey];
            if (!layoutBuilder) {
                LOG.warn(`Could not find layout: '${layoutKey}' for node: '${this.path}'.`);
                return;
            }
            const layout = layoutBuilder();

            this.parent.initializeChildLayout(layout);
            view.render(context, layout);
        }
    }

    class ViewNodeGroup extends ViewNode {
        private _layoutKey: string;
        private _viewKey: string;
        private _sortIndex: number = 0;

        private layoutData: any = undefined;
        private layout: DataCategoryLayout = undefined;

        constructor(private label: string) {
            super();
        }

        getLabel(): string { return this.label; }
        getLayoutKey() { return this.layoutKey; }
        getViewKey() { return this.viewKey; }
        getSortIndex() { return this.sortIndex; }

        get layoutKey(): string { return this._layoutKey; }
        set layoutKey(value: string) { this._layoutKey = value; }

        get viewKey(): string { return this._viewKey; }
        set viewKey(value: string) { this._viewKey = value; }

        get sortIndex(): number { return this._sortIndex; }
        set sortIndex(value: number) { this._sortIndex = value; }

        readonly children: ViewNode[] = [];

        toJSON() {
            const result = super.toJSON();
            this.layoutKey && (this.layoutKey != 'default') && $.extend(result, { layoutKey: this.layoutKey });
            return $.extend(result, { children: this.children });
        }

        updateFromMetadata(meta: DataCategoryLayoutInfo): void {
            meta && (typeof meta == 'string') && (meta = { layoutKey: meta });

            meta.layoutKey && meta.layoutKey.length && (this.layoutKey = meta.layoutKey);
            meta.layoutData && (this.layoutData = meta.layoutData);
        }

        render(context: JsonContext) {
            if (this.layout) {
                LOG.warn(`Category '${this.path}' already rendered.`);
                return;
            }

            const layoutKey = this.layoutKey || context.defaultCategoryLayoutKey || 'default';
            const layoutBuilder = net.ndrei.json.dataCategoryLayoutRegistry[layoutKey];
            if (!layoutBuilder) {
                LOG.warn(`Could not find layout: '${layoutKey}' for node: '${this.path}'.`);
                return;
            }

            this.layout = layoutBuilder(this.getLabel());
            if (!this.parent) {
                // root node
                this.layout.initialize(context.container);
            }
            else {
                // child category
                this.parent.initializeChildLayout(this.layout);
            }

            this.children
                .sort((a, b) => {
                    const ai = a.getSortIndex(), bi = b.getSortIndex();
                    return (ai == bi) ? a.getLabel().localeCompare(b.getLabel()) : (ai - bi); }
                    )
                .forEach(c => c.render(context));
        }

        initializeChildLayout(childLayout: BaseLayout): void {
            if (!this.layout) {
                LOG.warn(`Category '${this.path}' has not been rendered yet.`);
                return undefined;
            }

            this.layout.addData(childLayout);
        }
    }

    export class ViewTree {
        private tree: {[path: string]: ViewNode} = {};
        private root: ViewNodeGroup = undefined;

        constructor(private context: JsonContext) {
            this.tree[''] = this.root = new ViewNodeGroup(undefined);
            this.addInfo(context.rootEntityInfo);
        }

        addInfo(info: NodeInfo): void {
            if ((info instanceof EntityInfo) && !info.dataPath) {
                // root entity
                this.processEntity(info);
                return;
            }

            let category = this.getCategory(info);
            const path = category.join('.');

            let group: ViewNodeGroup = undefined;
            if (this.tree[path] && !(this.tree[path] instanceof ViewNodeGroup)) {
                const ex = `Path '${path}' is not a valid category.`;
                LOG.error(ex);
                throw ex;
            }
            else if (this.tree[path]) {
                group = <ViewNodeGroup>this.tree[path];
            }
            else {
                group = this.ensureGroup(path);
            }

            if (info instanceof DataInfo) {
                // add leaf
                const leaf = new ViewNodeLeaf(info);
                leaf.parent = group;
                group.children.push(leaf);
            }
            else if (info instanceof EntityInfo) {
                // add "something"
                this.processEntity(info);
            }

            return;
        }

        private processEntity(info: EntityInfo): void {
            // add children
            info.children && info.children.length && info.children.forEach(c => {
                    this.addInfo(c);
            });

            // setup entity category information
            const entityCategory = this.tree[(!info.dataPath || !info.dataPath.length)
                ? ''
                : [...this.getCategory(info), info.label].join('.')
            ];
            entityCategory && (entityCategory instanceof ViewNodeGroup) && entityCategory.updateFromMetadata(info);

            // setup category information
            if (info.categoriesInfo) {
                let entityPath: string | undefined = undefined;
                for(const key in info.categoriesInfo) {
                    let path = key;
                    if (path && (path.length >= 2) && (path[0] == '_') && (path[1] == '.')) {
                        !entityPath && (
                            entityPath = [...this.getCategory(info), ...(info.label && info.label.length ? [info.label] : [])].join('.')
                            );
                        path = entityPath + path.substring(1);
                    }

                    const category = this.tree[path];
                    category && (category instanceof ViewNodeGroup)
                        ? category.updateFromMetadata(info.categoriesInfo[key])
                        : LOG.warn(`Category '${path}' not found or invalid.`);
                }
            }
        }

        private getCategory(info: NodeInfo): string[] {
            if (!info || !info.dataPath) {
                // assume root entity info
                return [];
            }

            let category = info.category;
            if (!category || !category.length) {
                category = `_.${info.dataPath}`.split('.');
                category = category.slice(0, category.length - 1); // (category.length >= 2) ? category.slice(0, category.length - 1) : [];
            }

            (!category || !category.length || (category && category.length && (category[0] != '_'))) && (category = [
                ...this.getCategory(info.parent),
                ...(info.parent.label && info.parent.label.length ? [info.parent.label] : []),
                ...category])
            || category && category.length && (category[0] == '_') && (category = category.slice(1));

            return category;
        }

        private ensureGroup(path: string): ViewNodeGroup {
            if (this.tree[path] instanceof ViewNodeGroup) {
                return <ViewNodeGroup>this.tree[path];
            }
            if (this.tree[path]) {
                const ex = `Path '${path}' is not a valid category.`;
                LOG.error(ex);
                throw ex;
            }

            const lastIndex = path.lastIndexOf('.');
            const parent = (lastIndex >= 0) ? this.ensureGroup(path.substr(0, lastIndex)) : this.root;
            
            const group = new ViewNodeGroup(path.substring(lastIndex + 1));
            group.parent = parent;
            parent.children.push(group);
            this.tree[path] = group;
            return group;
        }

        render() {
            this.context.container.addClass('jsonview-root');
            this.root.render(this.context);
        }
    }
}