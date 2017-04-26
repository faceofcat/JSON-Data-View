namespace net.ndrei.json {
    export const entityLayoutRegistry: { [key: string]: (container: JQuery) => EntityLayout } = {};

    export interface EntityLayout {
        addData(data: DataLayout): EntityLayout;
    }
}