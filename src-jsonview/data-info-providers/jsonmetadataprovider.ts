/// <reference path="../datainfoprovider.ts" />

namespace net.ndrei.json.datainfoproviders {
    export class JsonMetadataProvider implements DataInfoProvider {
        constructor() {
        }

        addInformation(context: JsonContext, dataPath: string, info: DataInfo): void {
            const entity = context.entity;

            let raw = undefined;
            const metadata = context.getValue(dataPath, '_metadata');
            const memberName = dataPath.substr(dataPath.lastIndexOf('.') + 1);

            // step 1. look for {entity}._metadata.{member}
            if (metadata && metadata[memberName]) {
                raw = metadata[memberName];
            }
            // step 2. look for {entity}._{member}Info
            if (!raw) {
                raw = context.getValue(dataPath, `_${memberName}Info`);
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