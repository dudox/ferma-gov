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
                                        <div class="symbol symbol-50 symbol-light mr-3 flex-shrink-0">
                                            <div class="symbol-label">
                                                <img src="../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/006-plurk.svg" class="h-50" alt="">
                                            </div>
                                        </div>
                                        <!--end::Symbol-->
                                        <!--begin::Title-->
                                        <div>
                                            <a href="#" class="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Top Authors</a>
                                            <div class="font-size-sm text-muted font-weight-bold mt-1">Ricky Hunt, Sandra Trepp</div>
                                        </div>
                                        <!--end::Title-->
                                    </div>
                                    <!--end::Section-->
                                    <!--begin::Label-->
                                    <div class="label label-light label-inline font-weight-bold text-dark-50 py-4 px-3 font-size-base">+82$</div>
                                    <!--end::Label-->
                                </div>
                                <!--end::Item-->
                                <!--begin::Widget Item-->
                                <div class="d-flex align-items-center justify-content-between mb-5">
                                    <!--begin::Section-->
                                    <div class="d-flex align-items-center mr-2">
                                        <!--begin::Symbol-->
                                        <div class="symbol symbol-50 symbol-light mr-3 flex-shrink-0">
                                            <div class="symbol-label">
                                                <img src="../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/015-telegram.svg" class="h-50" alt="">
                                            </div>
                                        </div>
                                        <!--end::Symbol-->
                                        <!--begin::Title-->
                                        <div>
                                            <a href="#" class="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Top Sales</a>
                                            <div class="font-size-sm text-muted font-weight-bold mt-1">PitStop Emails</div>
                                        </div>
                                        <!--end::Title-->
                                    </div>
                                    <!--end::Section-->
                                    <!--begin::Label-->
                                    <div class="label label-light label-inline font-weight-bold text-dark-50 py-4 px-3 font-size-base">+82$</div>
                                    <!--end::Label-->
                                </div>
                                <!--end::Widget Item-->
                                <!--begin::Widget Item-->
                                <div class="d-flex align-items-center justify-content-between">
                                    <!--begin::Section-->
                                    <div class="d-flex align-items-center mr-2">
                                        <!--begin::Symbol-->
                                        <div class="symbol symbol-50 symbol-light mr-3 flex-shrink-0">
                                            <div class="symbol-label">
                                                <img src="../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/003-puzzle.svg" class="h-50" alt="">
                                            </div>
                                        </div>
                                        <!--end::Symbol-->
                                        <!--begin::Title-->
                                        <div>
                                            <a href="#" class="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Top Engagement</a>
                                            <div class="font-size-sm text-muted font-weight-bold mt-1">KT.com</div>
                                        </div>
                                        <!--end::Title-->
                                    </div>
                                    <!--end::Section-->
                                    <!--begin::Label-->
                                    <div class="label label-light label-inline font-weight-bold text-dark-50 py-4 px-3 font-size-base">+82$</div>
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
                            <h3 class="card-title font-weight-bolder">Action Needed</h3>
                            <div class="card-toolbar">
                                <div class="dropdown dropdown-inline">
                                    <a href="#" class="btn btn-clean btn-sm btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="ki ki-bold-more-hor"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-md dropdown-menu-right">
                                        <!--begin::Navigation-->
                                        <ul class="navi navi-hover py-5">
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon">
                                                        <i class="flaticon2-drop"></i>
                                                    </span>
                                                    <span class="navi-text">New Group</span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon">
                                                        <i class="flaticon2-list-3"></i>
                                                    </span>
                                                    <span class="navi-text">Contacts</span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon">
                                                        <i class="flaticon2-rocket-1"></i>
                                                    </span>
                                                    <span class="navi-text">Groups</span>
                                                    <span class="navi-link-badge">
                                                        <span class="label label-light-primary label-inline font-weight-bold">new</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon">
                                                        <i class="flaticon2-bell-2"></i>
                                                    </span>
                                                    <span class="navi-text">Calls</span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon">
                                                        <i class="flaticon2-gear"></i>
                                                    </span>
                                                    <span class="navi-text">Settings</span>
                                                </a>
                                            </li>
                                            <li class="navi-separator my-3"></li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon">
                                                        <i class="flaticon2-magnifier-tool"></i>
                                                    </span>
                                                    <span class="navi-text">Help</span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon">
                                                        <i class="flaticon2-bell-2"></i>
                                                    </span>
                                                    <span class="navi-text">Privacy</span>
                                                    <span class="navi-link-badge">
                                                        <span class="label label-light-danger label-rounded font-weight-bold">5</span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                        <!--end::Navigation-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--end::Header-->
                        <!--begin::Body-->
                        <div class="card-body d-flex flex-column">
                            <div class="flex-grow-1" style="position: relative;">
                                <div id="kt_mixed_widget_14_chart" style="height: 200px; min-height: 200.7px;"><div id="apexchartsvxf5m1n3" class="apexcharts-canvas apexchartsvxf5m1n3 apexcharts-theme-light" style="width: 236px; height: 200.7px;"><svg id="SvgjsSvg4882" width="236" height="200.7" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" class="apexcharts-svg" xmlns:data="ApexChartsNS" transform="translate(0, 0)" style="background: transparent;"><g id="SvgjsG4884" class="apexcharts-inner apexcharts-graphical" transform="translate(31, 0)"><defs id="SvgjsDefs4883"><clipPath id="gridRectMaskvxf5m1n3"><rect id="SvgjsRect4886" width="182" height="200" x="-3" y="-1" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="gridRectMarkerMaskvxf5m1n3"><rect id="SvgjsRect4887" width="180" height="202" x="-2" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath></defs><g id="SvgjsG4889" class="apexcharts-radialbar"><g id="SvgjsG4890"><g id="SvgjsG4891" class="apexcharts-tracks"><g id="SvgjsG4892" class="apexcharts-radialbar-track apexcharts-track" rel="1"><path id="apexcharts-radialbarTrack-0" d="M 88 29.693292682926824 A 69.30670731707318 69.30670731707318 0 1 1 87.9879036976974 29.69329373852834" fill="none" fill-opacity="1" stroke="rgba(201,247,245,0.85)" stroke-opacity="1" stroke-linecap="round" stroke-width="10.852439024390247" stroke-dasharray="0" class="apexcharts-radialbar-area" data:pathOrig="M 88 29.693292682926824 A 69.30670731707318 69.30670731707318 0 1 1 87.9879036976974 29.69329373852834"></path></g></g><g id="SvgjsG4894"><g id="SvgjsG4898" class="apexcharts-series apexcharts-radial-series" seriesName="Progress" rel="1" data:realIndex="0"><path id="SvgjsPath4899" d="M 88 29.693292682926824 A 69.30670731707318 69.30670731707318 0 1 1 18.862120338608293 103.8345915092552" fill="none" fill-opacity="0.85" stroke="rgba(27,197,189,0.85)" stroke-opacity="1" stroke-linecap="round" stroke-width="10.852439024390247" stroke-dasharray="0" class="apexcharts-radialbar-area apexcharts-radialbar-slice-0" data:angle="266" data:value="74" index="0" j="0" data:pathOrig="M 88 29.693292682926824 A 69.30670731707318 69.30670731707318 0 1 1 18.862120338608293 103.8345915092552"></path></g><circle id="SvgjsCircle4895" r="63.88048780487805" cx="88" cy="99" class="apexcharts-radialbar-hollow" fill="transparent"></circle><g id="SvgjsG4896" class="apexcharts-datalabels-group" transform="translate(0, 0) scale(1)" style="opacity: 1;"><text id="SvgjsText4897" font-family="Helvetica, Arial, sans-serif" x="88" y="111" text-anchor="middle" dominant-baseline="auto" font-size="30px" font-weight="700" fill="#464e5f" class="apexcharts-text apexcharts-datalabel-value" style="font-family: Helvetica, Arial, sans-serif;">74%</text></g></g></g></g><line id="SvgjsLine4900" x1="0" y1="0" x2="176" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1" class="apexcharts-ycrosshairs"></line><line id="SvgjsLine4901" x1="0" y1="0" x2="176" y2="0" stroke-dasharray="0" stroke-width="0" class="apexcharts-ycrosshairs-hidden"></line></g><g id="SvgjsG4885" class="apexcharts-annotations"></g></svg><div class="apexcharts-legend"></div></div></div>
                            <div class="resize-triggers"><div class="expand-trigger"><div style="width: 237px; height: 202px;"></div></div><div class="contract-trigger"></div></div></div>
                            <div class="pt-5">
                                <p class="text-center font-weight-normal font-size-lg pb-7">Notes: Current sprint requires stakeholders
                                <br>to approve newly amended policies</p>
                                <a href="#" class="btn btn-success btn-shadow-hover font-weight-bolder w-100 py-3">Generate Report</a>
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
                        <span class="card-label font-weight-bolder text-dark">New Arrivals</span>
                        <span class="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span>
                    </h3>
                    <div class="card-toolbar">
                        <a href="#" class="btn btn-success font-weight-bolder font-size-sm">
                            <span class="svg-icon svg-icon-md svg-icon-white">
                                <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Communication/Add-user.svg-->
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                        <path d="M18,8 L16,8 C15.4477153,8 15,7.55228475 15,7 C15,6.44771525 15.4477153,6 16,6 L18,6 L18,4 C18,3.44771525 18.4477153,3 19,3 C19.5522847,3 20,3.44771525 20,4 L20,6 L22,6 C22.5522847,6 23,6.44771525 23,7 C23,7.55228475 22.5522847,8 22,8 L20,8 L20,10 C20,10.5522847 19.5522847,11 19,11 C18.4477153,11 18,10.5522847 18,10 L18,8 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                        <path d="M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero"></path>
                                    </g>
                                </svg>
                                <!--end::Svg Icon-->
                            </span>Add New Member</a>
                    </div>
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
                                        <span class="text-dark-75">products</span>
                                    </th>
                                    <th style="min-width: 130px">price</th>
                                    <th style="min-width: 120px">deposit</th>
                                    <th style="min-width: 120px">agent</th>
                                    <th style="min-width: 110px">status</th>
                                    <th style="min-width: 110px"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="pl-0 py-8">
                                        <div class="d-flex align-items-center">
                                            <div class="symbol symbol-50 flex-shrink-0 mr-4">
                                                <div class="symbol-label" style="background-image: url('../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/stock-600x400/img-26.jpg')"></div>
                                            </div>
                                            <div>
                                                <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Sant Extreanet Solution</a>
                                                <span class="text-muted font-weight-bold d-block">HTML, JS, ReactJS</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$2,790</span>
                                        <span class="text-muted font-weight-bold">Paid</span>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$520</span>
                                        <span class="text-muted font-weight-bold">Paid</span>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">Bradly Beal</span>
                                        <span class="text-muted font-weight-bold">Insurance</span>
                                    </td>
                                    <td>
                                        <span class="label label-lg label-light-primary label-inline">Approved</span>
                                    </td>
                                    <td class="pr-0 text-right">
                                        <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mr-3">
                                            <span class="svg-icon svg-icon-md svg-icon-primary">
                                                <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Bookmark.svg-->
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="24" height="24"></rect>
                                                        <path d="M8,4 L16,4 C17.1045695,4 18,4.8954305 18,6 L18,17.726765 C18,18.2790497 17.5522847,18.726765 17,18.726765 C16.7498083,18.726765 16.5087052,18.6329798 16.3242754,18.4639191 L12.6757246,15.1194142 C12.2934034,14.7689531 11.7065966,14.7689531 11.3242754,15.1194142 L7.67572463,18.4639191 C7.26860564,18.8371115 6.63603827,18.8096086 6.26284586,18.4024896 C6.09378519,18.2180598 6,17.9769566 6,17.726765 L6,6 C6,4.8954305 6.8954305,4 8,4 Z" fill="#000000"></path>
                                                    </g>
                                                </svg>
                                                <!--end::Svg Icon-->
                                            </span>
                                        </a>
                                        <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                            <span class="svg-icon svg-icon-md svg-icon-primary">
                                                <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Navigation/Arrow-right.svg-->
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                                        <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                        <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"></path>
                                                    </g>
                                                </svg>
                                                <!--end::Svg Icon-->
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pl-0 py-0">
                                        <div class="d-flex align-items-center">
                                            <div class="symbol symbol-50 flex-shrink-0 mr-4">
                                                <div class="symbol-label" style="background-image: url('../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/stock-600x400/img-3.jpg')"></div>
                                            </div>
                                            <div>
                                                <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Telegram Development</a>
                                                <span class="text-muted font-weight-bold d-block">C#, ASP.NET, MS SQL</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$4,600</span>
                                        <span class="text-muted font-weight-bold">Pending</span>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$1,600</span>
                                        <span class="text-muted font-weight-bold">Rejected</span>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">Chris Thompson</span>
                                        <span class="text-muted font-weight-bold">NBA Player</span>
                                    </td>
                                    <td>
                                        <span class="label label-lg label-light-warning label-inline">In Progress</span>
                                    </td>
                                    <td class="pr-0 text-right">
                                        <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mr-3">
                                            <span class="svg-icon svg-icon-md svg-icon-primary">
                                                <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Bookmark.svg-->
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="24" height="24"></rect>
                                                        <path d="M8,4 L16,4 C17.1045695,4 18,4.8954305 18,6 L18,17.726765 C18,18.2790497 17.5522847,18.726765 17,18.726765 C16.7498083,18.726765 16.5087052,18.6329798 16.3242754,18.4639191 L12.6757246,15.1194142 C12.2934034,14.7689531 11.7065966,14.7689531 11.3242754,15.1194142 L7.67572463,18.4639191 C7.26860564,18.8371115 6.63603827,18.8096086 6.26284586,18.4024896 C6.09378519,18.2180598 6,17.9769566 6,17.726765 L6,6 C6,4.8954305 6.8954305,4 8,4 Z" fill="#000000"></path>
                                                    </g>
                                                </svg>
                                                <!--end::Svg Icon-->
                                            </span>
                                        </a>
                                        <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                            <span class="svg-icon svg-icon-md svg-icon-primary">
                                                <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Navigation/Arrow-right.svg-->
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                                        <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                        <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"></path>
                                                    </g>
                                                </svg>
                                                <!--end::Svg Icon-->
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pl-0 py-8">
                                        <div class="d-flex align-items-center">
                                            <div class="symbol symbol-50 flex-shrink-0 mr-4">
                                                <div class="symbol-label" style="background-image: url('../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/stock-600x400/img-5.jpg')"></div>
                                            </div>
                                            <div>
                                                <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Payrol Application</a>
                                                <span class="text-muted font-weight-bold d-block">PHP, Laravel, VueJS</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$23,800</span>
                                        <span class="text-muted font-weight-bold">Paid</span>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$6,700</span>
                                        <span class="text-muted font-weight-bold">Paid</span>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">Zoey McGee</span>
                                        <span class="text-muted font-weight-bold">Ruby Developer</span>
                                    </td>
                                    <td>
                                        <span class="label label-lg label-light-success label-inline">Success</span>
                                    </td>
                                    <td class="pr-0 text-right">
                                        <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mr-3">
                                            <span class="svg-icon svg-icon-md svg-icon-primary">
                                                <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Bookmark.svg-->
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="24" height="24"></rect>
                                                        <path d="M8,4 L16,4 C17.1045695,4 18,4.8954305 18,6 L18,17.726765 C18,18.2790497 17.5522847,18.726765 17,18.726765 C16.7498083,18.726765 16.5087052,18.6329798 16.3242754,18.4639191 L12.6757246,15.1194142 C12.2934034,14.7689531 11.7065966,14.7689531 11.3242754,15.1194142 L7.67572463,18.4639191 C7.26860564,18.8371115 6.63603827,18.8096086 6.26284586,18.4024896 C6.09378519,18.2180598 6,17.9769566 6,17.726765 L6,6 C6,4.8954305 6.8954305,4 8,4 Z" fill="#000000"></path>
                                                    </g>
                                                </svg>
                                                <!--end::Svg Icon-->
                                            </span>
                                        </a>
                                        <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                            <span class="svg-icon svg-icon-md svg-icon-primary">
                                                <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Navigation/Arrow-right.svg-->
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                                        <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                        <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"></path>
                                                    </g>
                                                </svg>
                                                <!--end::Svg Icon-->
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="pl-0 py-0">
                                        <div class="d-flex align-items-center">
                                            <div class="symbol symbol-50 flex-shrink-0 mr-4">
                                                <div class="symbol-label" style="background-image: url('../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/stock-600x400/img-18.jpg')"></div>
                                            </div>
                                            <div>
                                                <a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">HR Management System</a>
                                                <span class="text-muted font-weight-bold d-block">Python, PostgreSQL, ReactJS</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$57,000</span>
                                        <span class="text-muted font-weight-bold">Paid</span>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$14,000</span>
                                        <span class="text-muted font-weight-bold">Paid</span>
                                    </td>
                                    <td>
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">Brandon Ingram</span>
                                        <span class="text-muted font-weight-bold">NBA Player</span>
                                    </td>
                                    <td>
                                        <span class="label label-lg label-light-danger label-inline">Rejected</span>
                                    </td>
                                    <td class="pr-0 text-right">
                                        <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mr-3">
                                            <span class="svg-icon svg-icon-md svg-icon-primary">
                                                <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Bookmark.svg-->
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="24" height="24"></rect>
                                                        <path d="M8,4 L16,4 C17.1045695,4 18,4.8954305 18,6 L18,17.726765 C18,18.2790497 17.5522847,18.726765 17,18.726765 C16.7498083,18.726765 16.5087052,18.6329798 16.3242754,18.4639191 L12.6757246,15.1194142 C12.2934034,14.7689531 11.7065966,14.7689531 11.3242754,15.1194142 L7.67572463,18.4639191 C7.26860564,18.8371115 6.63603827,18.8096086 6.26284586,18.4024896 C6.09378519,18.2180598 6,17.9769566 6,17.726765 L6,6 C6,4.8954305 6.8954305,4 8,4 Z" fill="#000000"></path>
                                                    </g>
                                                </svg>
                                                <!--end::Svg Icon-->
                                            </span>
                                        </a>
                                        <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                            <span class="svg-icon svg-icon-md svg-icon-primary">
                                                <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Navigation/Arrow-right.svg-->
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                                        <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                        <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"></path>
                                                    </g>
                                                </svg>
                                                <!--end::Svg Icon-->
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
    </script>
@endsection
