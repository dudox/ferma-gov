
@extends('layouts.dashboard')
@section('title','Roads')
@section('road_a','menu-item-here')
@section('styles')
    <link rel="stylesheet" href="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/plugins/custom/datatables/datatables.bundle.css?v=7.0.5">
@endsection
@section('content')


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
                                <img src="../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/users/300_1.jpg" alt="image">
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
                                    <a href="#" class="btn btn-sm btn-light-success font-weight-bolder text-uppercase mr-3">ask</a>
                                    <a href="#" class="btn btn-sm btn-info font-weight-bolder text-uppercase">hire</a>
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
                                        <i class="flaticon2-placeholder mr-2 font-size-lg"></i><span class="text-primary"><u>Region:</u></span> {{ ucfirst($region->zone) }}</a>
                                    </div>
                                    <span class="font-weight-bold text-dark-75">Road Health</span>
                                    <div class="progress progress-xs">
                                        <div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div class="progress-bar bg-info" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
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
                                <i class="flaticon-piggy-bank display-4 text-muted font-weight-bold"></i>
                            </span>
                            <div class="d-flex flex-column text-dark-75">
                                <span class="font-weight-bolder font-size-sm">Earnings</span>
                                <span class="font-weight-bolder font-size-h5">
                                <span class="text-dark-50 font-weight-bold">$</span>249,500</span>
                            </div>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                            <span class="mr-4">
                                <i class="flaticon-confetti display-4 text-muted font-weight-bold"></i>
                            </span>
                            <div class="d-flex flex-column text-dark-75">
                                <span class="font-weight-bolder font-size-sm">Expenses</span>
                                <span class="font-weight-bolder font-size-h5">
                                <span class="text-dark-50 font-weight-bold">$</span>164,700</span>
                            </div>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                            <span class="mr-4">
                                <i class="flaticon-pie-chart display-4 text-muted font-weight-bold"></i>
                            </span>
                            <div class="d-flex flex-column text-dark-75">
                                <span class="font-weight-bolder font-size-sm">Net</span>
                                <span class="font-weight-bolder font-size-h5">
                                <span class="text-dark-50 font-weight-bold">$</span>782,300</span>
                            </div>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                            <span class="mr-4">
                                <i class="flaticon-file-2 display-4 text-muted font-weight-bold"></i>
                            </span>
                            <div class="d-flex flex-column flex-lg-fill">
                                <span class="text-dark-75 font-weight-bolder font-size-sm">73 Tasks</span>
                                <a href="#" class="text-primary font-weight-bolder">View</a>
                            </div>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center flex-lg-fill mr-5 mb-2">
                            <span class="mr-4">
                                <i class="flaticon-chat-1 display-4 text-muted font-weight-bold"></i>
                            </span>
                            <div class="d-flex flex-column">
                                <span class="text-dark-75 font-weight-bolder font-size-sm">648 Comments</span>
                                <a href="#" class="text-primary font-weight-bolder">View</a>
                            </div>
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center flex-lg-fill mb-2 float-left">
                            <span class="mr-4">
                                <i class="flaticon-network display-4 text-muted font-weight-bold"></i>
                            </span>
                            <div class="symbol-group symbol-hover">
                                <div class="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="Mark Stone">
                                    <img alt="Pic" src="../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/users/300_25.jpg">
                                </div>
                                <div class="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="Charlie Stone">
                                    <img alt="Pic" src="../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/users/300_19.jpg">
                                </div>
                                <div class="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="Luca Doncic">
                                    <img alt="Pic" src="../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/users/300_22.jpg">
                                </div>
                                <div class="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="Nick Mana">
                                    <img alt="Pic" src="../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/users/300_23.jpg">
                                </div>
                                <div class="symbol symbol-30 symbol-circle" data-toggle="tooltip" title="" data-original-title="Teresa Fox">
                                    <img alt="Pic" src="../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/users/300_18.jpg">
                                </div>
                                <div class="symbol symbol-30 symbol-circle symbol-light">
                                    <span class="symbol-label font-weight-bold">5+</span>
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
                                <span class="card-label font-weight-bolder text-dark">New Arrivals</span>
                                <span class="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span>
                            </h3>
                            <div class="card-toolbar">
                                <ul class="nav nav-pills nav-pills-sm nav-dark-75">
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-4" data-toggle="tab" href="#kt_tab_pane_1_1">Month</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-4" data-toggle="tab" href="#kt_tab_pane_1_2">Week</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-4 active" data-toggle="tab" href="#kt_tab_pane_1_3">Day</a>
                                    </li>
                                </ul>
                            </div>
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
                                            <th class="p-0" style="min-width: 125px"></th>
                                            <th class="p-0" style="min-width: 110px"></th>
                                            <th class="p-0" style="min-width: 150px"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="pl-0 py-4">
                                                <div class="symbol symbol-50 symbol-light mr-1">
                                                    <span class="symbol-label">
                                                        <img src="../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/006-plurk.svg" class="h-50 align-self-center" alt="">
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Sant Outstanding</a>
                                                <div>
                                                    <span class="font-weight-bolder">Email:</span>
                                                    <a class="text-muted font-weight-bold text-hover-primary" href="#">bprow@bnc.cc</a>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$2,000,000</span>
                                                <span class="text-muted font-weight-bold">Paid</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-500">ReactJs, HTML</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="label label-lg label-light-primary label-inline">Approved</span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Settings-1.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000"></path>
                                                                <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Communication/Write.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path>
                                                                <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Trash.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>
                                                                <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pl-0 py-4">
                                                <div class="symbol symbol-50 symbol-light">
                                                    <span class="symbol-label">
                                                        <img src="../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/015-telegram.svg" class="h-50 align-self-center" alt="">
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Application Development</a>
                                                <div>
                                                    <span class="font-weight-bolder">Email:</span>
                                                    <a class="text-muted font-weight-bold text-hover-primary" href="#">app@dev.com</a>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$4,600,000</span>
                                                <span class="text-muted font-weight-bold">Paid</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-500">Python, MySQL</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="label label-lg label-light-warning label-inline">In Progress</span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Settings-1.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000"></path>
                                                                <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Communication/Write.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path>
                                                                <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Trash.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>
                                                                <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pl-0 py-4">
                                                <div class="symbol symbol-50 symbol-light">
                                                    <span class="symbol-label">
                                                        <img src="../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/003-puzzle.svg" class="h-50 align-self-center" alt="">
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Payrol Application</a>
                                                <div>
                                                    <span class="font-weight-bolder">Email:</span>
                                                    <a class="text-muted font-weight-bold text-hover-primary" href="#">company@dev.com</a>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$560,000</span>
                                                <span class="text-muted font-weight-bold">Paid</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-500">Laravel, Metronic</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="label label-lg label-light-success label-inline">Success</span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Settings-1.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000"></path>
                                                                <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Communication/Write.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path>
                                                                <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Trash.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>
                                                                <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pl-0 py-4">
                                                <div class="symbol symbol-50 symbol-light">
                                                    <span class="symbol-label">
                                                        <img src="../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/005-bebo.svg" class="h-50 align-self-center" alt="">
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">HR Management System</a>
                                                <div>
                                                    <span class="font-weight-bolder">Email:</span>
                                                    <a class="text-muted font-weight-bold text-hover-primary" href="#">hr@demo.com</a>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$57,000</span>
                                                <span class="text-muted font-weight-bold">Paid</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-bold">AngularJS, C#</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="label label-lg label-light-danger label-inline">Rejected</span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Settings-1.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000"></path>
                                                                <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Communication/Write.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path>
                                                                <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Trash.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>
                                                                <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pl-0 py-4">
                                                <div class="symbol symbol-50 symbol-light">
                                                    <span class="symbol-label">
                                                        <img src="../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/014-kickstarter.svg" class="h-50 align-self-center" alt="">
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">KTR Mobile Application</a>
                                                <div>
                                                    <span class="font-weight-bolder">Email:</span>
                                                    <a class="text-muted font-weight-bold text-hover-primary" href="#">ktr@demo.com</a>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-dark-75 font-weight-bolder d-block font-size-lg">$45,200,000</span>
                                                <span class="text-muted font-weight-bold">Paid</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-500">ReactJS, Ruby</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="label label-lg label-light-warning label-inline">In Progress</span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Settings-1.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000"></path>
                                                                <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Communication/Write.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path>
                                                                <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon-->
                                                    </span>
                                                </a>
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Trash.svg-->
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                                <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>
                                                                <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
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
            <!--end::Row-->
            <!--begin::Row-->
            <div class="row">
                <div class="col-lg-6">
                    <!--begin::Charts Widget 4-->
                    <div class="card card-custom card-stretch gutter-b">
                        <!--begin::Header-->
                        <div class="card-header h-auto border-0">
                            <div class="card-title py-5">
                                <h3 class="card-label">
                                    <span class="d-block text-dark font-weight-bolder">Recent Orders</span>
                                    <span class="d-block text-muted mt-2 font-size-sm">More than 500+ new orders</span>
                                </h3>
                            </div>
                            <div class="card-toolbar">
                                <ul class="nav nav-pills nav-pills-sm nav-dark-75" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-4" data-toggle="tab" href="#kt_charts_widget_2_chart_tab_1">
                                            <span class="nav-text font-size-sm">Month</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-4" data-toggle="tab" href="#kt_charts_widget_2_chart_tab_2">
                                            <span class="nav-text font-size-sm">Week</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-4 active" data-toggle="tab" href="#kt_charts_widget_2_chart_tab_3">
                                            <span class="nav-text font-size-sm">Day</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--end::Header-->
                        <!--begin::Body-->
                        <div class="card-body" style="position: relative;">
                            <div id="kt_charts_widget_4_chart" style="min-height: 365px;"><div id="apexchartstyxa5u8q" class="apexcharts-canvas apexchartstyxa5u8q apexcharts-theme-light apexcharts-zoomable" style="width: 276px; height: 350px;"><svg id="SvgjsSvg1124" width="276" height="350" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" class="apexcharts-svg" xmlns:data="ApexChartsNS" transform="translate(0, 0)" style="background: transparent;"><g id="SvgjsG1126" class="apexcharts-inner apexcharts-graphical" transform="translate(44.96875, 30)"><defs id="SvgjsDefs1125"><clipPath id="gridRectMasktyxa5u8q"><rect id="SvgjsRect1130" width="229.03125" height="281.46871875" x="-4" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="gridRectMarkerMasktyxa5u8q"><rect id="SvgjsRect1131" width="225.03125" height="281.46871875" x="-2" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath></defs><g id="SvgjsG1144" class="apexcharts-xaxis" transform="translate(0, 0)"><g id="SvgjsG1145" class="apexcharts-xaxis-texts-g" transform="translate(0, -4)"><text id="SvgjsText1147" font-family="Poppins" x="0" y="306.46871875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1148">Feb</tspan><title>Feb</title></text><text id="SvgjsText1150" font-family="Poppins" x="44.20624999999999" y="306.46871875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1151">Mar</tspan><title>Mar</title></text><text id="SvgjsText1153" font-family="Poppins" x="88.4125" y="306.46871875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1154">Apr</tspan><title>Apr</title></text><text id="SvgjsText1156" font-family="Poppins" x="132.61874999999998" y="306.46871875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1157">May</tspan><title>May</title></text><text id="SvgjsText1159" font-family="Poppins" x="176.82499999999996" y="306.46871875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1160">Jun</tspan><title>Jun</title></text><text id="SvgjsText1162" font-family="Poppins" x="221.03124999999997" y="306.46871875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1163">Jul</tspan><title>Jul</title></text></g></g><g id="SvgjsG1178" class="apexcharts-grid"><g id="SvgjsG1179" class="apexcharts-gridlines-horizontal"><line id="SvgjsLine1181" x1="0" y1="0" x2="221.03125" y2="0" stroke="#ecf0f3" stroke-dasharray="4" class="apexcharts-gridline"></line><line id="SvgjsLine1182" x1="0" y1="55.49374375" x2="221.03125" y2="55.49374375" stroke="#ecf0f3" stroke-dasharray="4" class="apexcharts-gridline"></line><line id="SvgjsLine1183" x1="0" y1="110.9874875" x2="221.03125" y2="110.9874875" stroke="#ecf0f3" stroke-dasharray="4" class="apexcharts-gridline"></line><line id="SvgjsLine1184" x1="0" y1="166.48123125" x2="221.03125" y2="166.48123125" stroke="#ecf0f3" stroke-dasharray="4" class="apexcharts-gridline"></line><line id="SvgjsLine1185" x1="0" y1="221.974975" x2="221.03125" y2="221.974975" stroke="#ecf0f3" stroke-dasharray="4" class="apexcharts-gridline"></line><line id="SvgjsLine1186" x1="0" y1="277.46871875" x2="221.03125" y2="277.46871875" stroke="#ecf0f3" stroke-dasharray="4" class="apexcharts-gridline"></line></g><g id="SvgjsG1180" class="apexcharts-gridlines-vertical"></g><line id="SvgjsLine1188" x1="0" y1="277.46871875" x2="221.03125" y2="277.46871875" stroke="transparent" stroke-dasharray="0"></line><line id="SvgjsLine1187" x1="0" y1="1" x2="0" y2="277.46871875" stroke="transparent" stroke-dasharray="0"></line></g><g id="SvgjsG1133" class="apexcharts-area-series apexcharts-plot-series"><g id="SvgjsG1139" class="apexcharts-series" seriesName="Revenue" data:longestSeries="true" rel="2" data:realIndex="1"><path id="SvgjsPath1142" d="M 0 277.46871875L 0 138.73435937500003C 15.472187499999999 138.73435937500003 28.7340625 166.48123125 44.20625 166.48123125C 59.678437499999994 166.48123125 72.94031249999999 27.74687187500001 88.4125 27.74687187500001C 103.8846875 27.74687187500001 117.1465625 221.97497500000003 132.61875 221.97497500000003C 148.0909375 221.97497500000003 161.3528125 194.22810312500002 176.825 194.22810312500002C 192.29718749999998 194.22810312500002 205.5590625 138.73435937500003 221.03125 138.73435937500003C 221.03125 138.73435937500003 221.03125 138.73435937500003 221.03125 277.46871875M 221.03125 138.73435937500003z" fill="rgba(255,168,0,1)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-area" index="1" clip-path="url(#gridRectMasktyxa5u8q)" pathTo="M 0 277.46871875L 0 138.73435937500003C 15.472187499999999 138.73435937500003 28.7340625 166.48123125 44.20625 166.48123125C 59.678437499999994 166.48123125 72.94031249999999 27.74687187500001 88.4125 27.74687187500001C 103.8846875 27.74687187500001 117.1465625 221.97497500000003 132.61875 221.97497500000003C 148.0909375 221.97497500000003 161.3528125 194.22810312500002 176.825 194.22810312500002C 192.29718749999998 194.22810312500002 205.5590625 138.73435937500003 221.03125 138.73435937500003C 221.03125 138.73435937500003 221.03125 138.73435937500003 221.03125 277.46871875M 221.03125 138.73435937500003z" pathFrom="M -1 332.9624625L -1 332.9624625L 44.20625 332.9624625L 88.4125 332.9624625L 132.61875 332.9624625L 176.825 332.9624625L 221.03125 332.9624625"></path><path id="SvgjsPath1143" d="M 0 138.73435937500003C 15.472187499999999 138.73435937500003 28.7340625 166.48123125 44.20625 166.48123125C 59.678437499999994 166.48123125 72.94031249999999 27.74687187500001 88.4125 27.74687187500001C 103.8846875 27.74687187500001 117.1465625 221.97497500000003 132.61875 221.97497500000003C 148.0909375 221.97497500000003 161.3528125 194.22810312500002 176.825 194.22810312500002C 192.29718749999998 194.22810312500002 205.5590625 138.73435937500003 221.03125 138.73435937500003" fill="none" fill-opacity="1" stroke="#ffa800" stroke-opacity="1" stroke-linecap="butt" stroke-width="4" stroke-dasharray="0" class="apexcharts-area" index="1" clip-path="url(#gridRectMasktyxa5u8q)" pathTo="M 0 138.73435937500003C 15.472187499999999 138.73435937500003 28.7340625 166.48123125 44.20625 166.48123125C 59.678437499999994 166.48123125 72.94031249999999 27.74687187500001 88.4125 27.74687187500001C 103.8846875 27.74687187500001 117.1465625 221.97497500000003 132.61875 221.97497500000003C 148.0909375 221.97497500000003 161.3528125 194.22810312500002 176.825 194.22810312500002C 192.29718749999998 194.22810312500002 205.5590625 138.73435937500003 221.03125 138.73435937500003" pathFrom="M -1 332.9624625L -1 332.9624625L 44.20625 332.9624625L 88.4125 332.9624625L 132.61875 332.9624625L 176.825 332.9624625L 221.03125 332.9624625"></path><g id="SvgjsG1140" class="apexcharts-series-markers-wrap" data:realIndex="1"><g class="apexcharts-series-markers"><circle id="SvgjsCircle1197" r="0" cx="0" cy="0" class="apexcharts-marker wko6nnb11 no-pointer-events" stroke="#fff4de" fill="#fff4de" fill-opacity="1" stroke-width="3" stroke-opacity="0.9" default-marker-size="0"></circle></g></g></g><g id="SvgjsG1134" class="apexcharts-series" seriesName="NetxProfit" data:longestSeries="true" rel="1" data:realIndex="0"><path id="SvgjsPath1137" d="M 0 277.46871875L 0 166.48123125C 15.472187499999999 166.48123125 28.7340625 194.22810312500002 44.20625 194.22810312500002C 59.678437499999994 194.22810312500002 72.94031249999999 110.98748750000001 88.4125 110.98748750000001C 103.8846875 110.98748750000001 117.1465625 221.97497500000003 132.61875 221.97497500000003C 148.0909375 221.97497500000003 161.3528125 55.49374375000002 176.825 55.49374375000002C 192.29718749999998 55.49374375000002 205.5590625 166.48123125 221.03125 166.48123125C 221.03125 166.48123125 221.03125 166.48123125 221.03125 277.46871875M 221.03125 166.48123125z" fill="rgba(27,197,189,1)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-area" index="0" clip-path="url(#gridRectMasktyxa5u8q)" pathTo="M 0 277.46871875L 0 166.48123125C 15.472187499999999 166.48123125 28.7340625 194.22810312500002 44.20625 194.22810312500002C 59.678437499999994 194.22810312500002 72.94031249999999 110.98748750000001 88.4125 110.98748750000001C 103.8846875 110.98748750000001 117.1465625 221.97497500000003 132.61875 221.97497500000003C 148.0909375 221.97497500000003 161.3528125 55.49374375000002 176.825 55.49374375000002C 192.29718749999998 55.49374375000002 205.5590625 166.48123125 221.03125 166.48123125C 221.03125 166.48123125 221.03125 166.48123125 221.03125 277.46871875M 221.03125 166.48123125z" pathFrom="M -1 332.9624625L -1 332.9624625L 44.20625 332.9624625L 88.4125 332.9624625L 132.61875 332.9624625L 176.825 332.9624625L 221.03125 332.9624625"></path><path id="SvgjsPath1138" d="M 0 166.48123125C 15.472187499999999 166.48123125 28.7340625 194.22810312500002 44.20625 194.22810312500002C 59.678437499999994 194.22810312500002 72.94031249999999 110.98748750000001 88.4125 110.98748750000001C 103.8846875 110.98748750000001 117.1465625 221.97497500000003 132.61875 221.97497500000003C 148.0909375 221.97497500000003 161.3528125 55.49374375000002 176.825 55.49374375000002C 192.29718749999998 55.49374375000002 205.5590625 166.48123125 221.03125 166.48123125" fill="none" fill-opacity="1" stroke="#1bc5bd" stroke-opacity="1" stroke-linecap="butt" stroke-width="4" stroke-dasharray="0" class="apexcharts-area" index="0" clip-path="url(#gridRectMasktyxa5u8q)" pathTo="M 0 166.48123125C 15.472187499999999 166.48123125 28.7340625 194.22810312500002 44.20625 194.22810312500002C 59.678437499999994 194.22810312500002 72.94031249999999 110.98748750000001 88.4125 110.98748750000001C 103.8846875 110.98748750000001 117.1465625 221.97497500000003 132.61875 221.97497500000003C 148.0909375 221.97497500000003 161.3528125 55.49374375000002 176.825 55.49374375000002C 192.29718749999998 55.49374375000002 205.5590625 166.48123125 221.03125 166.48123125" pathFrom="M -1 332.9624625L -1 332.9624625L 44.20625 332.9624625L 88.4125 332.9624625L 132.61875 332.9624625L 176.825 332.9624625L 221.03125 332.9624625"></path><g id="SvgjsG1135" class="apexcharts-series-markers-wrap" data:realIndex="0"><g class="apexcharts-series-markers"><circle id="SvgjsCircle1196" r="0" cx="0" cy="0" class="apexcharts-marker wkk0qsx2c no-pointer-events" stroke="#c9f7f5" fill="#c9f7f5" fill-opacity="1" stroke-width="3" stroke-opacity="0.9" default-marker-size="0"></circle></g></g><g id="SvgjsG1136" class="apexcharts-datalabels" data:realIndex="0"></g></g><g id="SvgjsG1141" class="apexcharts-datalabels" data:realIndex="1"></g></g><line id="SvgjsLine1190" x1="0" y1="0" x2="0" y2="277.46871875" stroke="#c9f7f5" stroke-dasharray="3" class="apexcharts-xcrosshairs" x="0" y="0" width="1" height="277.46871875" fill="#b1b9c4" filter="none" fill-opacity="0.9" stroke-width="1"></line><line id="SvgjsLine1191" x1="0" y1="0" x2="221.03125" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1" class="apexcharts-ycrosshairs"></line><line id="SvgjsLine1192" x1="0" y1="0" x2="221.03125" y2="0" stroke-dasharray="0" stroke-width="0" class="apexcharts-ycrosshairs-hidden"></line><g id="SvgjsG1193" class="apexcharts-yaxis-annotations"></g><g id="SvgjsG1194" class="apexcharts-xaxis-annotations"></g><g id="SvgjsG1195" class="apexcharts-point-annotations"></g><rect id="SvgjsRect1198" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe" class="apexcharts-zoom-rect"></rect><rect id="SvgjsRect1199" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe" class="apexcharts-selection-rect"></rect></g><g id="SvgjsG1164" class="apexcharts-yaxis" rel="0" transform="translate(14.96875, 0)"><g id="SvgjsG1165" class="apexcharts-yaxis-texts-g"><text id="SvgjsText1166" font-family="Poppins" x="20" y="31.5" text-anchor="end" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1167">120</tspan></text><text id="SvgjsText1168" font-family="Poppins" x="20" y="86.99374375" text-anchor="end" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1169">100</tspan></text><text id="SvgjsText1170" font-family="Poppins" x="20" y="142.4874875" text-anchor="end" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1171">80</tspan></text><text id="SvgjsText1172" font-family="Poppins" x="20" y="197.98123124999998" text-anchor="end" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1173">60</tspan></text><text id="SvgjsText1174" font-family="Poppins" x="20" y="253.47497499999997" text-anchor="end" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1175">40</tspan></text><text id="SvgjsText1176" font-family="Poppins" x="20" y="308.96871875" text-anchor="end" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#b5b5c3" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Poppins;"><tspan id="SvgjsTspan1177">20</tspan></text></g></g><rect id="SvgjsRect1189" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe"></rect><g id="SvgjsG1127" class="apexcharts-annotations"></g></svg><div class="apexcharts-legend"></div><div class="apexcharts-tooltip apexcharts-theme-light"><div class="apexcharts-tooltip-title" style="font-family: Poppins; font-size: 12px;"></div><div class="apexcharts-tooltip-series-group"><span class="apexcharts-tooltip-marker" style="background-color: rgb(27, 197, 189);"></span><div class="apexcharts-tooltip-text" style="font-family: Poppins; font-size: 12px;"><div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-label"></span><span class="apexcharts-tooltip-text-value"></span></div><div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div></div></div><div class="apexcharts-tooltip-series-group"><span class="apexcharts-tooltip-marker" style="background-color: rgb(255, 168, 0);"></span><div class="apexcharts-tooltip-text" style="font-family: Poppins; font-size: 12px;"><div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-label"></span><span class="apexcharts-tooltip-text-value"></span></div><div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div></div></div></div><div class="apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom apexcharts-theme-light"><div class="apexcharts-xaxistooltip-text" style="font-family: Poppins; font-size: 12px;"></div></div><div class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light"><div class="apexcharts-yaxistooltip-text"></div></div></div></div>
                        <div class="resize-triggers"><div class="expand-trigger"><div style="width: 331px; height: 414px;"></div></div><div class="contract-trigger"></div></div></div>
                        <!--end::Body-->
                    </div>
                    <!--end::Charts Widget 4-->
                </div>
                <div class="col-lg-6">
                    <!--begin::List Widget 11-->
                    <div class="card card-custom card-stretch gutter-b">
                        <!--begin::Header-->
                        <div class="card-header border-0">
                            <h3 class="card-title font-weight-bolder text-dark">Trends</h3>
                            <div class="card-toolbar">
                                <div class="dropdown dropdown-inline" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
                                    <a href="#" class="btn btn-clean btn-hover-light-primary btn-sm btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="ki ki-bold-more-ver"></i>
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
                        <div class="card-body pt-0">
                            <!--begin::Item-->
                            <div class="d-flex align-items-center mb-9 bg-light-warning rounded p-5">
                                <!--begin::Icon-->
                                <span class="svg-icon svg-icon-warning mr-5">
                                    <span class="svg-icon svg-icon-lg">
                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Home/Library.svg-->
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                <path d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z" fill="#000000"></path>
                                                <rect fill="#000000" opacity="0.3" transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)" x="16.3255682" y="2.94551858" width="3" height="18" rx="1"></rect>
                                            </g>
                                        </svg>
                                        <!--end::Svg Icon-->
                                    </span>
                                </span>
                                <!--end::Icon-->
                                <!--begin::Title-->
                                <div class="d-flex flex-column flex-grow-1 mr-2">
                                    <a href="#" class="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1">Group lunch celebration</a>
                                    <span class="text-muted font-weight-bold">Due in 2 Days</span>
                                </div>
                                <!--end::Title-->
                                <!--begin::Lable-->
                                <span class="font-weight-bolder text-warning py-1 font-size-lg">+28%</span>
                                <!--end::Lable-->
                            </div>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <div class="d-flex align-items-center bg-light-success rounded p-5 mb-9">
                                <!--begin::Icon-->
                                <span class="svg-icon svg-icon-success mr-5">
                                    <span class="svg-icon svg-icon-lg">
                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Communication/Write.svg-->
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path>
                                                <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                            </g>
                                        </svg>
                                        <!--end::Svg Icon-->
                                    </span>
                                </span>
                                <!--end::Icon-->
                                <!--begin::Title-->
                                <div class="d-flex flex-column flex-grow-1 mr-2">
                                    <a href="#" class="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1">Home navigation optimization</a>
                                    <span class="text-muted font-weight-bold">Due in 2 Days</span>
                                </div>
                                <!--end::Title-->
                                <!--begin::Lable-->
                                <span class="font-weight-bolder text-success py-1 font-size-lg">+50%</span>
                                <!--end::Lable-->
                            </div>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <div class="d-flex align-items-center bg-light-danger rounded p-5 mb-9">
                                <!--begin::Icon-->
                                <span class="svg-icon svg-icon-danger mr-5">
                                    <span class="svg-icon svg-icon-lg">
                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Communication/Group-chat.svg-->
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                <path d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z" fill="#000000"></path>
                                                <path d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z" fill="#000000" opacity="0.3"></path>
                                            </g>
                                        </svg>
                                        <!--end::Svg Icon-->
                                    </span>
                                </span>
                                <!--end::Icon-->
                                <!--begin::Title-->
                                <div class="d-flex flex-column flex-grow-1 mr-2">
                                    <a href="#" class="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1">Rebrand strategy planning</a>
                                    <span class="text-muted font-weight-bold">Due in 2 Days</span>
                                </div>
                                <!--end::Title-->
                                <!--begin::Lable-->
                                <span class="font-weight-bolder text-danger py-1 font-size-lg">-27%</span>
                                <!--end::Lable-->
                            </div>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <div class="d-flex align-items-center bg-light-info rounded p-5">
                                <!--begin::Icon-->
                                <span class="svg-icon svg-icon-info mr-5">
                                    <span class="svg-icon svg-icon-lg">
                                        <!--begin::Svg Icon | path:../../../../../../../../metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Attachment2.svg-->
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                <path d="M11.7573593,15.2426407 L8.75735931,15.2426407 C8.20507456,15.2426407 7.75735931,15.6903559 7.75735931,16.2426407 C7.75735931,16.7949254 8.20507456,17.2426407 8.75735931,17.2426407 L11.7573593,17.2426407 L11.7573593,18.2426407 C11.7573593,19.3472102 10.8619288,20.2426407 9.75735931,20.2426407 L5.75735931,20.2426407 C4.65278981,20.2426407 3.75735931,19.3472102 3.75735931,18.2426407 L3.75735931,14.2426407 C3.75735931,13.1380712 4.65278981,12.2426407 5.75735931,12.2426407 L9.75735931,12.2426407 C10.8619288,12.2426407 11.7573593,13.1380712 11.7573593,14.2426407 L11.7573593,15.2426407 Z" fill="#000000" opacity="0.3" transform="translate(7.757359, 16.242641) rotate(-45.000000) translate(-7.757359, -16.242641)"></path>
                                                <path d="M12.2426407,8.75735931 L15.2426407,8.75735931 C15.7949254,8.75735931 16.2426407,8.30964406 16.2426407,7.75735931 C16.2426407,7.20507456 15.7949254,6.75735931 15.2426407,6.75735931 L12.2426407,6.75735931 L12.2426407,5.75735931 C12.2426407,4.65278981 13.1380712,3.75735931 14.2426407,3.75735931 L18.2426407,3.75735931 C19.3472102,3.75735931 20.2426407,4.65278981 20.2426407,5.75735931 L20.2426407,9.75735931 C20.2426407,10.8619288 19.3472102,11.7573593 18.2426407,11.7573593 L14.2426407,11.7573593 C13.1380712,11.7573593 12.2426407,10.8619288 12.2426407,9.75735931 L12.2426407,8.75735931 Z" fill="#000000" transform="translate(16.242641, 7.757359) rotate(-45.000000) translate(-16.242641, -7.757359)"></path>
                                                <path d="M5.89339828,3.42893219 C6.44568303,3.42893219 6.89339828,3.87664744 6.89339828,4.42893219 L6.89339828,6.42893219 C6.89339828,6.98121694 6.44568303,7.42893219 5.89339828,7.42893219 C5.34111353,7.42893219 4.89339828,6.98121694 4.89339828,6.42893219 L4.89339828,4.42893219 C4.89339828,3.87664744 5.34111353,3.42893219 5.89339828,3.42893219 Z M11.4289322,5.13603897 C11.8194565,5.52656326 11.8194565,6.15972824 11.4289322,6.55025253 L10.0147186,7.96446609 C9.62419433,8.35499039 8.99102936,8.35499039 8.60050506,7.96446609 C8.20998077,7.5739418 8.20998077,6.94077682 8.60050506,6.55025253 L10.0147186,5.13603897 C10.4052429,4.74551468 11.0384079,4.74551468 11.4289322,5.13603897 Z M0.600505063,5.13603897 C0.991029355,4.74551468 1.62419433,4.74551468 2.01471863,5.13603897 L3.42893219,6.55025253 C3.81945648,6.94077682 3.81945648,7.5739418 3.42893219,7.96446609 C3.0384079,8.35499039 2.40524292,8.35499039 2.01471863,7.96446609 L0.600505063,6.55025253 C0.209980772,6.15972824 0.209980772,5.52656326 0.600505063,5.13603897 Z" fill="#000000" opacity="0.3" transform="translate(6.014719, 5.843146) rotate(-45.000000) translate(-6.014719, -5.843146)"></path>
                                                <path d="M17.9142136,15.4497475 C18.4664983,15.4497475 18.9142136,15.8974627 18.9142136,16.4497475 L18.9142136,18.4497475 C18.9142136,19.0020322 18.4664983,19.4497475 17.9142136,19.4497475 C17.3619288,19.4497475 16.9142136,19.0020322 16.9142136,18.4497475 L16.9142136,16.4497475 C16.9142136,15.8974627 17.3619288,15.4497475 17.9142136,15.4497475 Z M23.4497475,17.1568542 C23.8402718,17.5473785 23.8402718,18.1805435 23.4497475,18.5710678 L22.0355339,19.9852814 C21.6450096,20.3758057 21.0118446,20.3758057 20.6213203,19.9852814 C20.2307961,19.5947571 20.2307961,18.9615921 20.6213203,18.5710678 L22.0355339,17.1568542 C22.4260582,16.76633 23.0592232,16.76633 23.4497475,17.1568542 Z M12.6213203,17.1568542 C13.0118446,16.76633 13.6450096,16.76633 14.0355339,17.1568542 L15.4497475,18.5710678 C15.8402718,18.9615921 15.8402718,19.5947571 15.4497475,19.9852814 C15.0592232,20.3758057 14.4260582,20.3758057 14.0355339,19.9852814 L12.6213203,18.5710678 C12.2307961,18.1805435 12.2307961,17.5473785 12.6213203,17.1568542 Z" fill="#000000" opacity="0.3" transform="translate(18.035534, 17.863961) scale(1, -1) rotate(45.000000) translate(-18.035534, -17.863961)"></path>
                                            </g>
                                        </svg>
                                        <!--end::Svg Icon-->
                                    </span>
                                </span>
                                <!--end::Icon-->
                                <!--begin::Title-->
                                <div class="d-flex flex-column flex-grow-1 mr-2">
                                    <a href="#" class="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1">Product goals strategy meet-up</a>
                                    <span class="text-muted font-weight-bold">Due in 2 Days</span>
                                </div>
                                <!--end::Title-->
                                <!--begin::Lable-->
                                <span class="font-weight-bolder text-info py-1 font-size-lg">+8%</span>
                                <!--end::Lable-->
                            </div>
                            <!--end::Item-->
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::List Widget 11-->
                </div>
            </div>
            <!--end::Row-->
        </div>
        <!--end::Container-->
    </div>
    <!--end::Entry-->
</div>


@endsection
