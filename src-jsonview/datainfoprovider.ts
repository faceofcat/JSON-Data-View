/// <reference path="nodeinfo.ts" />
/// <reference path="jsoncontext.ts" />

namespace net.ndrei.json {
    export const dataInfoProviderRegistry: { [key: string]: DataInfoProvider } = {};

    export interface DataInfoProviderMeta {
        /**
         * label to display in front of this property
         */
        label?: string,

        /**
         * The tree path where this property is displayed
         */
        category?: string[],

        /**
         * Used to sort properties in the same category
         * default: 0
         */
        index?: number,

        /**
         * The view to be used to display this property's value
         * if null|undefined the data view factories will be used to find a default one
         */
        viewKey?: string,

        /**
         * The layout to be used when displaying this property
         * if null|undefined the default layout for the data view will be used
         */
        layoutKey?: string,

        /**
         * Additional config data for the view.
         */
        data?: any

        /**
         * Merge this entity's properties with the parent's properties
         * only makes sense when the data member is an object
         */
        flattenHierarchy?: boolean;
    }

    export abstract class DataInfoProvider {
        abstract gatherInformation(context: JsonContext, member: string): DataInfoProviderMeta;
    }
}