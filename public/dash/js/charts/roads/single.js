var t = document.getElementById("kt_charts_widget_4_chart");
let arr = JSON.parse(t.dataset.chart);
let data = [];
let date = [];
if (t) {
    arr.forEach(function(e){
    data.push(e.total);
    date.push(this.monthName(e.month));
});
    var e = {
        series: [{
            name: "Reports",
            data: data
        }],
        chart: {
            type: "area",
            height: 350,
            toolbar: {
                show: !1
            }
        },
        plotOptions: {},
        legend: {
            show: !1
        },
        dataLabels: {
            enabled: !1
        },
        fill: {
            type: "solid",
            opacity: 1
        },
        stroke: {
            curve: "smooth"
        },
        xaxis: {
            categories: date,
            axisBorder: {
                show: !1
            },
            axisTicks: {
                show: !1
            },
            labels: {
                style: {
                    //colors: KTApp.getSettings().colors.gray["gray-500"],
                    fontSize: "12px",
                    fontFamily: KTApp.getSettings()["font-family"]
                }
            },
            crosshairs: {
                position: "front",
                stroke: {
                    //color: KTApp.getSettings().colors.theme.light.success,
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
                    return  t + " Reports"
                }
            }
        },
        //colors: [KTApp.getSettings().colors.theme.base.success, KTApp.getSettings().colors.theme.base.warning],
        grid: {
            //borderColor: KTApp.getSettings().colors.gray["gray-200"],
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: !0
                }
            }
        },
        markers: {
            //colors: [KTApp.getSettings().colors.theme.light.success, KTApp.getSettings().colors.theme.light.warning],
            //strokeColor: [KTApp.getSettings().colors.theme.light.success, KTApp.getSettings().colors.theme.light.warning],
            strokeWidth: 3
        }
    };
    new ApexCharts(t, e).render()
}

function monthName(mon) {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec'][mon - 1];
}

baguetteBox.run('.tz-gallery');
$('.select').on('change', function() {
    $('.select').not(this).prop('checked', false);
    let data = {};
    data.status =  $(this).val();
    data.id = $(this).data('id');
    $.ajax({
        type: 'POST',
        url: '/dashboard/roads/switch',
        data: data,
        success: function(tx){
            $('.responseMessage').html(`
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>
                <strong>${tx.status}!</strong> ${tx.message}.
            </div>
            `);

            $(".responseMessage").fadeTo(2000, 500).slideUp(500, function(){
                $(".alert").slideUp(500);
            });
        }
    })
});

"use strict";
let varDataTable = document.getElementById("kt_datatable");

var KTDatatablesDataSourceAjaxServer = {
    init: function() {
        $("#kt_datatable").DataTable({
            lengthMenu: [5, 10, 25, 50],
            pageLength: 5,
            responsive: !0,
            searchDelay: 500,
            processing: !0,
            //serverSide: !0,
            ajax: {
                url:  "/api/datatables/roads/single",
                type: "POST",
                data: {
                    columnsDef: ["ID", "Name", "Region", "State", "Local Govt", "Road", "Date"],
                    local: varDataTable.dataset.local,
                    road: varDataTable.dataset.road

                }
            },
            columns: [{
                data: "ID"
            }, {
                data: "Name"
            }, {
                data: "Region"
            }, {
                data: "State"
            }, {
                data: "Local Govt"
            }, {
                data: "Road"
            }, {
                data: "Date"
            }],
            columnDefs: [{
                targets: 1,
                title: "Name",
                orderable: !1,
                render: function(t, a, e, l) {
                    return `
                        <div class="d-flex align-items-center">
                            <div class="symbol symbol-50 flex-shrink-0 mr-4">
                                <span class="symbol-label">
                                    <span class="svg-icon svg-icon-2x svg-icon-info">
                                        <!--begin::Svg Icon | path:../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Communication/Group.svg-->
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                                <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                                <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero"></path>
                                            </g>
                                        </svg>
                                        <!--end::Svg Icon-->
                                    </span>
                                </span>
                            </div>
                            <div>
                                <a href="${t[2]}" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">${t[0]}</a>
                                <span class="text-muted font-weight-bold d-block">${t[1]}</span>
                            </div>
                        </div>
                    `;
                }
            }]
        })
    }
};
jQuery(document).ready(function() {
    KTDatatablesDataSourceAjaxServer.init()
});
