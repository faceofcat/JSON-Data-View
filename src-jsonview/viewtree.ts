/// <reference path="nodeinfo.ts" />
/// <reference path="logger.ts" />

namespace net.ndrei.json.viewtree {
    export class ViewNode {

    }

    class ViewNodeLeaf extends ViewNode {

    }

    class ViewNodeGroup extends ViewNode {
        readonly children: ViewNode[] = [];
    }

    const LOG = new logging.Log('view tree');

    export class ViewTree {
        private tree: {[path: string]: ViewNode} = {};
        private root: ViewNodeGroup = undefined;

        constructor() {
            this.tree[''] = this.root = new ViewNodeGroup();
        }

        addInfo(info: NodeInfo): ViewNode {
            let category = info.category;
            if (!category || !category.length) {
                category = info.dataPath.split('.');
                category = (category.length >= 2) ? category.slice(0, category.length - 2) : [];
            }
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
            }
            else if (info instanceof EntityInfo) {
                // add "something"
            }

            return undefined;
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
            const parent = (lastIndex >= 0) ? this.ensureGroup(path.substr(0, lastIndex - 1)) : this.root;
            
            const group = new ViewNodeGroup();
            parent.children.push(group);
            this.tree[path] = group;
            return group;
        }
    }
}