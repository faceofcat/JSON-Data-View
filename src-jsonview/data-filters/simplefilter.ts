/// <reference path="../datafilter.ts" />

namespace net.ndrei.json.datafilters {
    import DataFilter = net.ndrei.json.DataFilter;
    export class SimpleFilter implements DataFilter {
        constructor(private delegate: (member: string) => boolean) {
        }

        canBeUsed(entity: any, member: string): boolean {
            return this.delegate && this.delegate(member);
        }
    }
}

net.ndrei.json.dataFilterRegistry['underscore'] = () => new net.ndrei.json.datafilters.SimpleFilter(m => m && m.length && (m.charAt(0) != '_'));