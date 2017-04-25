/// <reference path="propertyview.ts" /> 
/// <reference path="property-boolean.ts" /> 
/// <reference path="property-numeric.ts" /> 
/// <reference path="property-string.ts" /> 
/// <reference path="property-object.ts" /> 

namespace net.ndrei.json {
    import PropertyObject = net.ndrei.json.properties.PropertyObject;
    import PropertyBoolean = net.ndrei.json.properties.PropertyBoolean;
    import PropertyString = net.ndrei.json.properties.PropertyString;
    import PropertyNumeric = net.ndrei.json.properties.PropertyNumeric;

    export class PropertiesFactory {
        static createProperty(label: string, value: any): PropertyView {
            if ($.isNumeric(value)) {
                // numeric value
                return new PropertyNumeric(label, <number>value);
            }
            else if ($.isArray(value)) {
                // array value
            }
            else if ($.isPlainObject(value)) {
                // object value
                return new PropertyObject(label, value);
            }
            else if (typeof(value) == "string") {
                // string value
                return new PropertyString(label, <string>value);
            }
            else if (typeof(value) == "boolean") {
                // boolean value
                return new PropertyBoolean(label, <boolean>value);
            }

            return undefined;
        }
    }
}