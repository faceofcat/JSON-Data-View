/// <reference path="../dataviewfactory.ts" />
/// <reference path="../data-views/jsondataview.ts" />
/// <reference path="../data-views/booleanview.ts" />
/// <reference path="../data-views/objectview.ts" />

namespace net.ndrei.json.dataviewfactories {
    import SimpleDataView = net.ndrei.json.dataviews.SimpleDataView;
    import BooleanDataView = net.ndrei.json.dataviews.BooleanDataView;
    import ObjectDataView = net.ndrei.json.dataviews.ObjectDataView;

    export class JsonDataFactory implements DataViewFactory {
        getViewKey(entity: any, memberName: string, member: PropertyDescriptor): string {
            if (!entity || !$.isPlainObject(entity) || !member) {
                return undefined;
            }

            const value = member.get ? member.get() : member.value;
            if ((value == null) || (value == undefined)) {
                // return new SimpleDataView(memberName, undefined, 'data-value-null');
                return 'null';
            }
            else
            {
                if ($.isArray(value)) {
                    // array value
                }
                else if ($.isFunction(value)) {
                    // function
                    return 'function';
                }
                else if ($.isPlainObject(value)) {
                    // object value
                    // return new ObjectDataView(memberName, value);
                    return 'object';
                }
                else if (typeof(value) == "number") {
                    // numeric value
                    // return new SimpleDataView(memberName, <number>value, 'data-value-number');
                    return 'number';
                }
                else if (typeof (value) == "string") {
                    // string value
                    // return new SimpleDataView(memberName, <string>value, 'data-value-string');
                    return 'string';
                }
                else if (typeof (value) == "boolean") {
                    // boolean value
                    // return new BooleanDataView(memberName, <boolean>value);
                    return 'boolean';
                }
            }

            return undefined;
        }
    }
}

net.ndrei.json.dataViewFactoryRegistry['json'] = () => new net.ndrei.json.dataviewfactories.JsonDataFactory();