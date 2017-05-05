/// <reference path="datalayout.ts" />

namespace net.ndrei.json {
    export const dataCategoryLayoutRegistry: { [key: string]: (label: string) => DataCategoryLayout } = {};

    export interface DataCategoryLayout extends BaseLayout {
        addData(data: BaseLayout): DataCategoryLayout;
    }
}