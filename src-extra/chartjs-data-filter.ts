/// <reference path="../dist/jsonview.d.ts" />

namespace net.ndrei.json.extra {
    const LOG = new logging.Log('array chart view');

    export class ChartJSDataFilter implements DataFilter {
        canBeUsed(entity: any, member: string): boolean {
            return member != '_chartjs';
        }
    }
}

net.ndrei.json.dataFilterRegistry["chartJS"] = () => new net.ndrei.json.extra.ChartJSDataFilter();
