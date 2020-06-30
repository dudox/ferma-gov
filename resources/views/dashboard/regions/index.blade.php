@extends('layouts.dashboard')
@section('title', 'Regions')
@section('region_a','menu-item-here')

@section('content')
<div class="content  d-flex flex-column flex-column-fluid" id="kt_content">

    <!--begin::Subheader-->
    <div class="subheader py-2 py-lg-4  subheader-transparent " id="kt_subheader">
        <div class=" container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <!--begin::Details-->
            <div class="d-flex align-items-center flex-wrap mr-2">

                <!--begin::Title-->
                <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">
                    Regions </h5>
                <!--end::Title-->

                <!--begin::Separator-->
                <div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-5 bg-gray-200"></div>
                <div class="d-flex align-items-center" id="kt_subheader_search">
                    <span class="text-dark-50 font-weight-bold" id="kt_subheader_total">
                        {{count($regions)}} Total
                    </span>

                </div>
                <div class="d-flex- align-items-center flex-wrap mr-2 d-none" id="kt_subheader_group_actions">
                    <div class="text-dark-50 font-weight-bold">
                        <span id="kt_subheader_group_selected_rows">23</span> Selected:
                    </div>
                    <div class="d-flex ml-6">
                        <div class="dropdown mr-2" id="kt_subheader_group_actions_status_change">
                            <button type="button" class="btn btn-light-primary font-weight-bolder btn-sm dropdown-toggle" data-toggle="dropdown">
                                Update Status
                            </button>
                            <div class="dropdown-menu p-0 m-0 dropdown-menu-sm">
                                <ul class="navi navi-hover pt-3 pb-4">
                                    <li class="navi-header font-weight-bolder text-uppercase text-primary font-size-lg pb-0">
                                        Change status to:
                                    </li>
                                    <li class="navi-item">
                                        <a href="#" class="navi-link" data-toggle="status-change" data-status="1">
                                            <span class="navi-text"><span class="label label-light-success label-inline font-weight-bold">Approved</span></span>
                                        </a>
                                    </li>
                                    <li class="navi-item">
                                        <a href="#" class="navi-link" data-toggle="status-change" data-status="2">
                                            <span class="navi-text"><span class="label label-light-danger label-inline font-weight-bold">Rejected</span></span>
                                        </a>
                                    </li>
                                    <li class="navi-item">
                                        <a href="#" class="navi-link" data-toggle="status-change" data-status="3">
                                            <span class="navi-text"><span class="label label-light-warning label-inline font-weight-bold">Pending</span></span>
                                        </a>
                                    </li>
                                    <li class="navi-item">
                                        <a href="#" class="navi-link" data-toggle="status-change" data-status="4">
                                            <span class="navi-text"><span class="label label-light-info label-inline font-weight-bold">On Hold</span></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button class="btn btn-light-success font-weight-bolder btn-sm mr-2" id="kt_subheader_group_actions_fetch" data-toggle="modal" data-target="#kt_datatable_records_fetch_modal">
                            Fetch Selected
                        </button>
                        <button class="btn btn-light-danger font-weight-bolder btn-sm mr-2" id="kt_subheader_group_actions_delete_all">
                            Delete All
                        </button>
                    </div>
                </div>
                <!--end::Group Actions-->
            </div>
            <!--end::Details-->

            <!--begin::Toolbar-->
            <div class="d-flex align-items-center">
                <!--begin::Button-->
                <a href="/metronic/preview/demo9/.html" class="">

                </a>
                <!--end::Button-->

                <!--begin::Button-->
                <a href="/metronic/preview/demo9/custom/apps/projects/add-project.html" class="btn btn-light-primary font-weight-bold ml-2">

                    Add Project </a>
                <!--end::Button-->

                <!--begin::Dropdown-->
                <div class="dropdown dropdown-inline ml-2" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
                    <a href="#" class="btn btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="svg-icon svg-icon-success svg-icon-2x">
                            <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Files/File-plus.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                    <path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                    <path d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z" fill="#000000"></path>
                                </g>
                            </svg>
                            <!--end::Svg Icon--></span> </a>
                    <div class="dropdown-menu p-0 m-0 dropdown-menu-md dropdown-menu-right">
                        <!--begin::Naviigation-->
                        <ul class="navi">
                            <li class="navi-header font-weight-bold py-5">
                                <span class="font-size-lg">Add New:</span>
                                <i class="flaticon2-information icon-md text-muted" data-toggle="tooltip" data-placement="right" title="" data-original-title="Click to learn more..."></i>
                            </li>
                            <li class="navi-separator mb-3 opacity-70"></li>
                            <li class="navi-item">
                                <a href="#" class="navi-link">
                                    <span class="navi-icon"><i class="flaticon2-shopping-cart-1"></i></span>
                                    <span class="navi-text">Order</span>
                                </a>
                            </li>
                            <li class="navi-item">
                                <a href="#" class="navi-link">
                                    <span class="navi-icon"><i class="navi-icon flaticon2-calendar-8"></i></span>
                                    <span class="navi-text">Members</span>
                                    <span class="navi-label">
                                        <span class="label label-light-danger label-rounded font-weight-bold">3</span>
                                    </span>
                                </a>
                            </li>
                            <li class="navi-item">
                                <a href="#" class="navi-link">
                                    <span class="navi-icon"><i class="navi-icon flaticon2-telegram-logo"></i></span>
                                    <span class="navi-text">Project</span>
                                </a>
                            </li>
                            <li class="navi-item">
                                <a href="#" class="navi-link">
                                    <span class="navi-icon"><i class="navi-icon flaticon2-new-email"></i></span>
                                    <span class="navi-text">Record</span>
                                    <span class="navi-label">
                                        <span class="label label-light-success label-rounded font-weight-bold">5</span>
                                    </span>
                                </a>
                            </li>
                            <li class="navi-separator mt-3 opacity-70"></li>
                            <li class="navi-footer pt-5 pb-4">
                                <a class="btn btn-light-primary font-weight-bolder btn-sm" href="#">More options</a>
                                <a class="btn btn-clean font-weight-bold btn-sm d-none" href="#" data-toggle="tooltip" data-placement="right" title="" data-original-title="Click to learn more...">Learn more</a>
                            </li>
                        </ul>
                        <!--end::Naviigation-->
                    </div>
                </div>
                <!--end::Dropdown-->
            </div>
            <!--end::Toolbar-->
        </div>
    </div>
    <!--end::Subheader-->

    <!--begin::Entry-->
    <div class="d-flex flex-column-fluid">
        <!--begin::Container-->
        <div class=" container ">
            <div class="d-flex  mb-10">
                <div class="quick-search quick-search-inline flex-grow-1" id="kt_quick_search_inline">
                    <!--begin::Form-->
                    Search Regions
                    <br/>
                    <form method="get" class="quick-search-form">
                        <div class="input-group rounded" style="background-color: #EBDBCB;">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                                        <i class="fa fa-search"></i>
                                    </span>
                                </span>
                            </div>

                            <input type="text" class="form-control form-control-primary h-50px" id="myInput" placeholder="Search For Region">

                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="quick-search-close ki ki-close icon-sm text-primary"></i>
                                </span>
                            </div>
                        </div>
                    </form>
                    <!--end::Form-->

                    <!--begin::Search Toggle-->
                    <div id="kt_quick_search_toggle" data-toggle="dropdown" data-offset="0px,1px"></div>
                    <!--end::Search Toggle-->

                    <!--begin::Dropdown-->
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg dropdown-menu-anim-up">
                        <div class="quick-search-wrapper scroll" data-scroll="true" data-height="350" data-mobile-height="200" style="height: 200px; overflow: auto;">
                        <div class="ps__rail-x" style="left: 0px; bottom: 0px;"><div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps__rail-y" style="top: 0px; right: 0px;"><div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div></div></div>
                    </div>
                    <!--end::Dropdown-->
                </div>

            </div>
            <!--begin::Row-->
            <div class="row" id="myFilter">
                @foreach ($regions as $key => $region)
                @php
                    $words = explode(' ', $region->zone);
                    $result = $words[0][0]. $words[1][0];
                @endphp
                <div class="col-xl-4 region">
                    <!--begin::Card-->
                    <div class="card card-custom gutter-b card-stretch">
                        <!--begin::Body-->
                        <div class="card-body">
                            <!--begin::Info-->
                            <div class="d-flex align-items-center">
                                <!--begin::Pic-->
                                <div class="symbol symbol-50  symbol-{{$region->color}} mr-2">
                                    <span class=" symbol-label font-weight-boldest ">{{$result}}</span>
                                </div>
                                <!--end::Pic-->
                                <!--begin::Info-->
                                <div class="d-flex flex-column mr-auto">
                                    <!--begin: Title-->
                                    <div class="d-flex flex-column mr-auto">
                                        <a href="{{ route('regions.single',str_replace(' ','_',$region->zone)) }}" class="text-dark text-hover-primary font-size-h4 font-weight-bolder mb-1 title">
                                            {{$region->zone}}
                                        </a>
                                        <span class="text-muted font-weight-bold">
                                            This region has a total of {{count($region->states)}}
                                        </span>
                                    </div>
                                    <!--end::Title-->
                                </div>
                            </div>
                            <div class="mb-10 mt-5 font-weight-bold ">
                                @foreach ($region->states as $state)
                                    <label for="" class="badge badge- small"><a href="{{ route('regions.roads',[str_replace(' ','_',$region->zone),str_replace(' ','_',$state->name)]) }}" style="text-decoration: underline;"><i class="fa fa-link fa-sm"></i> {{ str_replace('State','',$state->name) }}</a></label>
                                @endforeach
                            </div>
                            <!--end::Description-->
                            @php $pending = 0; $ongoing = 0; $completed = 0;@endphp
                            <!--begin::Data-->
                            <div class="d-flex mb-5">
                                <div class="row align-items-center mr-4">
                                    <span class="font-weight-bold col-12 px-0 small">
                                        Pending Rd.
                                    </span>
                                    <span class="btn btn-light-warning btn-sm font-weight-bold btn-upper btn-text btn-block mr-2">

                                        @foreach ($region->states as $key => $item)
                                            @php
                                                $pending +=  count($item->roads->where('status',1));
                                            @endphp
                                        @endforeach
                                        {{$pending}}
                                    </span>
                                </div>
                                <div class="row align-items-center mr-4">
                                    <span class="font-weight-bold col-12 px-0 small">
                                        Completed Rd.
                                    </span>
                                    <span class="btn btn-light-primary btn-sm font-weight-bold btn-upper btn-text btn-block mr-2">
                                        @foreach ($region->states as $key => $item)
                                            @php
                                                $completed +=  count($item->roads->where('status',3));
                                            @endphp
                                        @endforeach
                                        {{$completed}}
                                    </span>
                                </div>
                                <div class="row align-items-center mr-4">
                                    <span class="font-weight-bold col-12 px-0 small">
                                        Ongoing Rd
                                    </span>
                                    <span class="btn btn-light-info btn-sm font-weight-bold btn-upper btn-text btn-block">
                                        @foreach ($region->states as $key => $item)
                                            @php
                                                $ongoing +=  count($item->roads->where('status',2));
                                            @endphp
                                        @endforeach
                                        {{$ongoing}}
                                    </span>
                                </div>
                            </div>
                            <!--end::Data-->
                            <!--begin::Progress-->
                            @php
                                $percent = ($region->reports_count / $totals) * 100;
                            @endphp
                            <div class="d-flex mb-5 align-items-cente">
                                <span class="d-block font-weight-bold mr-5">Reports</span>
                                <div class="d-flex flex-row-fluid align-items-center">
                                    <div class="progress progress-xs mt-2 mb-2 w-100">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: {{round($percent)}}%;" aria-valuenow="{{round($percent)}}" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <span class="ml-3 font-weight-bolder">{{round($percent)}}%</span>
                                </div>
                            </div>
                            <!--ebd::Progress-->
                        </div>
                        <!--end::Body-->

                        <!--begin::Footer-->
                        <div class="card-footer d-flex align-items-center">
                            <div class="d-flex">
                                <div class="d-flex align-items-center mr-7">
                                    <span class="svg-icon svg-icon-gray-500">
                                        <i class="fa fa-road"></i>
                                    </span>
                                        <a href="#" class="font-weight-bolder text-primary ml-2">
                                            @php
                                                $roads = 0;
                                            @endphp
                                            @foreach ($region->states as $key => $item)
                                            @php
                                                $roads +=  count($item->roads);
                                            @endphp
                                        @endforeach
                                        {{$roads}} Roads
                                        </a>
                                </div>
                                <div class="d-flex align-items-center   mr-7">
                                    <span class="svg-icon svg-icon-gray-500">
                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Communication/Group-chat.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                <path d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z" fill="#000000"></path>
                                                <path d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z" fill="#000000" opacity="0.3"></path>
                                            </g>
                                        </svg>
                                        <!--end::Svg Icon--></span> <a href="#" class="font-weight-bolder text-primary ml-2">{{$region->reports_count}} Reports</a>
                                </div>
                            </div>
                        </div>
                        <!--end::Footer-->
                    </div>
                    <!--end:: Card-->
                </div>
                @endforeach

            </div>
            <!--end::Row-->
        </div>
        <!--end::Container-->
    </div>
    <!--end::Entry-->
</div>
@endsection
@section('scripts')
<script>
    // SEARCH FUNCTION
        var btsearch = {
            init: function(search_field, searchable_elements, searchable_text_class) {
                $(search_field).keyup(function(e){
                    e.preventDefault();
                    var query = $(this).val().toLowerCase();
                    if(query){
                        // loop through all elements to find match
                        $.each($(searchable_elements), function(){
                            var title = $(this).find(searchable_text_class).text().toLowerCase();
                            if(title.indexOf(query) == -1){
                                $(this).hide();
                            } else {
                                $(this).show();
                            }
                        });
                    } else {
                        // empty query so show everything
                        $(searchable_elements).show();
                    }
                });
            }
        }

            // INIT
            $(function(){
            // USAGE: btsearch.init(('search field element', 'searchable children elements', 'searchable text class');
            btsearch.init('#myInput', '#myFilter .region', 'a.title');
            });
        </script>
@endsection
