@extends('layouts.dashboard')
@section('title',$regions->states[0]->name)
@section('styles')
<link rel="stylesheet" href="{{ asset('dash/css/carousel.css') }}">
@endsection
@section('content')
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.js"></script>
<div class="content  d-flex flex-column flex-column-fluid" id="kt_content">
    <!--begin::Subheader-->
    <div class="subheader py-2 py-lg-4  subheader-transparent " id="kt_subheader">
        <div class=" container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <!--begin::Info-->
            <div class="d-flex align-items-center flex-wrap mr-1">

                <div class="d-flex align-items-baseline flex-wrap mr-5">
                    <h5 class="text-dark font-weight-bold my-1 mr-5">
                        {{$regions->zone}} >
                    </h5>

                    <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
                        <li class="breadcrumb-item">
                            <a href="" class="text-primary">
                                {{$regions->states[0]->name}}
                            </a>
                        </li>

                    </ul>
                    <!--end::Breadcrumb-->
                </div>
                <!--end::Page Heading-->
            </div>
            <!--end::Info-->

            <!--begin::Toolbar-->
            <div class="d-flex align-items-center">
                <!--begin::Actions-->
                <a href="#" class="btn btn-light font-weight-bold btn-sm">
                    Actions
                </a>
            </div>
        </div>
    </div>
    <div class="d-flex flex-column-fluid">
        <div class=" container ">
            <!--begin::Row-->
            <div class="row">
                <div class="col-xl-4">
                    <!--begin::Tiles Widget 1-->
                    <div class="card card-custom gutter-b card-stretch">
                        <!--begin::Header-->
                        <div class="card-header border-0 pt-5">
                            <div class="card-title">
                                <div class="card-label">
                                    <div class="font-weight-bolder">Weekly Sales Stats</div>
                                    <div class="font-size-sm text-muted mt-2">890,344 Sales</div>
                                </div>
                            </div>
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
                                                    <span class="navi-icon"><i class="flaticon2-drop"></i></span>
                                                    <span class="navi-text">New Group</span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon"><i class="flaticon2-list-3"></i></span>
                                                    <span class="navi-text">Contacts</span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon"><i class="flaticon2-rocket-1"></i></span>
                                                    <span class="navi-text">Groups</span>
                                                    <span class="navi-link-badge">
                                                        <span class="label label-light-primary label-inline font-weight-bold">new</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon"><i class="flaticon2-bell-2"></i></span>
                                                    <span class="navi-text">Calls</span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon"><i class="flaticon2-gear"></i></span>
                                                    <span class="navi-text">Settings</span>
                                                </a>
                                            </li>

                                            <li class="navi-separator my-3"></li>

                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon"><i class="flaticon2-magnifier-tool"></i></span>
                                                    <span class="navi-text">Help</span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-icon"><i class="flaticon2-bell-2"></i></span>
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
                        <div class="card-body d-flex flex-column px-0">
                            <!--begin::Chart-->
                            <div id="road_status_chart" data-color="info" style="height: 150px"></div>
                            <!--end::Chart-->

                            <!--begin::Items-->
                            <div class="flex-grow-1 card-spacer-x">
                                <!--begin::Item-->
                                <div class="d-flex align-items-center justify-content-between mb-10">
                                    <div class="d-flex align-items-center mr-2">
                                        <div class="symbol symbol-50 symbol-light mr-3 flex-shrink-0">
                                            <div class="symbol-label">
                                                <img src="/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/006-plurk.svg" alt="" class="h-50" />
                                            </div>
                                        </div>
                                        <div>
                                            <a href="#" class="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Top Authors</a>
                                            <div class="font-size-sm text-muted font-weight-bold mt-1">Ricky Hunt, Sandra Trepp</div>
                                        </div>
                                    </div>
                                    <div class="label label-light label-inline font-weight-bold text-dark-50 py-4 px-3 font-size-base">+105$</div>
                                </div>
                                <!--end::Item-->

                                <!--begin::Item-->
                                <div class="d-flex align-items-center justify-content-between mb-10">
                                    <div class="d-flex align-items-center mr-2">
                                        <div class="symbol symbol-50 symbol-light mr-3 flex-shrink-0">
                                            <div class="symbol-label">
                                                <img src="/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/015-telegram.svg" alt="" class="h-50" />
                                            </div>
                                        </div>
                                        <div>
                                            <a href="#" class="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Bestsellers</a>
                                            <div class="font-size-sm text-muted font-weight-bold mt-1">Pitstop Email Marketing</div>
                                        </div>
                                    </div>
                                    <div class="label label-light label-inline font-weight-bold text-dark-50 py-4 px-3 font-size-base">+60$</div>
                                </div>
                                <!--end::Item-->

                                <!--begin::Item-->
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center mr-2">
                                        <div class="symbol symbol-50 symbol-light mr-3 flex-shrink-0">
                                            <div class="symbol-label">
                                                <img src="/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/003-puzzle.svg" alt="" class="h-50" />
                                            </div>
                                        </div>
                                        <div>
                                            <a href="#" class="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Top Engagement</a>
                                            <div class="font-size-sm text-muted font-weight-bold mt-1">KT.com solution provider</div>
                                        </div>
                                    </div>
                                    <div class="label label-light label-inline font-weight-bold text-dark-50 py-4 px-3 font-size-base">+75$</div>
                                </div>
                                <!--end::Item-->
                            </div>
                            <!--end::Items-->
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Tiles Widget 1-->
                </div>
                <div class="col-xl-5">
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="card card-custom bg-success gutter-b" style="height: 150px">
                                <div class="card-body">
                                    <span class="svg-icon svg-icon-3x svg-icon-white ml-n2">
                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Layout/Layout-4-blocks.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5"></rect>
                                                <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3"></path>
                                            </g>
                                        </svg>
                                        <!--end::Svg Icon--></span>
                                    <div class="text-inverse-success font-weight-bolder font-size-h2 mt-3">{{$roads->roads_count}}</div>

                                    <a href="#" class="text-inverse-success font-weight-bold font-size-lg mt-1">Federal Roads</a>
                                </div>
                            </div>

                            <div class="card card-custom gutter-b">

                                <div class="card-body d-flex flex-column pb-2">
                                    <div class="flex-grow-1" style="position: relative;">
                                        <div class="text-dark-50 font-weight-bold">{{ $regions->states[0]->name }} Percentile Reports</div>
                                        <p class="small pb-0 mb-0">Overall Percentile Over All States</p>
                                        <div id="percentage_reports_total" data-value="{{ json_encode($prt) }}"></div>
                                    </div>
                                    <div class="pt-0 px-0">
                                        <p class="text-center font-weight-normal">

                                        </p>
                                        <a href="#" class="btn btn-success btn-shadow-hover btn-sm font-weight-bolder w-100">Goto Reports <i class="fa fa-arrow-right fa-sm float-right pt-1"></i></a>
                                    </div>
                                </div>
                                <!--end::Body-->
                            </div>


                        </div>
                        <div class="col-xl-6">
                            <!--begin::Tiles Widget 4-->
                            <div class="card card-custom gutter-b" >
                                <!--begin::Body-->
                                <div class="card-body d-flex flex-column">
                                    <!--begin::Stats-->
                                    <div class="flex-grow-1">
                                        <div class="text-dark-50 font-weight-bold">{{ $regions->states[0]->name }} Percentile Reports</div>
                                        <p class="small pb-0 mb-0">Overall Percentile Over Other States in {{ $regions->zone }}</p>
                                    </div>

                                   <div id="percentage_reports" data-value="{{ json_encode($prr) }}" class="pt-5 mb-0 pb-0" style=""></div>
                                    <div class="d-flex align-items-center px-0  mx-0 py-0 my-0">
                                    <!--begin::Symbol-->
                                        <div class="symbol symbol-circle symbol-20  mr-3 flex-shrink-0">
                                            <div class="symbol-label">
                                                <span class="svg-icon svg-icon-lg svg-icon-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <rect x="0" y="0" width="24" height="24"></rect>
                                                            <rect fill="#000000" opacity="0.3" x="13" y="4" width="3" height="16" rx="1.5"></rect>
                                                            <rect fill="#000000" x="8" y="9" width="3" height="11" rx="1.5"></rect>
                                                            <rect fill="#000000" x="18" y="11" width="3" height="9" rx="1.5"></rect>
                                                            <rect fill="#000000" x="3" y="13" width="3" height="7" rx="1.5"></rect>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <a href="#" class=" text-dark-75 text-hover-primary font-weight-bolder small">{{ $roads->name}}</a>
                                            <div class="font-size-sm text-muted font-weight-bold mt-1">{{$prr}}% entries from {{ $roads->name}} in {{$regions->zone}}</div>
                                        </div>
                                    </div>
                                </div>
                                <!--end::Body-->
                            </div>
                            <!--end::Tiles Widget 4-->
                            <!--begin::Tiles Widget 5-->
                            <div class="card card-custom bg-info  gutter-b">
                                <!--begin::Body-->
                                <div class="card-body p-0">
                                    <!--begin::Stats-->
                                    <div class="card-spacer pb-0">
                                    <div class="text-inverse-info font-weight-bold">Local Govt In </div>
                                        <div class="text-inverse-info font-weight-bolder font-size-h3">{{ count($roads->locals) }}</div>
                                    </div>

                                </div>
                                <!--end::Body-->
                            </div>
                            <!--end::Tiles Widget 5-->
                        </div>
                    </div>
                    <!--begin::Mixed Widget 20-->
                    <div class="card card-custom bgi-no-repeat gutterb bg-primary">
                        <!--begin::Body-->
                        <div class="card-body d-flex align-items-center">
                            <div class="py-0">
                                <h3 class="text-white font-weight-bolder mb-3">30% Off Themes</h3>
                                <p class="text-white font-size-lg">
                                    Get your discounted themes of the month<br />
                                    No hassle, no worries, no fuss<br />
                                    Instant rewards, everyday
                                </p>
                            </div>
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 20-->
                </div>
                <div class="col-xl-3">
                    <!--begin::Tiles Widget 7-->
                    <div class="card card-custom bgi-no-repeat gutter-b card-stretch">
                        <!--begin::Body-->
                        <div class="card-body p-0" id="owl-header">

                            <div class="owl-carousel owl-theme px-0">
                                @foreach ($reportsImages as $item)
                                <div class="item" style="background: url({{$item->images}}); background-size: cover; background-repeat: no-repeat; min-height:100% !important" >
                                    <a href="">
                                        <div class="cover ">
                                            <div class="container">
                                                <div class="header-content">
                                                    <div class="line"></div>
                                                    <h2 class="small">Bad road around {{$item->locals->local_name }} Local Govt</h2>
                                                    <h1 class="small">{{ ucfirst($item->roads->name) }} Rd</h1>
                                                    <h2 class="small">Reported {{$item->created_at->diffForHumans() }} <span class="text-warning">{{ date(' d M, Y',strtotime($item->created_at)) }}</span> </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                @endforeach
                            </div>
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Tiles Widget 7-->
                </div>
            </div>
            <!--end::Row-->

        </div>
        <!--end::Container-->
    </div>
    <!--end::Entry-->
</div>
@endsection
@section('scripts')
<script src="{{ asset('dash/js/charts/states/index.js') }}"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.js"></script>
<script>
      $('.owl-carousel').owlCarousel({
            loop:true,
            dots:false,
            nav:false,
            mouseDrag:false,
            autoplay:true,
            animateOut: 'slideOutUp',
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        });
</script>
@endsection
