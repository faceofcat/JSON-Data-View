/// <reference path="../datainfoprovider.ts" />

namespace net.ndrei.json.datainfoproviders {
    export class JsonMetadataProvider implements DataInfoProvider {
        constructor() {
        }

        addInformation(context: JsonContext, member: string, info: DataInfo): void {
            const entity = context.entity;

            let raw = undefined;
            // step 1. look for {entity}._metadata.{member}
            if (entity && entity._metadata && entity._metadata[member]) {
                raw = entity._metadata[member];
            }
            // step 2. look for {entity}._{member}Info
            if (!raw) {
                raw = entity[`_${member}Info`];
            }

            if (raw) {
                const metadata = <{ // TODO: make this into a real type somewhere
                    label?: string,
                    category?: string | string[],
                    index?: number,
                    viewKey?: string
                }>raw;

                if (metadata.label) {
                    info.label = metadata.label;
                }
                if (metadata.category) {
                    info.category = $.isArray(metadata.category) ? metadata.category : [metadata.category];
                }
                if (metadata.index) {
                    info.index = metadata.index;
                }
                if (metadata.viewKey) {
                    info.viewKey = metadata.viewKey;
                }
            }
        }
    }
}

net.ndrei.json.dataInfoProviderRegistry['json_metadata'] = new net.ndrei.json.datainfoproviders.JsonMetadataProvider();