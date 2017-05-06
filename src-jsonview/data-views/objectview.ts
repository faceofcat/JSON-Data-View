/// <reference path="../jsoncontext.ts" />
/// <reference path="../datalayout.ts" />

namespace net.ndrei.json.dataviews {
    export class ObjectDataView implements DataView {
        static readonly VIEW_KEY: string = 'object';

        constructor(private info: DataInfo) {
        }

        get layoutKey(): string {
            return 'titled';
        }

        render(context: JsonContext, layout: DataLayout): void {
            // layout.getContainer().addClass('collapsable');
            // layout.renderDefaultLabel(this.info.label);
            
            // let value = this.info.children;
            // if (value) {
            //     context.renderEntity(layout.getValueContainer(), this.info.dataPath, this.info.children);
            // }
        }
    }
}

// net.ndrei.json.dataViewRegistry[net.ndrei.json.dataviews.ObjectDataView.VIEW_KEY] = info => new net.ndrei.json.dataviews.ObjectDataView(info);