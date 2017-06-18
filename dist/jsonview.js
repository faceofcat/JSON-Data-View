var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            json.dataLayoutRegistry = {};
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="datalayout.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            json.dataCategoryLayoutRegistry = {};
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            json.dataFilterRegistry = {};
            var DataFilter = (function () {
                function DataFilter() {
                }
                return DataFilter;
            }());
            json.DataFilter = DataFilter;
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            json.dataViewFactoryRegistry = {};
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            /**
             * Base class for DataInfo (property) and EntityInfo (object).
             */
            var NodeInfo = (function () {
                function NodeInfo(dataPath) {
                    this.dataPath = dataPath;
                    this._label = undefined;
                    /**
                     * the category path where to render the node
                     * (ignored for root EntityInfo)
                     */
                    this.category = undefined;
                    /**
                     * number used to sort nodes in the same category
                     */
                    this.index = undefined;
                    /**
                     * key to be used for retrieving the view from the view repository
                     * (DataInfo will look in dataViewRegistry and Entityinfo will look in entityViewRegistry)
                     */
                    this.viewKey = undefined;
                    /**
                     * layout used to render the view
                     * (DataInfo will look in dataLayoutRegistry and EntityInfo will look in entityLayoutRegistry)
                     */
                    this.layoutKey = undefined;
                    /**
                     * Parent entity
                     * (null for root entity info)
                     */
                    this.parent = undefined;
                    /**
                     * Extra configuration data that should come from metadata miners
                     */
                    this.data = undefined;
                }
                Object.defineProperty(NodeInfo.prototype, "label", {
                    /**
                     * the label to display next to this node
                     * (ignored for root EntityInfo)
                     */
                    get: function () {
                        return this._label || (this.dataPath ? this.dataPath.substr(this.dataPath.lastIndexOf('.') + 1) : '');
                    },
                    set: function (value) {
                        this._label = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                NodeInfo.prototype.apply = function (metadata) {
                    if (metadata) {
                        if (metadata.label) {
                            this.label = metadata.label;
                        }
                        if (metadata.category) {
                            this.category = metadata.category;
                        }
                        if (metadata.index) {
                            this.index = metadata.index;
                        }
                        if (metadata.data) {
                            this.data = metadata.data;
                        }
                        if (metadata.viewKey) {
                            this.viewKey = metadata.viewKey;
                        }
                        if (metadata.layoutKey) {
                            this.layoutKey = metadata.layoutKey;
                        }
                    }
                    return this;
                };
                NodeInfo.prototype.toJSON = function () {
                    return {
                        dataPath: this.dataPath,
                        category: (this.category && this.category.length) ? this.category.join(' / ') : undefined,
                        index: this.index,
                        label: this._label,
                        view: (this.viewKey || '\{default view\}') + " [" + (this.layoutKey || '\{default layout\}') + "]",
                        data: this.data
                    };
                };
                return NodeInfo;
            }());
            json.NodeInfo = NodeInfo;
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="nodeinfo.ts" />
/// <reference path="datainfo.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var EntityInfo = (function (_super) {
                __extends(EntityInfo, _super);
                function EntityInfo(context /* , original: DataInfo */) {
                    var _this = _super.call(this, context.dataPath) || this;
                    _this.context = context; /* , original: DataInfo */
                    _this._data = [];
                    context.applyTo(_this);
                    return _this;
                }
                Object.defineProperty(EntityInfo.prototype, "children", {
                    get: function () {
                        // TODO: find a way to 'protect' this
                        return this._data.map(function (d) { return d; });
                    },
                    enumerable: true,
                    configurable: true
                });
                EntityInfo.prototype.addChild = function (data) {
                    this._data.push(data);
                    data.parent = this;
                    return this;
                };
                // view: EntityView = undefined;
                EntityInfo.prototype.toJSON = function () {
                    return $.extend(_super.prototype.toJSON.call(this), {
                        data: this.children
                    });
                };
                return EntityInfo;
            }(json.NodeInfo));
            json.EntityInfo = EntityInfo;
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityinfo.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            json.entityMinerRegistry = {};
            var EntityMiner = (function () {
                function EntityMiner() {
                }
                return EntityMiner;
            }());
            json.EntityMiner = EntityMiner;
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="entityinfo.ts" />
/// <reference path="jsoncontext.ts" />
/// <reference path="datacategorylayout.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            json.entityInfoProviderRegistry = {};
            var EntityInfoProvider = (function () {
                function EntityInfoProvider() {
                }
                return EntityInfoProvider;
            }());
            json.EntityInfoProvider = EntityInfoProvider;
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="nodeinfo.ts" />
/// <reference path="jsoncontext.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            json.dataInfoProviderRegistry = {};
            var DataInfoProvider = (function () {
                function DataInfoProvider() {
                }
                return DataInfoProvider;
            }());
            json.DataInfoProvider = DataInfoProvider;
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityminer.ts" />
/// <reference path="entityinfoprovider.ts" />
/// <reference path="datainfoprovider.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var EntityContext = (function () {
                function EntityContext(_dataPath, _entityInfoProviders, _dataFilters, _dataInfoProviders, _dataViewFactories, _miner, _parent) {
                    if (_parent === void 0) { _parent = undefined; }
                    this._dataPath = _dataPath;
                    this._entityInfoProviders = _entityInfoProviders;
                    this._dataFilters = _dataFilters;
                    this._dataInfoProviders = _dataInfoProviders;
                    this._dataViewFactories = _dataViewFactories;
                    this._miner = _miner;
                    this._parent = _parent;
                }
                EntityContext.prototype.getJsonContext = function () {
                    return this._parent ? this._parent.getJsonContext() : undefined;
                };
                EntityContext.prototype.getValue = function (path) {
                    if (path === void 0) { path = undefined; }
                    var context = this.getJsonContext();
                    if (context) {
                        return context.getValue(this.fullDataPath + ((path && path.length) ? ('.' + path) : ''));
                    }
                    return undefined;
                };
                Object.defineProperty(EntityContext.prototype, "dataPath", {
                    get: function () {
                        return this._dataPath;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityContext.prototype, "fullDataPath", {
                    get: function () {
                        var parentPath = this._parent ? this._parent.fullDataPath : undefined;
                        return (parentPath && parentPath.length) ? (parentPath + '.' + this._dataPath) : this._dataPath;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityContext.prototype, "entityInfoProviders", {
                    get: function () {
                        return this._entityInfoProviders || (this._parent ? this._parent.entityInfoProviders : undefined);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityContext.prototype, "dataFilters", {
                    get: function () {
                        return this._dataFilters || (this._parent ? this._parent.dataFilters : undefined);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityContext.prototype, "dataInfoProviders", {
                    get: function () {
                        return this._dataInfoProviders || (this._parent ? this._parent.dataInfoProviders : undefined);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityContext.prototype, "dataViewFactories", {
                    get: function () {
                        return this._dataViewFactories || (this._parent ? this._parent.dataViewFactories : undefined);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityContext.prototype, "miner", {
                    get: function () {
                        return this._miner || (this._parent ? this._parent.miner : undefined);
                    },
                    enumerable: true,
                    configurable: true
                });
                EntityContext.prototype.toJSON = function () {
                    return {
                        entityInfoProviders: this._entityInfoProviders,
                        dataFilters: this._dataFilters,
                        dataInfoProviders: this._dataInfoProviders,
                        dataViewFactories: this._dataViewFactories,
                        miner: this._miner
                    };
                };
                EntityContext.prototype.createChildContext = function (dataPath, config) {
                    config = config || {};
                    return new EntityContext(dataPath, config.entityInfoProviders || this._entityInfoProviders, config.dataFilters || this._dataFilters, config.dataInfoProviders || this._dataInfoProviders, config.dataViewFactories || this._dataViewFactories, config.miner || this._miner, this);
                };
                EntityContext.prototype.applyTo = function (entity) {
                    var miner = this.miner;
                    if (miner) {
                        miner.digIntoEntity(entity);
                    }
                };
                return EntityContext;
            }());
            json.EntityContext = EntityContext;
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entitycontext.ts" />
/// <reference path="entityminer.ts" />
/// <reference path="entityinfoprovider.ts" />
/// <reference path="datainfoprovider.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var JsonContext = (function (_super) {
                __extends(JsonContext, _super);
                function JsonContext(entityInfoProviders, dataFilters, dataInfoProviders, dataViewFactories, miner, defaultDataLayoutKey, defaultCategoryLayoutKey, 
                    // public readonly entityViewBuilder: (entity: EntityInfo) => EntityView,
                    container, entity, entityLayoutKey) {
                    if (defaultDataLayoutKey === void 0) { defaultDataLayoutKey = 'labeled'; }
                    if (defaultCategoryLayoutKey === void 0) { defaultCategoryLayoutKey = 'list'; }
                    if (entityLayoutKey === void 0) { entityLayoutKey = 'list'; }
                    var _this = _super.call(this, undefined, entityInfoProviders, dataFilters, dataInfoProviders, dataViewFactories, miner) || this;
                    _this.defaultDataLayoutKey = defaultDataLayoutKey;
                    _this.defaultCategoryLayoutKey = defaultCategoryLayoutKey;
                    _this.container = container;
                    _this.entity = entity;
                    _this.entityLayoutKey = entityLayoutKey;
                    _this._entityInfo = undefined;
                    // TODO: add EntityPreProcessor interface to handle this
                    // test for 'toJSON' method
                    if ($.isFunction(entity.toJSON)) {
                        _this.entity = entity.toJSON() || entity;
                    }
                    return _this;
                }
                JsonContext.prototype.getJsonContext = function () {
                    return this;
                };
                Object.defineProperty(JsonContext.prototype, "rootEntityInfo", {
                    get: function () {
                        if (!this._entityInfo) {
                            this._entityInfo = new json.EntityInfo(this);
                        }
                        return this._entityInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                JsonContext.prototype.getValue = function (dataPath, overrideLastPart) {
                    if (overrideLastPart === void 0) { overrideLastPart = undefined; }
                    var result = this.entity;
                    (dataPath || '').split('.').every(function (p, i, a) {
                        if (overrideLastPart && (i == (a.length - 1))) {
                            p = overrideLastPart;
                        }
                        if (p && p.length) {
                            result = result[p];
                            // TODO: add EntityPreProcessor interface to handle this
                            result && $.isFunction(result.toJSON) && (result = result.toJSON() || result);
                        }
                        return (result != undefined) && (result != null);
                    });
                    return result;
                };
                return JsonContext;
            }(json.EntityContext));
            json.JsonContext = JsonContext;
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="jsoncontext.ts" />
/// <reference path="entityinfo.ts" />
/// <reference path="nodeinfo.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            /**
             * Interface used to describe a property
             */
            var DataInfo = (function (_super) {
                __extends(DataInfo, _super);
                function DataInfo(dataPath) {
                    var _this = _super.call(this, dataPath) || this;
                    _this.view = undefined;
                    return _this;
                }
                DataInfo.prototype.getValue = function (context) {
                    return context ? context.getValue(this.dataPath) : undefined;
                };
                DataInfo.prototype.toJSON = function () {
                    return $.extend(_super.prototype.toJSON.call(this), {});
                };
                // todo: move this to an exported method in dataview.ts
                DataInfo.createView = function (info) {
                    // return (this.dataViewCreator ? this.dataViewCreator(this) : undefined);
                    var creator = (info && info.viewKey && json.dataViewRegistry) ? json.dataViewRegistry[info.viewKey] : undefined;
                    return creator ? creator(info) : undefined;
                };
                return DataInfo;
            }(json.NodeInfo));
            json.DataInfo = DataInfo;
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="datalayout.ts" />
/// <reference path="datainfo.ts" />
/// <reference path="jsoncontext.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            json.dataViewRegistry = {};
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var logging;
            (function (logging) {
                // TODO: make this an emum... maybe?
                logging.level = "debug";
                var levels = {
                    "debug": 0,
                    "info": 1,
                    "warn": 2,
                    "error": 3
                };
                function expandArgs(message, args) {
                    var result = {
                        message: message,
                        args: args
                    };
                    var indicesToRemove = [];
                    result.message = result.message.replace(/{(\d+)}/g, function (match, rawNumber) {
                        if (typeof rawNumber != "undefined") {
                            var number_1 = Number(rawNumber);
                            if (typeof result.args[number_1] != undefined) {
                                if (!indicesToRemove.some(function (x) { return x == number_1; })) {
                                    indicesToRemove.push(number_1);
                                }
                                return result.args[number_1];
                            }
                        }
                        ;
                        return match;
                    });
                    if (indicesToRemove.length > 0) {
                        result.args = result.args.filter(function (a, i) {
                            return indicesToRemove.every(function (x) { return x != i; });
                        });
                    }
                    return result;
                }
                function outputMessage(level, cb, message) {
                    var args = [];
                    for (var _i = 3; _i < arguments.length; _i++) {
                        args[_i - 3] = arguments[_i];
                    }
                    if ((level >= (levels[logging.level])) && cb && message) {
                        var finalMessage = expandArgs(message, args);
                        cb.apply(void 0, [finalMessage.message].concat((finalMessage.args || [])));
                        return true;
                    }
                    return false;
                }
                function isDebugLevel() {
                    return logging.level == "debug";
                }
                var Log = (function () {
                    function Log(category, prefixPattern) {
                        if (prefixPattern === void 0) { prefixPattern = "[{0}]: "; }
                        this.category = category;
                        this.prefix = expandArgs(prefixPattern, [category]).message;
                    }
                    Log.prototype.debug = function (message) {
                        var args = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            args[_i - 1] = arguments[_i];
                        }
                        return (console && console.debug)
                            ? outputMessage.apply(void 0, [levels["debug"], console.debug, this.prefix + (message || '')].concat(args)) : false;
                    };
                    Log.prototype.info = function (message) {
                        var args = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            args[_i - 1] = arguments[_i];
                        }
                        return (console && console.info)
                            ? outputMessage.apply(void 0, [levels["info"], console.info, this.prefix + (message || '')].concat(args)) : false;
                    };
                    Log.prototype.warn = function (message) {
                        var args = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            args[_i - 1] = arguments[_i];
                        }
                        return (console && console.warn)
                            ? outputMessage.apply(void 0, [levels["message"], console.warn, this.prefix + (message || '')].concat(args)) : false;
                    };
                    Log.prototype.error = function (message) {
                        var args = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            args[_i - 1] = arguments[_i];
                        }
                        return (console && console.error)
                            ? outputMessage.apply(void 0, [levels["error"], console.error, this.prefix + (message || '')].concat(args)) : false;
                    };
                    Log.prototype.enterSection = function (sectioName) {
                        Log.enterSection(sectioName, this);
                    };
                    Log.enterSection = function (sectionName, log) {
                        if (console && console.group) {
                            Log.sections.push(sectionName);
                            console.group(sectionName);
                            if (console.time) {
                                console.time(sectionName);
                            }
                        }
                        else if (log) {
                            log.debug("'console.group' not defined.");
                        }
                    };
                    Log.prototype.leaveSection = function (sectionName) {
                        if (sectionName === void 0) { sectionName = undefined; }
                        Log.leaveSection(sectionName, this);
                    };
                    Log.leaveSection = function (sectionName, log) {
                        if (sectionName === void 0) { sectionName = undefined; }
                        if (console && console.groupEnd) {
                            var topSection = undefined;
                            do {
                                if (Log.sections.length == 0) {
                                    if (log) {
                                        log.debug("Logging section '{0}' not found.", sectionName);
                                    }
                                    return;
                                }
                                topSection = Log.sections.pop();
                                sectionName = sectionName || topSection;
                            } while (sectionName != topSection);
                            if (console.timeEnd) {
                                console.timeEnd(sectionName);
                            }
                            console.groupEnd();
                        }
                        else if (log) {
                            log.debug("'console.groupEnd' not defined.");
                        }
                    };
                    return Log;
                }());
                Log.sections = [];
                logging.Log = Log;
            })(logging = json.logging || (json.logging = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="nodeinfo.ts" />
/// <reference path="logger.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var viewtree;
            (function (viewtree) {
                var LOG = new json.logging.Log('view tree');
                var ViewNode = (function () {
                    function ViewNode() {
                    }
                    Object.defineProperty(ViewNode.prototype, "parent", {
                        get: function () { return this._parent; },
                        set: function (value) { this._parent = value; },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(ViewNode.prototype, "path", {
                        get: function () {
                            return "" + ((this.parent) ? this.parent.path + "." : '') + this.getLabel();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ViewNode.prototype.toJSON = function () {
                        return { label: this.getLabel() };
                    };
                    return ViewNode;
                }());
                var ViewNodeLeaf = (function (_super) {
                    __extends(ViewNodeLeaf, _super);
                    function ViewNodeLeaf(dataInfo) {
                        var _this = _super.call(this) || this;
                        _this.dataInfo = dataInfo;
                        return _this;
                    }
                    ViewNodeLeaf.prototype.getLabel = function () { return this.dataInfo.label; };
                    ViewNodeLeaf.prototype.getLayoutKey = function () { return this.dataInfo.layoutKey; };
                    ViewNodeLeaf.prototype.getViewKey = function () { return this.dataInfo.viewKey; };
                    ViewNodeLeaf.prototype.getSortIndex = function () { return this.dataInfo.index; };
                    ViewNodeLeaf.prototype.toJSON = function () {
                        return $.extend(_super.prototype.toJSON.call(this), { leafDataPath: this.dataInfo.dataPath });
                    };
                    ViewNodeLeaf.prototype.render = function (context) {
                        var view = json.DataInfo.createView(this.dataInfo);
                        if (!view) {
                            LOG.warn("Could not create view for node: '" + this.path + "'.");
                            return;
                        }
                        var layoutKey = this.getLayoutKey() || view.layoutKey || context.defaultDataLayoutKey || 'labeled';
                        var layoutBuilder = json.dataLayoutRegistry[layoutKey];
                        if (!layoutBuilder) {
                            LOG.warn("Could not find layout: '" + layoutKey + "' for node: '" + this.path + "'.");
                            return;
                        }
                        var layout = layoutBuilder();
                        this.parent.initializeChildLayout(layout);
                        view.render(context, layout);
                    };
                    return ViewNodeLeaf;
                }(ViewNode));
                var ViewNodeGroup = (function (_super) {
                    __extends(ViewNodeGroup, _super);
                    function ViewNodeGroup(label) {
                        var _this = _super.call(this) || this;
                        _this.label = label;
                        _this._sortIndex = 0;
                        _this.layoutData = undefined;
                        _this.layout = undefined;
                        _this.children = [];
                        return _this;
                    }
                    ViewNodeGroup.prototype.getLabel = function () { return this.label; };
                    ViewNodeGroup.prototype.getLayoutKey = function () { return this.layoutKey; };
                    ViewNodeGroup.prototype.getViewKey = function () { return this.viewKey; };
                    ViewNodeGroup.prototype.getSortIndex = function () { return this.sortIndex; };
                    Object.defineProperty(ViewNodeGroup.prototype, "layoutKey", {
                        get: function () { return this._layoutKey; },
                        set: function (value) { this._layoutKey = value; },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(ViewNodeGroup.prototype, "viewKey", {
                        get: function () { return this._viewKey; },
                        set: function (value) { this._viewKey = value; },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(ViewNodeGroup.prototype, "sortIndex", {
                        get: function () { return this._sortIndex; },
                        set: function (value) { this._sortIndex = value; },
                        enumerable: true,
                        configurable: true
                    });
                    ViewNodeGroup.prototype.toJSON = function () {
                        var result = _super.prototype.toJSON.call(this);
                        this.layoutKey && (this.layoutKey != 'default') && $.extend(result, { layoutKey: this.layoutKey });
                        return $.extend(result, { children: this.children });
                    };
                    ViewNodeGroup.prototype.updateFromMetadata = function (meta) {
                        meta && (typeof meta == 'string') && (meta = { layoutKey: meta });
                        meta.layoutKey && meta.layoutKey.length && (this.layoutKey = meta.layoutKey);
                        meta.layoutData && (this.layoutData = meta.layoutData);
                    };
                    ViewNodeGroup.prototype.render = function (context) {
                        if (this.layout) {
                            LOG.warn("Category '" + this.path + "' already rendered.");
                            return;
                        }
                        var layoutKey = this.layoutKey || context.defaultCategoryLayoutKey || 'default';
                        var layoutBuilder = net.ndrei.json.dataCategoryLayoutRegistry[layoutKey];
                        if (!layoutBuilder) {
                            LOG.warn("Could not find layout: '" + layoutKey + "' for node: '" + this.path + "'.");
                            return;
                        }
                        this.layout = layoutBuilder(this.getLabel());
                        if (!this.parent) {
                            // root node
                            this.layout.initialize(context.container);
                        }
                        else {
                            // child category
                            this.parent.initializeChildLayout(this.layout);
                        }
                        this.children
                            .sort(function (a, b) {
                            var ai = a.getSortIndex(), bi = b.getSortIndex();
                            return (ai == bi) ? a.getLabel().localeCompare(b.getLabel()) : (ai - bi);
                        })
                            .forEach(function (c) { return c.render(context); });
                    };
                    ViewNodeGroup.prototype.initializeChildLayout = function (childLayout) {
                        if (!this.layout) {
                            LOG.warn("Category '" + this.path + "' has not been rendered yet.");
                            return undefined;
                        }
                        this.layout.addData(childLayout);
                    };
                    return ViewNodeGroup;
                }(ViewNode));
                var ViewTree = (function () {
                    function ViewTree(context) {
                        this.context = context;
                        this.tree = {};
                        this.root = undefined;
                        this.tree[''] = this.root = new ViewNodeGroup(undefined);
                        this.addInfo(context.rootEntityInfo);
                    }
                    ViewTree.prototype.addInfo = function (info) {
                        if ((info instanceof json.EntityInfo) && !info.dataPath) {
                            // root entity
                            this.processEntity(info);
                            return;
                        }
                        var category = this.getCategory(info);
                        var path = category.join('.');
                        var group = undefined;
                        if (this.tree[path] && !(this.tree[path] instanceof ViewNodeGroup)) {
                            var ex = "Path '" + path + "' is not a valid category.";
                            LOG.error(ex);
                            throw ex;
                        }
                        else if (this.tree[path]) {
                            group = this.tree[path];
                        }
                        else {
                            group = this.ensureGroup(path);
                        }
                        if (info instanceof json.DataInfo) {
                            // add leaf
                            var leaf = new ViewNodeLeaf(info);
                            leaf.parent = group;
                            group.children.push(leaf);
                        }
                        else if (info instanceof json.EntityInfo) {
                            // add "something"
                            this.processEntity(info);
                        }
                        return;
                    };
                    ViewTree.prototype.processEntity = function (info) {
                        var _this = this;
                        // add children
                        info.children && info.children.length && info.children.forEach(function (c) {
                            _this.addInfo(c);
                        });
                        // setup entity category information
                        var entityCategory = this.tree[(!info.dataPath || !info.dataPath.length)
                            ? ''
                            : this.getCategory(info).concat([info.label]).join('.')];
                        entityCategory && (entityCategory instanceof ViewNodeGroup) && entityCategory.updateFromMetadata(info);
                        // setup category information
                        if (info.categoriesInfo) {
                            var entityPath = undefined;
                            for (var key in info.categoriesInfo) {
                                var path = key;
                                if (path && (path.length >= 2) && (path[0] == '_') && (path[1] == '.')) {
                                    !entityPath && (entityPath = this.getCategory(info).concat((info.label && info.label.length ? [info.label] : [])).join('.'));
                                    path = entityPath + path.substring(1);
                                }
                                var category = this.tree[path];
                                category && (category instanceof ViewNodeGroup)
                                    ? category.updateFromMetadata(info.categoriesInfo[key])
                                    : LOG.warn("Category '" + path + "' not found or invalid.");
                            }
                        }
                    };
                    ViewTree.prototype.getCategory = function (info) {
                        if (!info || !info.dataPath) {
                            // assume root entity info
                            return [];
                        }
                        var category = info.category;
                        if (!category || !category.length) {
                            category = ("_." + info.dataPath).split('.');
                            category = category.slice(0, category.length - 1); // (category.length >= 2) ? category.slice(0, category.length - 1) : [];
                        }
                        (!category || !category.length || (category && category.length && (category[0] != '_'))) && (category = this.getCategory(info.parent).concat((info.parent.label && info.parent.label.length ? [info.parent.label] : []), category))
                            || category && category.length && (category[0] == '_') && (category = category.slice(1));
                        return category;
                    };
                    ViewTree.prototype.ensureGroup = function (path) {
                        if (this.tree[path] instanceof ViewNodeGroup) {
                            return this.tree[path];
                        }
                        if (this.tree[path]) {
                            var ex = "Path '" + path + "' is not a valid category.";
                            LOG.error(ex);
                            throw ex;
                        }
                        var lastIndex = path.lastIndexOf('.');
                        var parent = (lastIndex >= 0) ? this.ensureGroup(path.substr(0, lastIndex)) : this.root;
                        var group = new ViewNodeGroup(path.substring(lastIndex + 1));
                        group.parent = parent;
                        parent.children.push(group);
                        this.tree[path] = group;
                        return group;
                    };
                    ViewTree.prototype.render = function () {
                        this.context.container.addClass('jsonview-root');
                        this.root.render(this.context);
                    };
                    return ViewTree;
                }());
                viewtree.ViewTree = ViewTree;
            })(viewtree = json.viewtree || (json.viewtree = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="datafilter.ts" />
/// <reference path="dataviewfactory.ts" />
/// <reference path="entityminer.ts" />
/// <reference path="entityinfoprovider.ts" />
/// <reference path="datainfoprovider.ts" />
/// <reference path="viewtree.ts" />
/// <reference path="jsonviewconfig.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json_1) {
            var ViewTree = net.ndrei.json.viewtree.ViewTree;
            var JSONView = (function () {
                function JSONView(host, target, config) {
                    if (config === void 0) { config = {}; }
                    this.host = host;
                    this.target = target;
                    this.config = config;
                    this._context = undefined;
                    this._viewTree = undefined;
                    this.host.data({ _jsonView: this });
                    !this.config && (this.config = {});
                    this.initialLoad();
                }
                JSONView.create = function (host, json, config) {
                    if (config === void 0) { config = {}; }
                    return new JSONView(host, json, config);
                };
                JSONView.prototype.initialLoad = function () {
                    if (!this.target) {
                        return;
                    }
                    var entityInfoProviderKeys = this.config.entityInfoProviderKeys || ['json_metadata'];
                    var filterKeys = this.config.filterKeys || ['underscore'];
                    var dataInfoProviderKeys = this.config.dataInfoProviderKeys || ['json_metadata'];
                    var dataViewFactorykeys = this.config.dataViewFactorykeys || ['json'];
                    var entityMinerKey = this.config.entityMinerKey || 'json';
                    var categoryLayoutKey = this.config.categoryLayoutKey || 'list';
                    var entityInfoProviders = [];
                    if (json_1.entityInfoProviderRegistry) {
                        entityInfoProviderKeys.forEach(function (k) {
                            var f = json_1.entityInfoProviderRegistry[k];
                            if (f) {
                                entityInfoProviders.push(f);
                            }
                        });
                    }
                    var filters = [];
                    if (json_1.dataFilterRegistry) {
                        filterKeys.forEach(function (k) {
                            var f = json_1.dataFilterRegistry[k];
                            if (f) {
                                filters.push(f());
                            }
                        });
                    }
                    var dataInfoProviders = [];
                    if (json_1.dataInfoProviderRegistry) {
                        dataInfoProviderKeys.forEach(function (k) {
                            var f = json_1.dataInfoProviderRegistry[k];
                            if (f) {
                                dataInfoProviders.push(f);
                            }
                        });
                    }
                    var viewFactories = [];
                    if (json_1.dataViewFactoryRegistry) {
                        dataViewFactorykeys.forEach(function (k) {
                            var f = json_1.dataViewFactoryRegistry[k];
                            if (f) {
                                viewFactories.push(f());
                            }
                        });
                    }
                    var miner = json_1.entityMinerRegistry ? json_1.entityMinerRegistry[entityMinerKey] : undefined;
                    if (miner) {
                        this._context = new json_1.JsonContext(entityInfoProviders, filters, dataInfoProviders, viewFactories, miner, 'labeled', categoryLayoutKey, // 'json',
                        this.host, this.target);
                        this._viewTree = new ViewTree(this._context);
                        this._viewTree.render();
                    }
                };
                Object.defineProperty(JSONView.prototype, "context", {
                    get: function () {
                        return this._context;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(JSONView.prototype, "viewTree", {
                    get: function () {
                        return this._viewTree;
                    },
                    enumerable: true,
                    configurable: true
                });
                JSONView.prototype.valueChanged = function (path) {
                };
                return JSONView;
            }());
            json_1.JSONView = JSONView;
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
/// <reference path="../datacategorylayout.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var datacategorylayouts;
            (function (datacategorylayouts) {
                var CategoryJsonLayout = (function () {
                    function CategoryJsonLayout(label) {
                        this.label = label;
                    }
                    CategoryJsonLayout.prototype.initialize = function (container) {
                        var _this = this;
                        this.container = container;
                        this.container.addClass('category-json');
                        // start
                        var title = $('<div class="category-json-title" />');
                        var expander = $('<span class="category-toggler category-collapser">-</span>');
                        expander.click(function () { _this.toggleCollapseState(); });
                        title.append(expander);
                        if (this.label && this.label.length) {
                            title.append($("<span class=\"category-label category-json-label\">" + this.label + ": </span>"));
                        }
                        title.append($('<span class="category-content-marker">{</span>'));
                        this.container.append(title);
                        // content
                        this.ul = $('<ul class="category-list category-json" />');
                        this.ul.data({ layout: this });
                        this.container.append(this.ul);
                        // end
                        this.container.append(this.endTag = $('<div class="category-json-title category-json-endtag">}</div>'));
                        return this;
                    };
                    CategoryJsonLayout.prototype.toggleCollapseState = function () {
                        var marker = this.container.find('> div:first-child > .category-content-marker');
                        var toggler = this.container.find('> div:first-child > .category-toggler');
                        if (marker.hasClass('collapsed')) {
                            marker.removeClass('collapsed');
                            marker.text('{');
                            this.ul.show();
                            this.endTag.show();
                            toggler && (toggler.removeClass('category-expander'), toggler.addClass('category-collapser'), toggler.text('-'));
                        }
                        else {
                            marker.addClass('collapsed');
                            marker.html('{&nbsp;..&nbsp;}');
                            this.ul.hide();
                            this.endTag.hide();
                            toggler && (toggler.addClass('category-expander'), toggler.removeClass('category-collapser'), toggler.text('+'));
                        }
                    };
                    CategoryJsonLayout.prototype.addData = function (data) {
                        var li = $('<li />');
                        this.ul.append(li);
                        data.initialize(li);
                        li.data({ layout: data });
                        return this;
                    };
                    return CategoryJsonLayout;
                }());
                datacategorylayouts.CategoryJsonLayout = CategoryJsonLayout;
            })(datacategorylayouts = json.datacategorylayouts || (json.datacategorylayouts = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataCategoryLayoutRegistry['json'] = function (label) {
    return new net.ndrei.json.datacategorylayouts.CategoryJsonLayout(label);
};
/// <reference path="../datacategorylayout.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var datacategorylayouts;
            (function (datacategorylayouts) {
                var CategoryDataList = (function () {
                    function CategoryDataList(label) {
                        this.label = label;
                    }
                    CategoryDataList.prototype.initialize = function (container) {
                        this.container = container;
                        this.label && this.label.length && this.container.append($("<div class=\"category-label category-list-label\">" + this.label + "</div>"));
                        this.ul = $('<ul class="category-list" />');
                        this.ul.data({ layout: this });
                        this.container.append(this.ul);
                        return this;
                    };
                    CategoryDataList.prototype.addData = function (data) {
                        var li = $('<li />');
                        this.ul.append(li);
                        data.initialize(li);
                        li.data({ layout: data });
                        return this;
                    };
                    return CategoryDataList;
                }());
                datacategorylayouts.CategoryDataList = CategoryDataList;
            })(datacategorylayouts = json.datacategorylayouts || (json.datacategorylayouts = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataCategoryLayoutRegistry['list'] = function (label) {
    return new net.ndrei.json.datacategorylayouts.CategoryDataList(label);
};
/// <reference path="../datacategorylayout.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var datacategorylayouts;
            (function (datacategorylayouts) {
                var CategoryDataTable = (function () {
                    function CategoryDataTable(label) {
                        this.label = label;
                    }
                    CategoryDataTable.prototype.initialize = function (container) {
                        this.container = container;
                        this.label && this.label.length && this.container.append($("<div class=\"category-label category-table-label\">" + this.label + "</div>"));
                        this.table = $('<div class="category-table" />');
                        this.table.data({ layout: this });
                        this.container.append(this.table);
                        var header = $('<div class="category-table-row category-table-header"><span class="data-label">Property</span><span class="data-value">Value</span></div>');
                        this.table.append(header);
                        return this;
                    };
                    CategoryDataTable.prototype.addData = function (data) {
                        var tr = $('<div class="category-table-row" />');
                        this.table.append(tr);
                        data.initialize(tr);
                        tr.data({ layout: data });
                        return this;
                    };
                    return CategoryDataTable;
                }());
                datacategorylayouts.CategoryDataTable = CategoryDataTable;
            })(datacategorylayouts = json.datacategorylayouts || (json.datacategorylayouts = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataCategoryLayoutRegistry['table'] = function (label) {
    return new net.ndrei.json.datacategorylayouts.CategoryDataTable(label);
};
/// <reference path="../datafilter.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var datafilters;
            (function (datafilters) {
                var SimpleFilter = (function () {
                    function SimpleFilter(delegate) {
                        this.delegate = delegate;
                    }
                    SimpleFilter.prototype.canBeUsed = function (entity, member) {
                        return this.delegate && this.delegate(member);
                    };
                    return SimpleFilter;
                }());
                datafilters.SimpleFilter = SimpleFilter;
            })(datafilters = json.datafilters || (json.datafilters = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataFilterRegistry['underscore'] = function () { return new net.ndrei.json.datafilters.SimpleFilter(function (m) { return m && m.length && (m.charAt(0) != '_'); }); };
/// <reference path="../datainfoprovider.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var datainfoproviders;
            (function (datainfoproviders) {
                var JsonMetadataProvider = (function () {
                    function JsonMetadataProvider() {
                    }
                    JsonMetadataProvider.prototype.gatherInformation = function (context, dataPath) {
                        var entity = context.entity;
                        var raw = undefined;
                        var metadata = context.getValue(dataPath, '_metadata');
                        var memberName = (dataPath || '').substr((dataPath || '').lastIndexOf('.') + 1);
                        // step 1. look for {entity}._metadata.{member}
                        raw = metadata ? metadata[memberName] : undefined;
                        // step 2. look for {entity}._{member}Info
                        raw = $.extend({}, raw || {}, context.getValue(dataPath, "_" + memberName + "Info") || {});
                        var final = {};
                        if (raw) {
                            var metadata_1 = raw;
                            if (metadata_1.label) {
                                final.label = metadata_1.label;
                            }
                            if (metadata_1.category && $.isArray(metadata_1.category)) {
                                final.category = metadata_1.category;
                            }
                            else if (metadata_1.category && (typeof metadata_1.category == "string")) {
                                final.category = metadata_1.category.split('.');
                            }
                            if (metadata_1.index) {
                                final.index = metadata_1.index;
                            }
                            if (metadata_1.viewKey) {
                                final.viewKey = metadata_1.viewKey;
                            }
                            if (metadata_1.layoutKey) {
                                final.layoutKey = metadata_1.layoutKey;
                            }
                            if (metadata_1.data) {
                                final.data = metadata_1.data;
                            }
                        }
                        return final;
                    };
                    return JsonMetadataProvider;
                }());
                datainfoproviders.JsonMetadataProvider = JsonMetadataProvider;
            })(datainfoproviders = json.datainfoproviders || (json.datainfoproviders = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataInfoProviderRegistry['json_metadata'] = new net.ndrei.json.datainfoproviders.JsonMetadataProvider();
/// <reference path="../datalayout.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var datalayouts;
            (function (datalayouts) {
                var Labeled = (function () {
                    function Labeled() {
                        this.container = undefined;
                    }
                    Labeled.prototype.initialize = function (container) {
                        (this.container = container).append($("<span class=\"data-label\"></span><span class=\"data-value\"></span>"));
                        return this;
                    };
                    Labeled.prototype.renderDefaultLabel = function (label) {
                        this.getLabelContainer().text(label);
                        return this;
                    };
                    Labeled.prototype.getContainer = function () {
                        return this.container;
                    };
                    Labeled.prototype.getLabelContainer = function () {
                        return this.container.find('span.data-label');
                    };
                    Labeled.prototype.getValueContainer = function () {
                        return this.container.find('span.data-value');
                    };
                    return Labeled;
                }());
                datalayouts.Labeled = Labeled;
            })(datalayouts = json.datalayouts || (json.datalayouts = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataLayoutRegistry['labeled'] = function () { return new net.ndrei.json.datalayouts.Labeled(); };
/// <reference path="../datalayout.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var datalayouts;
            (function (datalayouts) {
                var Titled = (function () {
                    function Titled() {
                        this.container = undefined;
                    }
                    Titled.prototype.initialize = function (container) {
                        (this.container = container).append($("<span class=\"data-label\"></span><div class=\"data-value\"></div>"));
                        return this;
                    };
                    Titled.prototype.renderDefaultLabel = function (label) {
                        this.getLabelContainer().text(label);
                        return this;
                    };
                    Titled.prototype.getContainer = function () {
                        return this.container;
                    };
                    Titled.prototype.getLabelContainer = function () {
                        return this.container.find('span.data-label');
                    };
                    Titled.prototype.getValueContainer = function () {
                        return this.container.find('div.data-value');
                    };
                    return Titled;
                }());
                datalayouts.Titled = Titled;
            })(datalayouts = json.datalayouts || (json.datalayouts = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataLayoutRegistry['titled'] = function () { return new net.ndrei.json.datalayouts.Titled(); };
/// <reference path="../jsoncontext.ts" />
/// <reference path="../datainfo.ts" />
/// <reference path="../dataview.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var dataviews;
            (function (dataviews) {
                function formatString(pattern) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return (pattern && args) ? pattern.replace(/{(\d+)}/g, function (match, number) {
                        return typeof args[number] != 'undefined'
                            ? args[number]
                            : match;
                    }) : pattern;
                }
                var JsonDataView = (function () {
                    function JsonDataView(info, _template, _layoutKey) {
                        if (_template === void 0) { _template = '{0}'; }
                        if (_layoutKey === void 0) { _layoutKey = 'labeled'; }
                        this.info = info;
                        this._template = _template;
                        this._layoutKey = _layoutKey;
                    }
                    Object.defineProperty(JsonDataView.prototype, "layoutKey", {
                        get: function () { return this._layoutKey; },
                        enumerable: true,
                        configurable: true
                    });
                    JsonDataView.prototype.render = function (context, layout) {
                        layout.renderDefaultLabel(this.info.label);
                        layout.getValueContainer()
                            .addClass(this.getValueClass())
                            .text(formatString(this._template, this.getValueText(context)));
                    };
                    JsonDataView.prototype.getValueText = function (context) {
                        var value = this.info.getValue(context);
                        return ((value != null) && (value != undefined)) ? value.toString() : 'null';
                    };
                    return JsonDataView;
                }());
                dataviews.JsonDataView = JsonDataView;
                var SimpleDataView = (function (_super) {
                    __extends(SimpleDataView, _super);
                    function SimpleDataView(info, valueClass, template, layoutKey) {
                        if (template === void 0) { template = '{0}'; }
                        if (layoutKey === void 0) { layoutKey = 'labeled'; }
                        var _this = _super.call(this, info, template, layoutKey) || this;
                        _this.valueClass = valueClass;
                        return _this;
                    }
                    SimpleDataView.prototype.getValueClass = function () {
                        return this.valueClass;
                    };
                    return SimpleDataView;
                }(JsonDataView));
                dataviews.SimpleDataView = SimpleDataView;
            })(dataviews = json.dataviews || (json.dataviews = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataViewRegistry['number'] = function (info) { return new net.ndrei.json.dataviews.SimpleDataView(info, 'data-value-numeric', '{0}'); };
net.ndrei.json.dataViewRegistry['string'] = function (info) { return new net.ndrei.json.dataviews.SimpleDataView(info, 'data-value-string', '"{0}"'); };
/// <reference path="jsondataview.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var dataviews;
            (function (dataviews) {
                var BooleanDataView = (function (_super) {
                    __extends(BooleanDataView, _super);
                    function BooleanDataView(info) {
                        return _super.call(this, info, 'data-value-boolean') || this;
                    }
                    BooleanDataView.prototype.getValueText = function (context) {
                        return this.info.getValue(context) ? 'true' : 'false';
                    };
                    return BooleanDataView;
                }(dataviews.SimpleDataView));
                dataviews.BooleanDataView = BooleanDataView;
            })(dataviews = json.dataviews || (json.dataviews = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataViewRegistry['boolean'] = function (info) { return new net.ndrei.json.dataviews.BooleanDataView(info); };
/// <reference path="../jsoncontext.ts" />
/// <reference path="../datalayout.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var dataviews;
            (function (dataviews) {
                var ObjectDataView = (function () {
                    function ObjectDataView(info) {
                        this.info = info;
                    }
                    Object.defineProperty(ObjectDataView.prototype, "layoutKey", {
                        get: function () {
                            return 'titled';
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ObjectDataView.prototype.render = function (context, layout) {
                        // layout.getContainer().addClass('collapsable');
                        // layout.renderDefaultLabel(this.info.label);
                        // let value = this.info.children;
                        // if (value) {
                        //     context.renderEntity(layout.getValueContainer(), this.info.dataPath, this.info.children);
                        // }
                    };
                    return ObjectDataView;
                }());
                ObjectDataView.VIEW_KEY = 'object';
                dataviews.ObjectDataView = ObjectDataView;
            })(dataviews = json.dataviews || (json.dataviews = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
// net.ndrei.json.dataViewRegistry[net.ndrei.json.dataviews.ObjectDataView.VIEW_KEY] = info => new net.ndrei.json.dataviews.ObjectDataView(info); 
/// <reference path="../dataviewfactory.ts" />
/// <reference path="../data-views/jsondataview.ts" />
/// <reference path="../data-views/booleanview.ts" />
/// <reference path="../data-views/objectview.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var dataviewfactories;
            (function (dataviewfactories) {
                var JsonDataFactory = (function () {
                    function JsonDataFactory() {
                    }
                    JsonDataFactory.prototype.getViewKey = function (entity, memberName, member) {
                        if (!entity || !$.isPlainObject(entity) || !member) {
                            return undefined;
                        }
                        var value = member.get ? member.get() : member.value;
                        if ((value == null) || (value == undefined)) {
                            // return new SimpleDataView(memberName, undefined, 'data-value-null');
                            return 'null';
                        }
                        else {
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
                            else if (typeof (value) == "number") {
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
                    };
                    return JsonDataFactory;
                }());
                dataviewfactories.JsonDataFactory = JsonDataFactory;
            })(dataviewfactories = json.dataviewfactories || (json.dataviewfactories = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataViewFactoryRegistry['json'] = function () { return new net.ndrei.json.dataviewfactories.JsonDataFactory(); };
/// <reference path="../dataview.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var dataviews;
            (function (dataviews) {
                var ArrayTableDataView = (function () {
                    function ArrayTableDataView(info, layoutKey) {
                        if (layoutKey === void 0) { layoutKey = "titled"; }
                        this.info = info;
                        this.layoutKey = layoutKey;
                    }
                    ArrayTableDataView.prototype.render = function (context, layout) {
                        layout.renderDefaultLabel(this.info.label);
                        var value = context.getValue(this.info.dataPath);
                        if ($.isArray(value)) {
                            var arr = value;
                            var root = layout.getValueContainer();
                            var table = $('<table />');
                            root.append(table);
                            for (var i = 0; i < arr.length; i++) {
                                var tr = $('<tr />');
                                var td = $('<td />');
                                tr.append(td);
                                td.text(arr[i]);
                                table.append(tr);
                            }
                        }
                    };
                    return ArrayTableDataView;
                }());
                dataviews.ArrayTableDataView = ArrayTableDataView;
            })(dataviews = json.dataviews || (json.dataviews = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataViewRegistry['array-table'] = function (info) { return new net.ndrei.json.dataviews.ArrayTableDataView(info); };
/// <reference path="jsondataview.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var dataviews;
            (function (dataviews) {
                var FunctionDataView = (function (_super) {
                    __extends(FunctionDataView, _super);
                    function FunctionDataView(info) {
                        return _super.call(this, info, 'data-value-function', '<{0}>') || this;
                    }
                    FunctionDataView.prototype.getValueText = function () {
                        return 'function';
                    };
                    return FunctionDataView;
                }(dataviews.SimpleDataView));
                dataviews.FunctionDataView = FunctionDataView;
            })(dataviews = json.dataviews || (json.dataviews = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataViewRegistry['function'] = function (info) { return new net.ndrei.json.dataviews.FunctionDataView(info); };
/// <reference path="../entityinfoprovider.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var entityinfoproviders;
            (function (entityinfoproviders) {
                var JsonMetadataProvider = (function () {
                    function JsonMetadataProvider() {
                    }
                    JsonMetadataProvider.prototype.addInformation = function (info) {
                        var entity = info.context.getValue();
                        var raw = undefined;
                        // step 1. look for {entity}._metadata._info
                        entity && entity._metadata && entity._metadata._info && (raw = entity._metadata._info);
                        if (raw) {
                            var metadata = raw;
                            metadata.layoutKey && metadata.layoutKey.length && (info.layoutKey = metadata.layoutKey);
                            metadata.categoriesInfo && (info.categoriesInfo = metadata.categoriesInfo);
                            metadata.layoutData && (info.layoutData = metadata.layoutData);
                        }
                    };
                    return JsonMetadataProvider;
                }());
                entityinfoproviders.JsonMetadataProvider = JsonMetadataProvider;
            })(entityinfoproviders = json.entityinfoproviders || (json.entityinfoproviders = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.entityInfoProviderRegistry['json_metadata'] = new net.ndrei.json.entityinfoproviders.JsonMetadataProvider();
/// <reference path="../logger.ts" />
/// <reference path="../entityminer.ts" />
/// <reference path="../data-views/objectview.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var entityminers;
            (function (entityminers) {
                var Log = net.ndrei.json.logging.Log;
                var LOG = new Log("json entity miner");
                var JsonMiner = (function (_super) {
                    __extends(JsonMiner, _super);
                    function JsonMiner() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    JsonMiner.prototype.digIntoEntity = function (info) {
                        try {
                            LOG.enterSection('json entity miner');
                            LOG.info('path: "{0}"', info.dataPath, info);
                            if (info && info.context) {
                                if (info.context.entityInfoProviders) {
                                    info.context.entityInfoProviders.forEach(function (p) {
                                        p.addInformation(info);
                                    });
                                }
                                var entity = info.context.getValue();
                                this.gatherEntityData(info.context.getJsonContext(), info.dataPath, entity, function (d) { return info.addChild(d); });
                            }
                            return info;
                        }
                        finally {
                            LOG.leaveSection();
                        }
                    };
                    JsonMiner.prototype.gatherEntityData = function (context, parentPath, entity, callback) {
                        if (entity) {
                            Object.getOwnPropertyNames(entity).forEach(function (memberName) {
                                if (!context.dataFilters || !context.dataFilters.length || context.dataFilters.every(function (f) { return f.canBeUsed(entity, memberName); })) {
                                    var descriptor = Object.getOwnPropertyDescriptor(entity, memberName);
                                    var dataPath_1 = parentPath ? parentPath + "." + memberName : memberName;
                                    var metadata_2 = {};
                                    if (context.dataInfoProviders) {
                                        context.dataInfoProviders.forEach(function (p) {
                                            $.extend(metadata_2, p.gatherInformation(context, dataPath_1));
                                        });
                                    }
                                    if (!metadata_2.viewKey || !metadata_2.viewKey.length) {
                                        // find view key from factories
                                        var viewKey = undefined;
                                        for (var index in (context.dataViewFactories || [])) {
                                            var factory = context.dataViewFactories[index];
                                            viewKey = factory ? factory.getViewKey(entity, memberName, descriptor) : null;
                                            if (viewKey) {
                                                break;
                                            }
                                        }
                                        metadata_2.viewKey = viewKey;
                                    }
                                    if (metadata_2.viewKey && (!json.dataViewRegistry || !json.dataViewRegistry[metadata_2.viewKey])) {
                                        // unknown view key
                                        LOG.debug("Unknown data view key :'" + metadata_2.viewKey + "'.");
                                        metadata_2.viewKey = undefined;
                                    }
                                    if ((typeof descriptor.value == "object") && (!metadata_2.viewKey || !metadata_2.viewKey.length)) {
                                        // this is an object with no specific view set...
                                        // if (metadata.flattenHierarchy) {
                                        //     this.gatherEntityData(context, dataPath, descriptor.value, callback);
                                        // }
                                        // else {
                                        callback(new json.EntityInfo(context.createChildContext(dataPath_1)).apply(metadata_2));
                                        // }
                                    }
                                    else {
                                        var data = new json.DataInfo(dataPath_1).apply(metadata_2);
                                        callback(data);
                                    }
                                }
                            });
                        }
                    };
                    return JsonMiner;
                }(json.EntityMiner));
                entityminers.JsonMiner = JsonMiner;
            })(entityminers = json.entityminers || (json.entityminers = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.entityMinerRegistry['json'] = new net.ndrei.json.entityminers.JsonMiner();

//# sourceMappingURL=jsonview.js.map
