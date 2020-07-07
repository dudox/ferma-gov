
@extends('layouts.dashboard')
@section('title','Roads')
@section('road_a','menu-item-here')
@section('styles')
    <link rel="stylesheet" href="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/plugins/custom/datatables/datatables.bundle.css?v=7.0.5">
    <link rel="stylesheet" href="https://rawgit.com/LeshikJanz/libraries/master/Bootstrap/baguetteBox.min.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">

@endsection
@section('content')

<style>
    .container.gallery-container {
    background-color: #fff;
    color: #35373a;
    padding: 30px 50px;
}

.gallery-container h1 {
    text-align: center;
    margin-top: 50px;
    font-family: 'Droid Sans', sans-serif;
    font-weight: bold;
}

.gallery-container p.page-description {
    text-align: center;
    margin: 25px auto;
    font-size: 18px;
    color: #999;
}

.tz-gallery {
    padding: 0px;
}

/* Override bootstrap column paddings */
.tz-gallery .row > div {
    padding: 2px;
}

.tz-gallery .lightbox img {
    width: 200px !important;
    height: 100px !important;
    border-radius: 0;
    position: relative;
}

.tz-gallery .lightbox:before {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -13px;
    margin-left: -13px;
    opacity: 0;
    color: #fff;
    font-size: 26px;
    font-family: 'FontAwesome';
    content: '\f002';
    pointer-events: none;
    z-index: 9000;
    transition: 0.4s;
}


.tz-gallery .lightbox:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(46, 132, 206, 0.7);
    content: '';
    transition: 0.4s;
}

.tz-gallery .lightbox:hover:after,
.tz-gallery .lightbox:hover:before {
    opacity: 1;
}

.baguetteBox-button {
    background-color: transparent !important;
}

