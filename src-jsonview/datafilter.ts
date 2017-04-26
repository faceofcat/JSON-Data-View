namespace net.ndrei.json {
    export const dataFilterRegistry: { [key: string]: () => DataFilter } = {};

    export interface DataFilter {
        canBeUsed(entity: any, member: string): boolean;
    }
}