namespace net.ndrei.json {
    export const dataViewFactoryRegistry: { [key: string]: () => DataViewFactory } = {};

    export interface DataViewFactory {
        getViewKey(entity: any, memberName: string, member: PropertyDescriptor): string;
    }
}
