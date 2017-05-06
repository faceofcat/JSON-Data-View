/// <reference path="jsoncontext.ts" />
/// <reference path="entityinfo.ts" />
/// <reference path="nodeinfo.ts" />

namespace net.ndrei.json {
    /**
     * Interface used to describe a property
     */
    export interface DataInfo extends NodeInfo {
        getValue(context: JsonContext): any;

        view: DataView;
    }

    export class JsonDataInfo extends JsonNodeInfo implements DataInfo {
        constructor(dataPath: string) {
            super(dataPath);
        }

        view: DataView = undefined;

        getValue(context: JsonContext): any {
            return context ? context.getValue(this.dataPath) : undefined;
        }

        toJSON(): any {
            return $.extend(super.toJSON(), {
            });
        }

        // todo: move this to an exported method in dataview.ts
        static createView(info: DataInfo): DataView {
            // return (this.dataViewCreator ? this.dataViewCreator(this) : undefined);
            const creator = (info && info.viewKey && dataViewRegistry) ? dataViewRegistry[info.viewKey] : undefined;
            return creator ? creator(info) : undefined;
        }
    }
}