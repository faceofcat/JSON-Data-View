namespace net.ndrei.json {
    /**
     * Base interface for DataInfo (property) and EntityInfo (object).
     */
    export interface NodeInfo {
        /**
         * the category path where to render the node
         * (ignored for root EntityInfo) 
         */
        category: string[];
        /**
         * the label to display next to this node
         * (ignored for root EntityInfo)
         */
        label: string;
        /**
         * number used to sort nodes in the same category
         */
        index: number;

        /**
         * key to be used for retrieving the view from the view repository
         * (DataInfo will look in dataViewRegistry and Entityinfo will look in entityViewRegistry)
         */
        viewKey: string;

        /**
         * layout used to render the view
         * (DataInfo will look in dataLayoutRegistry and EntityInfo will look in entityLayoutRegistry)
         */
        layoutKey: string;

        /**
         * Data path used to get the value for this node relative to the root entity
         */
        readonly dataPath: string;

        /**
         * Parent entity
         * (null for root entity info)
         */
        parent: EntityInfo;
    }

    export class JsonNodeInfo implements NodeInfo {
        private _label: string = undefined;

        constructor(public readonly dataPath: string) {
        }

        get label(): string {
            return this._label || (this.dataPath ? this.dataPath.substr(this.dataPath.lastIndexOf('.') + 1) : '');
        }
        set label(value: string) {
            this._label = value;
        }

        // todo: consider moving these to get{thing} / set{thing} methods so they can be overriden

        category: string[] = undefined;
        index: number = undefined;

        viewKey: string = undefined;
        layoutKey: string = undefined;

        parent: EntityInfo = undefined;

        toJSON(): any {
            return {
                dataPath: this.dataPath,
                category: (this.category && this.category.length) ? this.category.join(' / ') : undefined,
                index: this.index,
                label: this._label,
                view: `${this.viewKey || '\{default view\}'} [${this.layoutKey || '\{default layout\}'}]`
            };
        }
    }
}