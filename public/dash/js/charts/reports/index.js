    var t = document.getElementById("kt_mixed_widget_reports_chart"),
    e = parseInt(KTUtil.css(t, "height"));
    if (t) {
            var o = {
                series: [{
                    name: "Pending Roads",
                    data: [35, 65, 75, 55, 45, 60, 55,55,55,87,21,98]
                }, {
                    name: "Ongoing Roads",
                    data: [40, 70, 80, 60, 50, 65, 60,23,99,11,,33,45]
                },
                {
                    name: "Completed Roads",
                    data: [35, 65, 75, 55, 45, 60, 55,43,77,32,11,99]
                }],
                chart: {
                    type: "bar",
                    height: e,
                    toolbar: {
                        show: !1
                    },
                    sparkline: {
                        enabled: !0
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: !1,
                        columnWidth: ["30%"],
                        endingShape: "rounded"
                    }
                },
                legend: {
                    show: !1
                },
                dataLabels: {
                    enabled: !1
                },
                stroke: {
                    show: !0,
                    width: 1,
                    colors: ["transparent"]
                },
                xaxis: {
                    categories: ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sept","Oct","Nov","Dec"],
                    axisBorder: {
                        show: 1
                    },
                    axisTicks: {
                        show: 1
                    },
                    labels: {
                        style: {
                            colors: "#000",
                            fontSize: "12px",
                            fontFamily: KTApp.getSettings()["font-family"]
                        }
                    }
                },
                yaxis: {
                    min: 0,
                    max: 100,
                    labels: {
                        style: {
                            colors: "#fff",
                            fontSize: "12px",
                            fontFamily: KTApp.getSettings()["font-family"]
                        }
                    }
                },
                fill: {
                    type: ["solid", "solid"],
                    opacity: [.25, 1]
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
                        allowMultipleDataPointsSelection: !1,
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
                            return "$" + t + " thousands"
                        }
                    },
                    marker: {
                        show: !1
                    }
                },
                colors: ["#ffffff", "#ffffff"],
                grid: {
                    borderColor: "#fff",
                    strokeDashArray: 4,
                    yaxis: {
                        lines: {
                            show: !0
                        }
                    },
                    padding: {
                        left: 20,
                        right: 20
                    }
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
