namespace net.ndrei.json {
    export interface DataInfo {
        category: string[];
        label: string;
        layoutKey: string;
        index: number;
        viewKey: string;

        getValue(): any;
        createView(): DataView;
    }

    export class JsonDataInfo implements DataInfo {
        constructor(
            public category: string[],
            public label: string,
            public index: number,
            private value: any,
            public viewKey: string
            // private dataViewCreator: (info: DataInfo) => DataView) {
            ) { }

        getValue(): any {
            return this.value;
        }

        get layoutKey(): string {
            return 'labeled';
        }

        createView(): DataView {
            // return (this.dataViewCreator ? this.dataViewCreator(this) : undefined);
            const creator = (this.viewKey && dataViewRegistry) ? dataViewRegistry[this.viewKey] : undefined;
            return creator ? creator(this) : undefined;
        }
    }
}