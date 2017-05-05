namespace net.ndrei.json {
    export const dataLayoutRegistry: { [key: string]: () => DataLayout } = {};

    export interface BaseLayout {
        initialize(container: JQuery): BaseLayout;
    }

    export interface DataLayout extends BaseLayout {
        renderDefaultLabel(label: string): DataLayout;

        getContainer(): JQuery;
        getLabelContainer(): JQuery;
        getValueContainer(): JQuery;
    }
}