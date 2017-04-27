/// <reference path="datalayout.ts" />
/// <reference path="datainfo.ts" />
/// <reference path="jsoncontext.ts" />

namespace net.ndrei.json {
    export const dataViewRegistry: { [key: string]: (data: DataInfo) => DataView } = {};

    export interface DataView {
        readonly layoutKey: string;
        render(context: JsonContext, layout: DataLayout): void;
    }
}