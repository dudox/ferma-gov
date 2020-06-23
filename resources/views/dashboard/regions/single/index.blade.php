@extends('layouts.dashboard')

@section('content')
<div class="content  d-flex flex-column flex-column-fluid" id="kt_content">

    <!--begin::Entry-->
    <div class="">
        <!--begin::Container-->
        <div class=" container mb-10">
            <div class="row">
                <div class="col-xl-4">
                    <div class="row">
                        <div class="col-xl-12">
                            <div  class="card card-custom bg-primary bg-hover-state-primary card-stretch gutter-b">
                                <!--begin::Body-->
                                <div class="card-body">
                                    <span class="svg-icon svg-icon-white svg-icon-3x ml-n1">
                                        <i class="text-white fa fa-globe fa-3x"></i>
                                     </span>
                                     <div class="text-inverse-danger font-weight-bolder font-size-h3 mb-2 mt-5">{{$zone->zone}}</div>
                                    <div class="font-weight-bold text-inverse-danger font-size-sm">{{$zone->zone}} Has a total of {{count($states)}} States</div>
                                </div>
                                <!--end::Body-->
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="card card-custom bg-dark card-stretch gutter-b">
                                <!--begin::ody-->
                                <div class="card-body">
                                    <span class="svg-icon svg-icon-2x svg-icon-danger">
                                        <i class="fa fa-road fa-3x text-white"></i>
                                    </span>
                                    @php  $total =0; @endphp
                                    @foreach ($states as $item)
                                        @php $total +=  count($item->locals) @endphp

                                    @endforeach
                                    <span class="card-title font-weight-bolder  font-size-h2 mb-0 mt-6 d-block text-white">{{count($roads)}} </span>
                                    <span class="font-weight-bold  font-size-sm text-white">Federal Roads</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="card card-custom bg-dark card-stretch gutter-b">
                                <!--begin::ody-->
                                <div class="card-body">
                                    <span class="svg-icon svg-icon-2x svg-icon-danger">
                                        <i class="fa fa-building fa-3x text-white"></i>
                                    </span>
                                    @php  $total =0; @endphp
                                    @foreach ($states as $item)
                                        @php $total +=  count($item->locals) @endphp

                                    @endforeach
                                    <span class="card-title font-weight-bolder  font-size-h2 mb-0 mt-6 d-block text-white"> {{$total}}</span>
                                    <span class="font-weight-bold  font-size-sm text-white">Local Govt</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12">
                            <div class="card card-custom card-stretch gutter-b">
                                <div class="card-body d-flex align-items-center py-0 mt-8">
                                    <div class="d-flex flex-column flex-grow-1 py-2 py-lg-5">
                                        <span class="card-title font-weight-bolder  font-size-h2 mb-0  py-0 mt-0 d-block text-dark">{{count($reports)}}</span>
                                        <a href="#" class="card-title font-weight-bolder text-dark-75 font-size-h5 mb-2 text-hover-primary">Reports</a>
                                        <span class="font-weight-bold text-muted  font-size-lg">Total Reports in {{$zone->zone}} Region</span>
                                    </div>
                                    <img src="{{asset('dash/img/avatar.png')}}" alt="" class="align-self-center h-80px">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-8">
                    <!--begin::List Widget 16-->
                    <div class="card card-custom mb-2">
                        <div class="card-body p-0">
                            <div class="d-flex">
                                <!--begin::Desktop Search-->
                                <div class="quick-search quick-search-inline flex-grow-1" id="kt_quick_search_inline">
                                    <!--begin::Form-->
                                    <form method="get" class="quick-search-form">
                                        <div class="input-group rounded" style="background-color: #EBDBCB;">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">
                                                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                                                        <i class="fa fa-search"></i>
                                                    </span>
                                                </span>
                                            </div>

                                            <input type="text" class="form-control form-control-primary h-50px"  id="myInput" placeholder="Search For State">

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
                                        <div class="quick-search-wrapper scroll ps" data-scroll="true" data-height="350" data-mobile-height="200" style="height: 350px; overflow: hidden;">
                                        <div class="ps__rail-x" style="left: 0px; bottom: 0px;"><div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps__rail-y" style="top: 0px; right: 0px;"><div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div></div></div>
                                    </div>
                                    <!--end::Dropdown-->
                                </div>
                                <!--end::Desktop Search-->
                            </div>
                        </div>
                    </div>
                    <div class="card card-custom card-stretch gutter-b">
                        <!--begin::Header-->
                        <div class="card-header border-0">
                            <h3 class="card-title font-weight-bolder text-dark">List of states in {{$zone->zone}}</h3>
                            <div class="card-toolbar">
                                <div class="dropdown dropdown-inline">
                                    <a href="#" class="btn btn-clean btn-hover-light-primary btn-sm btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="ki ki-bold-more-ver"></i>
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
                        <!--end:Header-->

                        <!--begin::Body-->
                        <div class="card-body pt-2" id="myFilter">
                            <!--begin::Item-->
                            @foreach ($states as $item)
                            <div class="recipe">
                                <div  class="d-flex align-items-center pb-10">
                                    <div class="symbol symbol-50  symbol-dark">
                                        <span class=" symbol-label font-weight-boldest small">{{mb_substr($item->name,0,3)}}</span>
                                    </div>
                                    <div class="d-flex flex-column flex-grow-1 my-lg-0 my-2 mr-2 ml-2">
                                        <a href="#" class="text-dark font-weight-bold text-hover-primary mb-1 font-size-lg title">{{$item->name}}</a>
                                        <span class="text-muted font-weight-bold">2 bed, 1 bath, 1 carpark</span>
                                    </div>

                                    <a href="#" class="btn btn-icon btn-light btn-sm">
                                        <span class="svg-icon svg-icon-success">
                                            <span class="svg-icon svg-icon-md">
                                                <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Navigation/Arrow-right.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <polygon points="0 0 24 0 24 24 0 24" />
                                                        <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1" />
                                                        <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) " />
                                                    </g>
                                                </svg>
                                            </span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            @endforeach


                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::List Widget 13-->
                </div>
            </div>
        </div>
    </div>
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
        btsearch.init('#myInput', '#myFilter .recipe', 'a.title');
        });
    </script>
@endsection
