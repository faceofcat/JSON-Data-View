namespace net.ndrei.json {
    export const dataLayoutRegistry: { [key: string]: () => DataLayout } = {};

    export interface DataLayout {
        initialize(container: JQuery): DataLayout;
        
        renderDefaultLabel(label: string): DataLayout;

        getContainer(): JQuery;
        getLabelContainer(): JQuery;
        getValueContainer(): JQuery;
    }
}