@media(max-width: 768px) {
    body {
        padding: 0;
    }
}
</style>
<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <!--begin::Subheader-->
    <div class="subheader py-2 py-lg-4 subheader-transparent" id="kt_subheader">
        <div class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <!--begin::Info-->
            <div class="d-flex align-items-center flex-wrap mr-1">
                <!--begin::Page Heading-->
                <div class="d-flex align-items-baseline flex-wrap mr-5">
                    <h5 class="text-dark font-weight-bold my-1 mr-5">Roads</h5>
                    <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
                        <li class="breadcrumb-item">
                            <a href="" class="text-muted">{{$road->name}}</a>
                        </li>
                    </ul>
                </div>
            </div>

            <!--end::Toolbar-->
        </div>
    </div>
    <!--end::Subheader-->
    <!--begin::Entry-->
    <div class="d-flex flex-column-fluid">
        <!--begin::Container-->
        <div class="container">
            <!--begin::Card-->
            <div class="card card-custom gutter-b">
                <div class="card-body">
                    <!--begin::Details-->
                    <div class="d-flex mb-9">
                        <!--begin: Pic-->
                        <div class="flex-shrink-0 mr-7 mt-lg-0 mt-3">
                            <div class="symbol symbol-50 symbol-lg-120">
                                <img src="{{ asset('dash/img/road.png') }}" alt="image">
                            </div>
                            <div class="symbol symbol-50 symbol-lg-120 symbol-primary d-none">
                                <span class="font-size-h3 symbol-label font-weight-boldest">JM</span>
                            </div>
                        </div>
                        <!--end::Pic-->
                        <!--begin::Info-->
                        <div class="flex-grow-1">
                            <!--begin::Title-->
                            <div class="d-flex justify-content-between flex-wrap mt-1">
                                <div class="d-flex mr-3">
                                    <a href="#" class="text-dark-75 text-hover-primary font-size-h5 font-weight-bold mr-3">{{ ucfirst($road->name) }}</a>
                                    <a href="#">
                                        <i class="fa fa-check-circle text-success fa-sm"></i>
                                    </a>
                                </div>
                                <div class="my-lg-0 my-3">
                                    <a href="#" class="btn btn-sm btn-primary font-weight-bolder text-uppercase" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-cog"></i> Option</a>
                                </div>
                            </div>
                            <!--end::Title-->
                            <!--begin::Content-->
                            <div class="d-flex flex-wrap justify-content-between mt-1">
                                <div class="d-flex flex-column flex-grow-1 pr-8">
                                    <div class="d-flex flex-wrap mb-4">
                                        <a href="#" class="text-dark-50 text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                                        <i class="fa fa-home mr-2 font-size-lg"></i><span class="text-primary"><u>LGA:</u></span> {{ ucfirst($local->local_name) }}</a>
                                        <a href="#" class="text-dark-50 text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                                        <i class="fa fa-building mr-2 font-size-lg"></i><span class="text-primary"><u>Location:</u></span> {{ $state->name }}</a>
                                        <a href="#" class="text-dark-50 text-hover-primary font-weight-bold">
                                        <i class="fa fa-globe mr-2 font-size-lg"></i><span class="text-primary"><u>Region:</u></span> {{ ucfirst($region->zone) }}</a>
                                    </div>
                                    <div class="d-flex align-items-center w-100 flex-fill float-right mt-lg-12">
                                        <span class="font-weight-bold text-dark-75 w-25">Road Health</span>
                                        <div class="progress progress-xs  mx-3 w-100">
                                            <div class="progress-bar bg-{{ $health[1] }}" role="progressbar" style="width: {{$health[0]}}%" aria-valuenow="{{$health[0]}}" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <span class="font-weight-bold text-dark-75 w-50">{{$health[0]}}%</span>
                                    </div>
                                    <span>Analysis above shows the heath status of <span class="font-weight-bold">{{ ucfirst($road->name) }}</span> Rd based on the number of reports <br>within a specific period of time has <span class="font-weight-bolder text-{{ $health[1] }}">{{ ucfirst($health[2]) }}</span></span>
                                </div>

                                <div class="d-flex align-items-center w-25 flex-fill float-right mt-lg-12 mt-8">
                                    <span class="font-weight-bold text-dark-75">Progress</span>
                                    <div class="progress progress-xs mx-3 w-100">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: 63%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <span class="font-weight-bolder text-dark">78%</span>
                                </div>
                            </div>
                            <!--end::Content-->
                        </div>
                        <!--end::Info-->
                    </div>
                    <!--end::Details-->
                    <div class="separator separator-solid"></div>
                    <!--begin::Items-->
                    <div class="d-flex align-items-center flex-wrap mt-8">
                        <!--begin::Item-->
                        <div class="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                            <span class="mr-4">
                                <i class="fa fa-life-ring display-4 text-muted font-weight-bold"></i>
                            </span>
                            <div class="d-flex flex-column text-dark-75">
                                <span class="font-weight-bolder font-size-sm">Construction Status</span>
                                <span class="font-weight-bolder font-size-h5">
                                <span class="label label-lg label-light-{{ $road->progress->color_code}} label-inline">{{ $road->progress->name }}</span></span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                            <span class="mr-4">
                                <i class="fa fa-heart display-4  font-weight-bold"></i>
                            </span>
                            <div class="d-flex flex-column text-dark-75">
                                <span class="font-weight-bolder font-size-sm">Road Health</span>
                                <span class="font-weight-bolder font-size-h5">
                                    <span class="label label-lg label-light-{{ $health[1]}} label-inline font-weight-bold">{{ ucfirst($health[2]) }}</span></span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                            <span class="mr-4">
                                <i class="fa fa-id-card display-4 text-muted font-weight-bold"></i>
                            </span>
                            <div class="d-flex flex-column flex-lg-fill">
                                <span class="text-dark-75 font-weight-bolder font-size-sm">{{ count($reports) }} Reports</span>
                                <a href="#" class="text-primary font-weight-bolder">View</a>
                            </div>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                            <span class="mr-4">
                                <i class="fa fa-id-badge display-4 text-muted font-weight-bold"></i>
                            </span>
                            <div class="d-flex flex-column">
                                <span class="text-dark-75 font-weight-bolder font-size-sm">{{ count($users) }} Reported Users</span>
                                <a href="#" class="text-primary font-weight-bolder">View</a>
                            </div>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center justify-content-end flex-lg-fill mb-2 float-right">
                            <span class="mr-4">
                                <i class="fa fa-image display-4 text-muted font-weight-bold"></i>
                            </span>
                            <div class="symbol-group symbol-hover">
                                @foreach ($reports->take(5) as $item)
                                <div class="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="{{ $item->roads->name }}">
                                    <img alt="Pic" src="{{ asset($item->images) }}">
                                </div>
                                @endforeach
                                <div class="symbol symbol-30 symbol-circle symbol-light">
                                    <span class="symbol-label font-weight-bold">{{ count($reports) }}+</span>
                                </div>
                            </div>
                        </div>
                        <!--end::Item-->
                    </div>
                    <!--begin::Items-->
                </div>
            </div>
            <!--end::Card-->
            <!--begin::Row-->
            <div class="row">
                <div class="col-lg-8">
                    <!--begin::Advance Table Widget 2-->
                    <div class="card card-custom card-stretch gutter-b">
                        <!--begin::Header-->
                        <div class="card-header border-0 pt-5">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="card-label font-weight-bolder text-dark">Reports</span>
                                <span class="text-muted mt-3 font-weight-bold font-size-sm">More than {{count($reports)}}+ new reports</span>
                            </h3>
                        </div>
                        <!--end::Header-->
                        <!--begin::Body-->
                        <div class="card-body pt-3 pb-0">
                            <!--begin::Table-->
                            <div class="table-responsive">
                                <table class="table table-borderless table-vertical-center">
                                    <thead>
                                        <tr>
                                            <th class="p-0" style="width: 50px"></th>
                                            <th class="p-0" style="min-width: 200px"></th>
                                            <th class="p-0" style="min-width: 100px"></th>
                                            <th class="p-0" style="min-width: 110px"></th>
                                            <th class="p-0" style="min-width: 150px"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($reports as $item)
                                        <tr>
                                            <td class="pl-0 py-2">
                                                <div class="symbol symbol-50 symbol-light mr-1">
                                                    <span class="symbol-label">
                                                        <img src="{{ asset($item->images) }}" class="h-50 align-self-center" alt="">
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{{ $item->name }}</a>
                                                <div>
                                                    <span class="font-weight-bolder">Phone:</span>
                                                    <a class="text-muted font-weight-bold text-hover-primary" href="#">{{ $item->phone }}</a>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-dark-75 font-weight-bolder d-block font-size-lg">{{ $item->zones->zone }}</span>
                                                <span class="text-muted font-weight-bold">{{$item->states->name}}</span>
                                            </td>

                                            <td class="text-right">
                                                <span class="label label-lg label-light-primary label-inline">{{ ucfirst($item->locals->local_name) }}</span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <span class="label label-lg label-light-primary label-inline">{{ date('d M, Y', strtotime($item->created_at)) }}</span>
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
                    <!--end::Advance Table Widget 2-->
                </div>
                <div class="col-lg-4">
                    <!--begin::Mixed Widget 14-->
                    <div class="card card-custom card-stretch gutter-b">
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
                                <div id="kt_mixed_widget_14_chart" style="height: 200px; min-height: 200.7px;"><div id="apexchartstg1hb2yv" class="apexcharts-canvas apexchartstg1hb2yv apexcharts-theme-light" style="width: 276px; height: 200.7px;"><svg id="SvgjsSvg1102" width="276" height="200.7" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" class="apexcharts-svg" xmlns:data="ApexChartsNS" transform="translate(0, 0)" style="background: transparent;"><g id="SvgjsG1104" class="apexcharts-inner apexcharts-graphical" transform="translate(51, 0)"><defs id="SvgjsDefs1103"><clipPath id="gridRectMasktg1hb2yv"><rect id="SvgjsRect1106" width="182" height="200" x="-3" y="-1" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="gridRectMarkerMasktg1hb2yv"><rect id="SvgjsRect1107" width="180" height="202" x="-2" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath></defs><g id="SvgjsG1109" class="apexcharts-radialbar"><g id="SvgjsG1110"><g id="SvgjsG1111" class="apexcharts-tracks"><g id="SvgjsG1112" class="apexcharts-radialbar-track apexcharts-track" rel="1"><path id="apexcharts-radialbarTrack-0" d="M 88 29.693292682926824 A 69.30670731707318 69.30670731707318 0 1 1 87.9879036976974 29.69329373852834" fill="none" fill-opacity="1" stroke="rgba(201,247,245,0.85)" stroke-opacity="1" stroke-linecap="round" stroke-width="10.852439024390247" stroke-dasharray="0" class="apexcharts-radialbar-area" data:pathOrig="M 88 29.693292682926824 A 69.30670731707318 69.30670731707318 0 1 1 87.9879036976974 29.69329373852834"></path></g></g><g id="SvgjsG1114"><g id="SvgjsG1118" class="apexcharts-series apexcharts-radial-series" seriesName="Progress" rel="1" data:realIndex="0"><path id="SvgjsPath1119" d="M 88 29.693292682926824 A 69.30670731707318 69.30670731707318 0 1 1 18.862120338608293 103.8345915092552" fill="none" fill-opacity="0.85" stroke="rgba(27,197,189,0.85)" stroke-opacity="1" stroke-linecap="round" stroke-width="10.852439024390247" stroke-dasharray="0" class="apexcharts-radialbar-area apexcharts-radialbar-slice-0" data:angle="266" data:value="74" index="0" j="0" data:pathOrig="M 88 29.693292682926824 A 69.30670731707318 69.30670731707318 0 1 1 18.862120338608293 103.8345915092552"></path></g><circle id="SvgjsCircle1115" r="63.88048780487805" cx="88" cy="99" class="apexcharts-radialbar-hollow" fill="transparent"></circle><g id="SvgjsG1116" class="apexcharts-datalabels-group" transform="translate(0, 0) scale(1)" style="opacity: 1;"><text id="SvgjsText1117" font-family="Helvetica, Arial, sans-serif" x="88" y="111" text-anchor="middle" dominant-baseline="auto" font-size="30px" font-weight="700" fill="#464e5f" class="apexcharts-text apexcharts-datalabel-value" style="font-family: Helvetica, Arial, sans-serif;">74%</text></g></g></g></g><line id="SvgjsLine1120" x1="0" y1="0" x2="176" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1" class="apexcharts-ycrosshairs"></line><line id="SvgjsLine1121" x1="0" y1="0" x2="176" y2="0" stroke-dasharray="0" stroke-width="0" class="apexcharts-ycrosshairs-hidden"></line></g><g id="SvgjsG1105" class="apexcharts-annotations"></g></svg><div class="apexcharts-legend"></div></div></div>
                            <div class="resize-triggers"><div class="expand-trigger"><div style="width: 277px; height: 202px;"></div></div><div class="contract-trigger"></div></div></div>
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
            <div class="row">
                <div class="col-lg-6">
                    <div class="card card-custom card-stretch gutter-b">
                        <div class="card-header h-auto border-0">
                            <div class="card-title py-5">
                                <h3 class="card-label">
                                    <span class="d-block text-dark font-weight-bolder">Reports Analysis</span>
                                    <span class="d-block text-muted mt-2 font-size-sm">More than {{ count($reports) }}+ reports</span>
                                </h3>
                            </div>
                        </div>
                        <div class="card-body" style="position: relative;">
                            <div id="kt_charts_widget_4_chart" data-chart="{{ json_encode($monthly) }}"></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card card-custom card-stretch gutter-b">
                        <div class="card-header border-0">
                            <h3 class="card-title font-weight-bolder text-dark">Photos of roads</h3>

                        </div>
                        <div class="card-body pt-0">
                            <div class="container gallery-container px-3">
                                <div class="tz-gallery px-0">
                                    <div class="row">
                                        @php
                                            $rounds = 0
                                        @endphp
                                        @foreach ($images as $key => $item)
                                            <div class=" col-4">
                                                <a class="lightbox" href="{{ asset($item->images) }}">
                                                    <img src="{{ asset($item->images) }}" alt="{{ $item->name }}" class="img-fluid" >
                                                </a>
                                            </div>
                                        @endforeach
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModalCenter" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Change Road status</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" class="fa fa-close"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="responseMessage"></div>
                    </div>
                    <div class="col-md-8">
                        <form class="form" id="roadSelect">
                            <div class="form-group row">
                                <label class="col-6 col-form-label font-weight-bold float-right text-right">Work In Progress</label>
                                <div class="col-6">
                                    <span class="switch switch-lg">
                                        <label>
                                            <input type="checkbox"  name="select" class="select" value="2" data-id="{{ json_encode($road->id) }}" @if($road->status == 2) checked @endif/>
                                            <span></span>
                                        </label>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-6 col-form-label font-weight-bold text-right">Completed</label>
                                <div class="col-6">
                                    <span class="switch switch-lg">
                                        <label>
                                            <input type="checkbox"  name="select1" value="3" data-id="{{ json_encode($road->id) }}" class="select" @if($road->status == 3) checked @endif/>
                                            <span></span>
                                        </label>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
@section('scripts')
    <script>
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
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'][mon - 1];
        }
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.8.1/baguetteBox.min.js"></script>
    <script>
        baguetteBox.run('.tz-gallery');
        $('.select').on('change', function() {
            $('.select').not(this).prop('checked', false);
            let data = {};
            data.status =  $(this).val();
            data.id = $(this).data('id');
            $.ajax({
                type: 'POST',
                url: 'switch',
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
    </script>


@endsection
