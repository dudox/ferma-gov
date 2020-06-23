            var t = document.getElementById("kt_mixed_widget_2_chart"),
                e = parseInt(KTUtil.css(t, "height"));
                let  u = $('#reports_chart').data('chart'); // object
                console.log(u);
            if (t) {
                var o = {
                    series: [{
                        name: "Reports",
                        data: u
                    }],
                    chart: {
                        type: "area",
                        height: e,
                        toolbar: {
                            show: !1
                        },
                        zoom: {
                            enabled: !1
                        },
                        sparkline: {
                            enabled: !0
                        },
                        dropShadow: {
                            enabled: !0,
                            enabledOnSeries: void 0,
                            top: 5,
                            left: 0,
                            blur: 3,
                            color: "#287ED7",
                            opacity: .5
                        }
                    },
                    plotOptions: {},
                    legend: {
                        show: 1
                    },
                    dataLabels: {
                        enabled: 1
                    },
                    fill: {
                        type: "solid",
                        opacity: 0
                    },
                    stroke: {
                        curve: "smooth",
                        show: !0,
                        width: 3,
                        colors: ["#287ED7"]
                    },
                    xaxis: {
                        categories: ["North Central", "North East", "North West", "South East", "South South", "South West"],
                        axisBorder: {
                            show: 1
                        },
                        axisTicks: {
                            show: 1
                        },
                        labels: {
                            show: 1,
                            style: {
                               // colors: KTApp.getSettings().colors.gray["gray-500"],
                                fontSize: "12px",
                                fontFamily: KTApp.getSettings()["font-family"]
                            }
                        },
                        crosshairs: {
                            show: 1,
                            position: "front",
                            stroke: {
                               // color: KTApp.getSettings().colors.gray["gray-300"],
                                width: 1,
                                dashArray: 3
                            }
                        },
                        tooltip: {
                            enabled: !0,
                            formatter: void 0,
                            offsetY: 0,
                            style: {
                                fontSize: "12px",
                                fontFamily: KTApp.getSettings()["font-family"]
                            }
                        }
                    },
                    yaxis: {
                        labels: {
                            show: 1,
                            style: {
                                //colors: KTApp.getSettings().colors.gray["gray-500"],
                                fontSize: "12px",
                                fontFamily: KTApp.getSettings()["font-family"]
                            }
                        }
                    },
                    states: {
                        normal: {
                            filter: {
                                type: "none",
                                value: 0
                            }
                        },
                        hover: {
                            filter: {
                                type: "none",
                                value: 0
                            }
                        },
                        active: {
                            allowMultipleDataPointsSelection: 1,
                            filter: {
                                type: "none",
                                value: 0
                            }
                        }
                    },
                    tooltip: {
                        style: {
                            fontSize: "12px",
                            fontFamily: KTApp.getSettings()["font-family"]
                        },
                        y: {
                            formatter: function(t) {
                                return t
                            }
                        },
                        marker: {
                            show: !1
                        }
                    },
                    colors: ["transparent"],
                    markers: {
                       // colors: [KTApp.getSettings().colors.theme.light.info],
                        strokeColor: ["#287ED7"],
                        strokeWidth: 3
                    }
                };
                new ApexCharts(t, o).render()
            }

            var t = document.getElementById("kt_mixed_widget_16_chart"),
                e = parseInt(KTUtil.css(t, "height"));
                let  v = $('[data-side="percentile"]').data('chart'); // object
                let data = [], arr =[];
                console.log(v)
                v.forEach(function(item){

                    data.push(Math.round(item[0],1))
                });
                console.log(data)
                if (t) {
                    var o = {
                        series: data,
                        chart: {
                            height: e,
                            type: "radialBar"
                        },
                        plotOptions: {
                            radialBar: {
                                hollow: {
                                    margin: 0,
                                    size: "30%"
                                },
                                dataLabels: {
                                    showOn: "always",
                                    name: {
                                        show: 1,
                                        fontWeight: "700"
                                    },
                                    value: {
                                        color: "#fff",
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        offsetY: 10,
                                        show: !0
                                    },
                                    total: {
                                        show: !1,
                                        label: "Total",
                                        fontWeight: "bold",
                                        formatter: function(t) {
                                            return data[0]+"%"
                                        }
                                    }
                                },
                                track: {
                                    background:"#fff",
                                    strokeWidth: "100%"
                                }
                            }
                        },
                        colors: ["#ffa81d","#8d71fc","#f0577b"],
                        stroke: {
                            lineCap: "round"
                        },
                        labels: ["Pending Roads","Ongoing Roads","Completed Roads"]
                    };
                    new ApexCharts(t, o).render()
                }
