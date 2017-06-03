namespace net.ndrei.json {
    export const dataFilterRegistry: { [key: string]: () => DataFilter } = {};

    export abstract class DataFilter {
        abstract canBeUsed(entity: any, member: string): boolean;
    }
}