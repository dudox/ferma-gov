    var t = document.getElementById("percentage_reports");
    console.log()
    if (t) {

        var e = {
            series: [Math.round(t.dataset.value)],
            chart: {
                height: 200,
                type: "radialBar",
                offsetY: 0
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    hollow: {
                        margin: 0,
                        size: "70%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: !0,
                            fontSize: "10px",
                            fontWeight: "400",
                            offsetY: -5,
                            //color: KTApp.getSettings().colors.gray["gray-300"]
                        },
                        value: {
                            //color: KTApp.getSettings().colors.theme.inverse.primary,
                            fontSize: "22px",
                            fontWeight: "bold",
                            offsetY: -40,
                            show: !0
                        }
                    },
                    track: {
                        //background: KTUtil.colorLighten(KTApp.getSettings().colors.theme.base.primary, 7),
                        strokeWidth: "100%"
                    }
                }
            },
            //colors: [KTApp.getSettings().colors.theme.inverse.primary],
            stroke: {
                lineCap: "round"
            },
            labels: ["Reports"]
        };
        new ApexCharts(t, e).render()
    }

    // General Percentile
    var t = document.getElementById("percentage_reports_total");
    if (t) {
        var o = {
            series: [Math.round(t.dataset.value)],
            chart: {
                height: 180,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: 1,
                            fontWeight: "700"
                        },
                        value: {
                            //color: KTApp.getSettings().colors.gray["gray-700"],
                            fontSize: "13px",
                            fontWeight: "700",
                            offsetY: 12,
                            show: !0
                        }
                    },
                    track: {
                       // background: KTApp.getSettings().colors.theme.light.success,
                        strokeWidth: "100%"
                    }
                }
            },
            //colors: [KTApp.getSettings().colors.theme.base.success],
            stroke: {
                lineCap: "round"
            },
            labels: ["Reports"]
        };
        new ApexCharts(t, o).render()


        var e = {
            series: [{
                name: "series1",
                data: [31, 40, 28, 51, 42, 109, 100]
            }, {
                name: "series2",
                data: [11, 32, 45, 32, 34, 52, 41]
            }],
            chart: {
                height: 350,
                type: "area"
            },
            dataLabels: {
                enabled: !1
            },
            stroke: {
                curve: "smooth"
            },
            xaxis: {
                type: "datetime",
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm"
                }
            },
            //colors: [primary, success]
        };
        new ApexCharts(document.querySelector("#road_status_chart"), e).render()
    }
