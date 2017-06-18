/// <reference path="../dist/jsonview.d.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var extra;
            (function (extra) {
                var LOG = new json.logging.Log('array chart view');
                var ChartJSArrayView = (function () {
                    function ChartJSArrayView(info, layoutKey) {
                        if (layoutKey === void 0) { layoutKey = "titled"; }
                        this.info = info;
                        this.layoutKey = layoutKey;
                        this.chart = null;
                    }
                    ChartJSArrayView.prototype.render = function (context, layout) {
                        layout.renderDefaultLabel(this.info.label);
                        var container = layout.getValueContainer();
                        var value = context.getValue(this.info.dataPath);
                        if (!value || !value.length) {
                            // assume null or not array
                            value = [];
                        }
                        var barChartData = {
                            labels: value.map(function (v, i) { return String(i); }),
                            datasets: [{
                                    label: 'DATA',
                                    data: value
                                }]
                        };
                        var canvas = $('<canvas />');
                        canvas.attr({
                            width: canvas.width((this.info.data && this.info.data.width) ? Number(this.info.data.width) : 125).width(),
                            height: canvas.height((this.info.data && this.info.data.height) ? Number(this.info.data.height) : 100).height()
                        }).css({
                            "padding-left": '15px'
                        });
                        container.append(canvas);
                        LOG.debug("creating chart: " + canvas.width() + " x " + canvas.height());
                        this.chart = new Chart(canvas, {
                            type: 'bar',
                            data: barChartData,
                            width: canvas.width(),
                            height: canvas.height(),
                            options: {
                                responsive: false,
                                legend: {
                                    display: false
                                },
                                scales: {
                                    yAxes: [{
                                            display: false
                                        }]
                                },
                                title: {
                                    display: false
                                }
                            }
                        });
                        LOG.debug("chart created: " + canvas.width() + " x " + canvas.height());
                    };
                    return ChartJSArrayView;
                }());
                extra.ChartJSArrayView = ChartJSArrayView;
            })(extra = json.extra || (json.extra = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataViewRegistry["array-chart"] = function (di) { return new net.ndrei.json.extra.ChartJSArrayView(di); };
/// <reference path="../dist/jsonview.d.ts" />
var net;
(function (net) {
    var ndrei;
    (function (ndrei) {
        var json;
        (function (json) {
            var extra;
            (function (extra) {
                var LOG = new json.logging.Log('array chart view');
                var ChartJSDataFilter = (function () {
                    function ChartJSDataFilter() {
                    }
                    ChartJSDataFilter.prototype.canBeUsed = function (entity, member) {
                        return member != '_chartjs';
                    };
                    return ChartJSDataFilter;
                }());
                extra.ChartJSDataFilter = ChartJSDataFilter;
            })(extra = json.extra || (json.extra = {}));
        })(json = ndrei.json || (ndrei.json = {}));
    })(ndrei = net.ndrei || (net.ndrei = {}));
})(net || (net = {}));
net.ndrei.json.dataFilterRegistry["chartJS"] = function () { return new net.ndrei.json.extra.ChartJSDataFilter(); };

//# sourceMappingURL=jsonview.extra.js.map
