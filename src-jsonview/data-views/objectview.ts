/// <reference path="../jsoncontext.ts" />
/// <reference path="../datalayout.ts" />

namespace net.ndrei.json.dataviews {
    export class ObjectDataView implements DataView {
        constructor(private info: DataInfo) {
        }

        get layoutKey(): string {
            return 'titled';
        }

        render(context: JsonContext, layout: DataLayout): void {
            layout.getContainer().addClass('collapsable');
            layout.renderDefaultLabel(this.info.label);
            
            context
                .clone(layout.getValueContainer(), this.info.getValue())
                .render();
        }
    }
}

net.ndrei.json.dataViewRegistry['object'] = info => new net.ndrei.json.dataviews.ObjectDataView(info);