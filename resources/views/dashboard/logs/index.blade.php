@extends('layouts.dashboard')


@section('content')
<div class="content  d-flex flex-column flex-column-fluid" id="kt_content">
    <!--begin::Subheader-->
    <div class="subheader py-2 py-lg-4  subheader-transparent " id="kt_subheader">
        <div class=" container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <!--begin::Details-->
            <div class="d-flex align-items-center flex-wrap mr-2">

                <!--begin::Title-->
                <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">Users</h5>
                <!--end::Title-->

                <!--begin::Separator-->
                <div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-5 bg-gray-200"></div>
                <!--end::Separator-->

                <!--begin::Search Form-->
                <div class="d-flex align-items-center" id="kt_subheader_search">
                    <span class="text-dark-50 font-weight-bold" id="kt_subheader_total"> Total</span>
                    <form class="ml-5">
                        <div class="input-group input-group-sm input-group-solid" style="max-width: 175px">
                            <input type="text" class="form-control" id="kt_subheader_search_form" placeholder="Search...">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <span class="svg-icon">
                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Search.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                                <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"></path>
                                            </g>
                                        </svg>
                                        <!--end::Svg Icon-->
                                    </span>
                                    <!--<i class="flaticon2-search-1 icon-sm"></i>-->
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
                <!--end::Search Form-->
            </div>

        </div>
    </div>
    <!--end::Subheader-->

    <!--begin::Entry-->
    <div class="d-flex flex-column-fluid">
        <!--begin::Container-->
        <div class=" container ">
            <!--begin::Card-->
            <div class="card card-custom">
                <!--begin::Header-->
                <div class="card-header flex-wrap border-0 pt-6 pb-0">
                    <div class="card-title">
                        <h3 class="card-label">
                            User Management
                            <span class="d-block text-muted pt-2 font-size-sm">User management made easy</span>
                        </h3>

                    </div>

                </div>
                <!--end::Header-->

                <!--begin::Body-->
                <div class="card-body">
                    <div class="mb-7">
                        <div class="row align-items-center">
                            <div class="col-lg-9 col-xl-8">
                                <div class="row align-items-center">
                                    <div class="col-md-12 my-2 my-md-0">
                                        <div class="input-icon">
                                            <input type="text" class="form-control py-5" placeholder="Search..." id="kt_datatable_search_query" />
                                            <span><i class="fa fa-search text-muted"></i></span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!--begin: Datatable-->

                    <div>
                        <div class="datatable datatable-bordered datatable-head-custom" id="kt_datatable"></div>


                        <!--end: Datatable-->
                    </div>
                    <!--end::Body-->
                </div>
                <!--end::Card-->
            </div>
            <!--end::Container-->
        </div>
        <!--end::Entry-->
    </div>
</div>

@endsection
@section('scripts')
<script>
   "use strict";
    var KTDatatableJsonRemoteDemo = {
        init: function() {
            var t;
            t = $("#kt_datatable").KTDatatable({
                data: {
                    type: "remote",
                    source:  "/api/user/logs",
                    pageSize: 10
                },
                layout: {
                    scroll: !1,
                    footer: !1
                },
                sortable: !0,
                pagination: !0,
                search: {
                    input: $("#kt_datatable_search_query"),
                    key: "generalSearch"
                },
                columns: [{
                    field: "RecordID",
                    title: "#",
                    sortable: !1,
                    width: 20,
                    type: "number",
                    selector: {
                        class: ""
                    },
                    textAlign: "center"
                }, {
                    field: "User Info",
                    title: "User Info",
                    width: 250,
                    autoHide: !1,
                    template: function(t) {
                        return '<span class="badge font-weight-bold"><i class="fa fa-user-circle fa-sm text-primary"></i>&nbsp;'+t['User Info']['name'] + "</span><br><span class='badge font-weight-bold'><i class='fa fa-envelope fa-sm'></i>&nbsp;" + t['User Info']['email']+"</span>"
                    }
                }, {
                    field: "Location",
                    title: "Location",
                    template: function(t) {

                        return '<span class="label font-weight-bold label-lg' + t['status'].class + ' label-inline"><i class="fa fa-globe fa-sm"></i>&nbsp;' + t.Location + "</span>"
                    }

                }, {
                    field: "Ip Address",
                    title: "Ip Address"
                }, {
                    field: "timestamp",
                    title: "Timestamp",
                    type: "date",
                    format: "MM/DD/YYYY"
                }, {
                    field: "status",
                    title: "Status",
                    template: function(t) {

                        return '<span class="label font-weight-bold label-lg ' + t['status'].class + ' label-inline">' + t['status'].title + "</span>"
                    }
                }]
            }), $("#kt_datatable_search_status").on("change", function() {
                t.search($(this).val().toLowerCase(), "Status")
            }), $("#kt_datatable_search_type").on("change", function() {
                t.search($(this).val().toLowerCase(), "Type")
            }), $("#kt_datatable_search_status, #kt_datatable_search_type").selectpicker()
        }
    };
    jQuery(document).ready(function() {
        KTDatatableJsonRemoteDemo.init()
    });
</script>
@endsection
