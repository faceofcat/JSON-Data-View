/// <reference path="dataview.ts" />

namespace net.ndrei.json {
    export const dataViewFactoryRegistry: { [key: string]: () => DataViewFactory } = {};

    export interface DataViewFactory {
        getView(entity: any, memberName: string, member: PropertyDescriptor): DataView;
    }
}