/// <reference path="datacategorylayout.ts" />

namespace net.ndrei.json {
    export const entityLayoutRegistry: { [key: string]: () => EntityLayout } = {};

    export interface EntityLayout extends DataCategoryLayout {
        // addData(data: DataLayout): EntityLayout;
    }
}