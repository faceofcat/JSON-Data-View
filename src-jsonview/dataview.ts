/// <reference path="datalayout.ts" />
/// <reference path="jsoncontext.ts" />

namespace net.ndrei.json {
    export interface DataView {
        readonly layoutKey: string;
        render(context: JsonContext, layout: DataLayout): void;
    }
}