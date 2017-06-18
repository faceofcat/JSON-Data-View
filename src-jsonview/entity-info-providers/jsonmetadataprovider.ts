/// <reference path="../entityinfoprovider.ts" />

namespace net.ndrei.json.entityinfoproviders {
    export class JsonMetadataProvider implements EntityInfoProvider {
        constructor() {
        }

        addInformation(info: EntityInfo): void {
            const entity = info.context.getValue();

            let raw = undefined;
            // step 1. look for {entity}._metadata._info
            entity && entity._metadata && entity._metadata._info && (raw = entity._metadata._info);

            if (raw) {
                const metadata = <EntityInfoProviderMeta>raw;

                metadata.layoutKey && metadata.layoutKey.length && (info.layoutKey = metadata.layoutKey);
                metadata.categoriesInfo && (info.categoriesInfo = metadata.categoriesInfo);
                metadata.layoutData && (info.layoutData = metadata.layoutData);
            }
        }
    }
}

net.ndrei.json.entityInfoProviderRegistry['json_metadata'] = new net.ndrei.json.entityinfoproviders.JsonMetadataProvider();