/// <reference path="property-views/propertiesfactory.ts" />

namespace net.ndrei.json {
    function createNodes(json: any): JQuery {
        const ul = $('<ul />');

        if (json) {
            for(let key in json) {
                const value = json[key];
                const li = $('<li />');

                if ($.isFunction(value)) {
                    li.text(`${key}: function`);
                }
                else if ($.isPlainObject(value)) {
                    li.text(`${key}:`);
                    li.append(createNodes(value));
                } else {
                    const view = PropertiesFactory.createProperty(key, value);
                    if (view) {
                        view.render(li);
                    }
                    else {
                        // skip this item as it has no view
                        continue;
                    }
                }
                ul.append(li);
            }
        }

        return ul;
    }

    export class JSONView {
        public static create(host: JQuery, json: any): JSONView {
            // host.append(createNodes(json));
            const view = PropertiesFactory.createProperty('', json);
            if (view) {
                view.render(host);
            }
            return undefined;
        }
    }
}