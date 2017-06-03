/// <reference path="../datainfoprovider.ts" />

namespace net.ndrei.json.datainfoproviders {
    export class JsonMetadataProvider implements DataInfoProvider {
        constructor() {
        }

        gatherInformation(context: JsonContext, dataPath: string): DataInfoProviderMeta {
            const entity = context.entity;

            let raw = undefined;
            const metadata = context.getValue(dataPath, '_metadata');
            const memberName = (dataPath || '').substr((dataPath || '').lastIndexOf('.') + 1);

            // step 1. look for {entity}._metadata.{member}
            raw = metadata ? metadata[memberName] : undefined;
            // step 2. look for {entity}._{member}Info
            raw = $.extend({}, raw || {}, context.getValue(dataPath, `_${memberName}Info`) || {});

            const final: DataInfoProviderMeta = {};
            if (raw) {
                const metadata = <DataInfoProviderMeta & { category: string | string[] }>raw;

                if (metadata.label) {
                    final.label = metadata.label;
                }

                if (metadata.category && $.isArray(metadata.category)) {
                    final.category = metadata.category;
                }
                else if (metadata.category && (typeof metadata.category == "string")) {
                    final.category = metadata.category.split('.');
                }

                if (metadata.index) {
                    final.index = metadata.index;
                }
                if (metadata.viewKey) {
                    final.viewKey = metadata.viewKey;
                }
                if (metadata.layoutKey) {
                    final.layoutKey = metadata.layoutKey;
                }
                if (metadata.data) {
                    final.data = metadata.data;
                }
            }
            return final;
        }
    }
}

net.ndrei.json.dataInfoProviderRegistry['json_metadata'] = new net.ndrei.json.datainfoproviders.JsonMetadataProvider();