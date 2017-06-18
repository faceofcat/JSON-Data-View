/// <reference path="../dist/jsonview.d.ts" />
declare class Chart {
    constructor(...args: any[]);
}

namespace net.ndrei.json.extra {
    const LOG = new logging.Log('array chart view');

    export class ChartJSArrayView implements DataView {
        private chart: Chart = null;

        constructor(private info: DataInfo, public layoutKey: string = "titled") {
        }

        render(context: JsonContext, layout: DataLayout): void {
            layout.renderDefaultLabel(this.info.label);

            const container = layout.getValueContainer();
            let value = <any[]>context.getValue(this.info.dataPath);
            if (!value || !value.length) {
                // assume null or not array
                value = [];
            }

            const barChartData = {
                labels: value.map((v, i) => String(i)),
                datasets: [{
                    label: 'DATA',
                    data: value
                }]
            };

            const canvas = $('<canvas />');
            canvas.attr({
                width: canvas.width((this.info.data && this.info.data.width) ? Number(this.info.data.width) : 125).width(),
                height: canvas.height((this.info.data && this.info.data.height) ? Number(this.info.data.height) : 100).height()
            }).css({
                "padding-left": '15px'
            });
            container.append(canvas);
            
            LOG.debug(`creating chart: ${canvas.width()} x ${canvas.height()}`);

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

            LOG.debug(`chart created: ${canvas.width()} x ${canvas.height()}`);
        }
    }
}

net.ndrei.json.dataViewRegistry["array-chart"] = (di) => new net.ndrei.json.extra.ChartJSArrayView(di);
