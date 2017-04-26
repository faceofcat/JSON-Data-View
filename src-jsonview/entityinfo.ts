namespace net.ndrei.json {
    export interface EntityInfo {
        readonly layoutKey: string;
        readonly data: DataInfo[];
    }

    export class SimpleEntityInfo implements EntityInfo {
        private _data: DataInfo[] = [];

        constructor(private _layoutKey: string = 'list') {
        }

        get layoutKey(): string {
            return this._layoutKey;
        }

        get data(): DataInfo[] {
            // TODO: find a way to 'protect' this
            return this._data;
        }

        addData(data: DataInfo): SimpleEntityInfo {
            this._data.push(data);
            return this;
        }
    }
}