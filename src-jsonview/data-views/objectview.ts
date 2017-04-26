/// <reference path="jsondataview.ts" />

namespace net.ndrei.json.dataviews {
    import JSONView = net.ndrei.json.JSONView;
    import JsonMiner = net.ndrei.json.entityminers.JsonMiner;
    export class ObjectDataView implements DataView {
        constructor(private label: string, private value: any) {
        }

        get layoutKey(): string {
            return 'titled';
        }

        render(context: JsonContext, layout: DataLayout): void {
            layout.getContainer().addClass('collapsable');
            layout.renderDefaultLabel(this.label);
            
            context
                .clone(layout.getValueContainer(), this.value, 'table')
                .render();
        }
    }
}