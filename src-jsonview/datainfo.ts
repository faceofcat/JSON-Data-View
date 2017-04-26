namespace net.ndrei.json {
    export interface DataInfo {
        readonly category: string[];
        readonly label: string;
        readonly layoutKey: string;

        getValue(): any;
        createView(): DataView;
    }

    export class JsonDataInfo implements DataInfo {
        constructor(
            public readonly category: string[],
            public readonly label: string,
            private value: any,
            private dataViewCreator: (info: DataInfo) => DataView) {
        }

        getValue(): any {
            return this.value;
        }

        get layoutKey(): string {
            return 'labeled';
        }

        createView(): DataView {
            return (this.dataViewCreator ? this.dataViewCreator(this) : undefined);
        }
    }
}