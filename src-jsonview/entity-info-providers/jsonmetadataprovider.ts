/// <reference path="../entityinfoprovider.ts" />

namespace net.ndrei.json.entityinfoproviders {
    export class JsonMetadataProvider implements EntityInfoProvider {
        constructor() {
        }

        addInformation(info: EntityInfo): void {
            const entity = info.context.getValue();

            let raw = undefined;
            // step 1. look for {entity}._metadata._info
            if (entity && entity._metadata && entity._metadata._info) {
                raw = entity._metadata._info;
            }

            if (raw) {
                const metadata = <EntityInfoProviderMeta>raw;

                if (metadata.layoutKey) {
                    info.layoutKey = metadata.layoutKey;
                }
            }
        }
    }
}

net.ndrei.json.entityInfoProviderRegistry['json_metadata'] = new net.ndrei.json.entityinfoproviders.JsonMetadataProvider();