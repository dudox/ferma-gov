@extends('layouts.dashboard')
@section('entery_a','menu-item-here')
@section('title','Entries')
@section('content')
<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <!--begin::Subheader-->
    <div class="subheader py-2 py-lg-4 subheader-transparent" id="kt_subheader">
        <div class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <!--begin::Info-->
            <div class="d-flex align-items-center flex-wrap mr-1">
                <!--begin::Mobile Toggle-->
                <button class="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none" id="kt_subheader_mobile_toggle">
                    <span></span>
                </button>
                <!--end::Mobile Toggle-->
                <!--begin::Page Heading-->
                <div class="d-flex align-items-baseline flex-wrap mr-5">
                    <!--begin::Page Title-->
                    <h5 class="text-dark font-weight-bold my-1 mr-5">Entries</h5>
                    <!--end::Page Title-->
                    <!--begin::Breadcrumb-->
                    <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
                        <li class="breadcrumb-item">
                            <a href="" class="text-muted">List Users</a>
                        </li>
                    </ul>
                    <!--end::Breadcrumb-->
                </div>
                <!--end::Page Heading-->
            </div>

        </div>
    </div>
    <!--end::Subheader-->
    <!--begin::Entry-->
    <div class="d-flex flex-column-fluid">
        <!--begin::Container-->
        <div class="container">
            <!--begin::Profile 4-->
            <div class="row">
                <div class="col-xl-6">
                    <!--begin::Mixed Widget 15-->
                    <div class="card card-custom gutter-b card-stretch">
                        <!--begin::Header-->
                        <div class="card-header border-0 pt-5">
                            <h3 class="card-title font-weight-bolder">Reports Traffic</h3>
                        </div>
                        <!--end::Header-->
                        <!--begin::Body-->
                        <div class="card-body d-flex flex-column" style="position: relative;">
                            <!--begin::Chart-->
                            <div class="px-0 mx-0">
                                <div id="kt_mixed_widget_15_chart" data-value="{{ json_encode( $monthly,false) }}"></div>
                            </div>
                            <!--end::Chart-->
                            <!--begin::Items-->
                            <div class="mt-5 flex-grow-1">
                                <!--begin::Item-->
                                <div class="d-flex align-items-center justify-content-between mb-5">
                                    <!--begin::Section-->
                                    <div class="d-flex align-items-center mr-2">
                                        <!--begin::Symbol-->
                                        <div class="symbol symbol-50 symbol-light-primary mr-3 flex-shrink-0">
                                            <div class="symbol-label">
                                               <i class="fa fa-boxes text-primary"></i>
                                            </div>
                                        </div>
                                        <!--end::Symbol-->
                                        <!--begin::Title-->
                                        <div>
                                            <a href="#" class="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Daily Total Reports</a>
                                            <div class="font-size-sm text-muted font-weight-bold"><span class="text-dark">Today's date: {{ date("dS M, Y",strtotime($now)) }}</span></div>
                                        </div>
                                        <!--end::Title-->
                                    </div>
                                    <!--end::Section-->
                                    <!--begin::Label-->
                                    <div class="label label-light label-inline font-weight-bold text-dark-50 py-4 px-3 font-size-base">{{ $daily }}</div>
                                    <!--end::Label-->
                                </div>
                                <!--end::Item-->
                                <!--begin::Widget Item-->
                                <div class="d-flex align-items-center justify-content-between mb-5">
                                    <!--begin::Section-->
                                    <div class="d-flex align-items-center mr-2">
                                        <!--begin::Symbol-->
                                        <div class="symbol symbol-50 symbol-light-dark mr-3 flex-shrink-0">
                                            <div class="symbol-label">
                                                <i class="fa fa-road text-dark"></i>
                                            </div>
                                        </div>
                                        <!--end::Symbol-->
                                        <!--begin::Title-->
                                        <div>
                                            <a href="#" class="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Unique Roads Reported</a>
                                            <div class="font-size-sm text-muted font-weight-bold mt-1">Total Number of unique roads reported</div>
                                        </div>
                                        <!--end::Title-->
                                    </div>
                                    <!--end::Section-->
                                    <!--begin::Label-->
                                    <div class="label label-light label-inline font-weight-bold text-dark-50 py-4 px-3 font-size-base">{{ $unique }}</div>
                                    <!--end::Label-->
                                </div>
                                <!--end::Widget Item-->
                                <!--begin::Widget Item-->
                                <div class="d-flex align-items-center justify-content-between">
                                    <!--begin::Section-->
                                    <div class="d-flex align-items-center mr-2">
                                        <!--begin::Symbol-->
                                        <div class="symbol symbol-50 symbol-light-danger mr-3 flex-shrink-0">
                                            <div class="symbol-label">
                                               <i class="fa fa-cubes text-danger"></i>
                                            </div>
                                        </div>
                                        <!--end::Symbol-->
                                        <!--begin::Title-->
                                        <div>
                                            <a href="#" class="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Overall Reports</a>
                                            <div class="font-size-sm text-muted font-weight-bold mt-1"></div>
                                        </div>
                                        <!--end::Title-->
                                    </div>
                                    <!--end::Section-->
                                    <!--begin::Label-->
                                    <div class="label label-light label-inline font-weight-bold text-dark-50 py-4 px-3 font-size-base">{{ count($entries) }}</div>
                                    <!--end::Label-->
                                </div>
                                <!--end::Widget Item-->
                            </div>
                            <!--end::Widget Items-->
                        <div class="resize-triggers"><div class="expand-trigger"><div style="width: 291px; height: 400px;"></div></div><div class="contract-trigger"></div></div></div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 15-->
                </div>
                <div class="col-xl-3">
                    <!--begin::Base Table Widget 4-->
                    <div class="card card-custom card-stretch gutter-b">
                        <!--begin::Header-->
                        <div class="card-header border-0 pt-5">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="card-label font-weight-bolder text-dark">Most Active Users</span>
                                <span class="text-muted mt-3 font-weight-bold font-size-sm">Here are the top 5 users with most active reports</span>
                            </h3>

                        </div>
                        <!--end::Header-->
                        <!--begin::Body-->
                        <div class="card-body pt-2 pb-0">
                            <!--begin::Table-->
                            <div class="table-responsive">
                                <table class="table table-borderless table-vertical-center">
                                    <thead>
                                        <tr>
                                            <th class="p-0" style="width: 50px"></th>
                                            <th class="p-0" style="min-width: 120px"></th>
                                            {{-- <th class="p-0" style="min-width: 100px"></th> --}}
                                            <th class="p-0" style="min-width: 30px"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($mostActive as $item)
                                        <tr>
                                            <td class="pl-0">
                                                <div class="symbol symbol-45 symbol-light-info mr-2">
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
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">{{ $item->name }}</a>
                                                <span class="text-muted font-weight-bold d-block">{{ $item->phone }}</span>
                                            </td>
                                            {{-- <td>
                                                <span class="text-muted font-weight-bold d-block">Rating </span>
                                                <img src="{{ asset('dash/img/stars.png') }}" alt="image" style="width: 5.5rem">
                                            </td> --}}

                                            <td class="text-right pr-0">
                                                <span class="badge badge-warning">{{ $item->phone_count }}</span>
                                            </td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                            <!--end::Table-->
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Base Table Widget 4-->
                </div>
                <div class="col-xl-3">
                    <!--begin::Mixed Widget 14-->
                    <div class="card card-custom gutter-b card-stretch">
                        <!--begin::Header-->
                        <div class="card-header border-0 pt-5">
                            <h3 class="card-title font-weight-bolder">Road with the highest reports</h3>
                        </div>
                        <!--end::Header-->
                        <!--begin::Body-->
                        <div class="card-body d-flex flex-column">
                            <div class="flex-grow-1" style="position: relative;">
                                <div id="kt_mixed_widget_14_chart" data-value="{{ json_encode($percent['total']) }}" style="height: 200px; min-height: 200.7px;"></div>
                            </div>
                            <div class="pt-5">
                                <p class="text-left font-weight-normal font-size-lg pb-7">Notes: The Above Radial Shows that <span class="text-primary font-weight-bolder">{{ $percent['total'] }}%</span> of the total reports points to <a href="" class="text-primary font-weight-bolder"><u>{{ ucfirst($percent['name']) }}</u></a>
                                <br>Thus having the highest numbers of complaints</p>
                                <a href="#" class="btn btn-success btn-shadow-hover font-weight-bolder w-100 py-3">Go to Report</a>
                            </div>
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 14-->
                </div>
            </div>
            <!--end::Row-->
            <!--begin::Advance Table Widget 8-->
            <div class="card card-custom gutter-b">
                <!--begin::Header-->
                <div class="card-header border-0 py-5">
                    <h3 class="card-title align-items-start flex-column">
                        <span class="card-label font-weight-bolder text-dark">Entries</span>
                        <span class="text-muted mt-3 font-weight-bold font-size-sm">More than {{ count($entries) }}+ new entries</span>
                    </h3>
                </div>
                <!--end::Header-->
                <!--begin::Body-->
                <div class="card-body pt-0 pb-3">
                    <!--begin::Table-->
                    <div class="table-responsive">
                        <table class="table table-head-custom table-head-bg table-vertical-center table-borderless">
                            <thead>
                                <tr class="bg-gray-100 text-left">
                                    <th style="min-width: 250px" class="pl-7">
                                        <span class="text-dark-75">Name</span>
                                    </th>
                                    <th style="min-width: 130px">States/Location</th>
                                    <th style="min-width: 120px">Locals</th>
                                    <th style="min-width: 120px">Zone</th>
                                    <th style="min-width: 110px">Roads</th>
                                    <th style="min-width: 110px">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($entries as $entry)
                                <tr>
                                    <td class="pl-0 py-8">
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
                                                <a href="{{ route('entries.show',$entry->phone) }}" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{{ $entry->name }}</a>
                                                <span class="text-muted font-weight-bold d-block">{{ $entry->phone }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">{{ $entry->states->name }}</span>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">{{ $entry->locals->local_name }}</span>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">{{ $entry->zones->zone }}</span>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg"> {{ ucfirst($entry->roads->name) }}</span>
                                    </td>
                                    <td>
                                        <span class="label label-lg label-light-primary label-inline">{{ date("dS M, Y",strtotime($entry->created_at)) }}</span>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                        {{ $entries->links() }}
                    </div>
                    <!--end::Table-->
                </div>
                <!--end::Body-->
            </div>
            <!--end::Profile 4-->
        </div>
        <!--end::Container-->
    </div>
    <!--end::Entry-->
</div>
@endsection
@section('scripts')
    <script>
    var t = document.getElementById("kt_mixed_widget_15_chart"),
        e = parseInt(KTUtil.css(t, "height"));
        let arr = JSON.parse(t.dataset.value);
        let data = [];
        let date = [];
    if (t) {
        arr.forEach(function(e){
            data.push(e.total);
            date.push(this.monthName(e.month));
        });
        var o = {
            series: [{
                name: "Entries",
                data: data
            }],
            chart: {
                type: "area",
                height: "200px",
                toolbar: {
                    show: 1
                },
                zoom: {
                    enabled: 1
                },
                sparkline: {
                    enabled: !0
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
                type: "gradient",
                opacity: 1,
                gradient: {
                    type: "vertical",
                    shadeIntensity: .5,
                    gradientToColors: void 0,
                    inverseColors: !0,
                    opacityFrom: 1,
                    opacityTo: .375,
                    stops: [25, 50, 100],
                    colorStops: []
                }
            },
            stroke: {
                curve: "smooth",
                show: !0,
                width: 3,
              //  colors: [KTApp.getSettings().colors.theme.base.danger]
            },
            xaxis: {
                categories: date,
                axisBorder: {
                    show: 1
                },
                axisTicks: {
                    show: 1
                },
                labels: {
                    show: 1,
                    style: {
                        //colors: KTApp.getSettings().colors.gray["gray-500"],
                       fontSize: "12px",
                        fontFamily: KTApp.getSettings()["font-family"]
                    }
                },
                crosshairs: {
                    show: 1,
                    position: "front",
                    stroke: {
                     //   color: KTApp.getSettings().colors.gray["gray-300"],
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
                min: 0,
                max: 65,
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
                        return  t
                    }
                }
            },
            //colors: [KTApp.getSettings().colors.theme.light.danger],
            markers: {
               // colors: [KTApp.getSettings().colors.theme.light.danger],
             //   strokeColor: [KTApp.getSettings().colors.theme.base.danger],
                strokeWidth: 3
            }
        };
        new ApexCharts(t, o).render()
    }

    function monthName(mon) {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'][mon - 1];
    }

    // Road with the highest reports

    var t = document.getElementById("kt_mixed_widget_14_chart"),
        e = parseInt(KTUtil.css(t, "height"));

    if (t) {
        var o = {
            series: [t.dataset.value],
            chart: {
                height: e,
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
                            show: !1,
                            fontWeight: "700"
                        },
                        value: {
                           // color: KTApp.getSettings().colors.gray["gray-700"],
                            fontSize: "30px",
                            fontWeight: "700",
                            offsetY: 12,
                            show: !0
                        }
                    },
                    track: {
                        //background: KTApp.getSettings().colors.theme.light.success,
                        strokeWidth: "100%"
                    }
                }
            },
          //  colors: [KTApp.getSettings().colors.theme.base.success],
            stroke: {
                lineCap: "round"
            },
            labels: ["Progress"]
        };
        new ApexCharts(t, o).render()
    }
    </script>
@endsection
