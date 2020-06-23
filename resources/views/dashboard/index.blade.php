@extends('layouts.dashboard')

@section('content')
<div class="content  d-flex flex-column flex-column-fluid" id="kt_content">

    <!--begin::Entry-->
    <div class="d-flex flex-column-fluid">
        <!--begin::Container-->
        <div class=" container ">
            <!--begin::Dashboard-->
            <!--begin::Row-->
            <div class="row mt-0 mt-lg-3">
                <div class="col-xl-4">
                    <!--begin::Mixed Widget 17-->
                    <div class="card card-custom gutter-b card-stretch">
                        <!--begin::Header-->
                        <div class="card-header border-0 pt-5">
                            <div class="card-title font-weight-bolder">
                                <span class="font-weight-bolder text-dark">Project Status</span>
                            </div>
                        </div>
                        <!--end::Header-->

                        <!--begin::Body-->
                        <div class="card-body p-0 d-flex flex-column">
                            <!--begin::Items-->
                            <div class="flex-grow-1 card-spacer mb-0 pb-0">
                                <div class="row row-paddingless mt-5 mb-10">
                                    <!--begin::Item-->
                                    <div class="col">
                                        <div class="d-flex align-items-center mr-2">
                                            <!--begin::Symbol-->
                                            <div class="symbol symbol-45 symbol-light-info mr-4 flex-shrink-0">
                                                <div class="symbol-label">
                                                    <span class="svg-icon svg-icon-lg svg-icon-info">
                                                       <img width="30px" src="https://img.icons8.com/plasticine/2x/total-sales.png" alt="">
                                                        <!--end::Svg Icon--></span> </div>
                                            </div>
                                            <!--end::Symbol-->

                                            <!--begin::Title-->
                                            <div>
                                                <div class="font-size-h4 text-dark-75 font-weight-bolder">{{count($entry_overall)}}</div>
                                                <div class="font-size-sm text-muted font-weight-bold mt-1">Total</div>
                                            </div>
                                            <!--end::Title-->
                                        </div>
                                    </div>
                                    <!--end::Item-->

                                    <!--begin::Item-->
                                    <div class="col">
                                        <div class="d-flex align-items-center mr-2">
                                            <!--begin::Symbol-->
                                            <div class="symbol symbol-45 symbol-light-danger mr-4 flex-shrink-0">
                                                <div class="symbol-label">
                                                    <span class="svg-icon svg-icon-lg svg-icon-danger">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Home/Library.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <path d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z" fill="#000000" />
                                                                <rect fill="#000000" opacity="0.3" transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519) " x="16.3255682" y="2.94551858" width="3" height="18" rx="1" />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </div>
                                            </div>
                                            <!--end::Symbol-->

                                            <!--begin::Title-->
                                            <div>
                                                <div class="font-size-h4 text-dark-75 font-weight-bolder">{{count($entry_overall->where('status','1'))}}</div>
                                                <div class="font-size-sm text-muted font-weight-bold mt-1">Pending</div>
                                            </div>
                                            <!--end::Title-->
                                        </div>
                                    </div>
                                    <!--end::Widget Item-->
                                </div>

                                <div class="row row-paddingless">
                                    <!--begin::Item-->
                                    <div class="col">
                                        <div class="d-flex align-items-center mr-2">
                                            <!--begin::Symbol-->
                                            <div class="symbol symbol-45 symbol-light-success mr-4 flex-shrink-0">
                                                <div class="symbol-label">
                                                    <span class="svg-icon svg-icon-lg svg-icon-success">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Shopping/Cart3.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <path d="M12,4.56204994 L7.76822128,9.6401844 C7.4146572,10.0644613 6.7840925,10.1217854 6.3598156,9.76822128 C5.9355387,9.4146572 5.87821464,8.7840925 6.23177872,8.3598156 L11.2317787,2.3598156 C11.6315738,1.88006147 12.3684262,1.88006147 12.7682213,2.3598156 L17.7682213,8.3598156 C18.1217854,8.7840925 18.0644613,9.4146572 17.6401844,9.76822128 C17.2159075,10.1217854 16.5853428,10.0644613 16.2317787,9.6401844 L12,4.56204994 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                                                                <path d="M3.5,9 L20.5,9 C21.0522847,9 21.5,9.44771525 21.5,10 C21.5,10.132026 21.4738562,10.2627452 21.4230769,10.3846154 L17.7692308,19.1538462 C17.3034221,20.271787 16.2111026,21 15,21 L9,21 C7.78889745,21 6.6965779,20.271787 6.23076923,19.1538462 L2.57692308,10.3846154 C2.36450587,9.87481408 2.60558331,9.28934029 3.11538462,9.07692308 C3.23725479,9.02614384 3.36797398,9 3.5,9 Z M12,17 C13.1045695,17 14,16.1045695 14,15 C14,13.8954305 13.1045695,13 12,13 C10.8954305,13 10,13.8954305 10,15 C10,16.1045695 10.8954305,17 12,17 Z" fill="#000000" />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </div>
                                            </div>
                                            <!--end::Symbol-->

                                            <!--begin::Title-->
                                            <div>
                                                <div class="font-size-h4 text-dark-75 font-weight-bolder">{{count($entry_overall->where('status','2'))}}</div>
                                                <div class="font-size-sm text-muted font-weight-bold mt-1">Ongoing</div>
                                            </div>
                                            <!--end::Title-->
                                        </div>
                                    </div>
                                    <!--end::Item-->

                                    <!--begin::Item-->
                                    <div class="col">
                                        <div class="d-flex align-items-center mr-2">
                                            <!--begin::Symbol-->
                                            <div class="symbol symbol-45 symbol-light-primary mr-4 flex-shrink-0">
                                                <div class="symbol-label">
                                                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Shopping/Barcode-read.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <rect fill="#000000" opacity="0.3" x="4" y="4" width="8" height="16" />
                                                                <path d="M6,18 L9,18 C9.66666667,18.1143819 10,18.4477153 10,19 C10,19.5522847 9.66666667,19.8856181 9,20 L4,20 L4,15 C4,14.3333333 4.33333333,14 5,14 C5.66666667,14 6,14.3333333 6,15 L6,18 Z M18,18 L18,15 C18.1143819,14.3333333 18.4477153,14 19,14 C19.5522847,14 19.8856181,14.3333333 20,15 L20,20 L15,20 C14.3333333,20 14,19.6666667 14,19 C14,18.3333333 14.3333333,18 15,18 L18,18 Z M18,6 L15,6 C14.3333333,5.88561808 14,5.55228475 14,5 C14,4.44771525 14.3333333,4.11438192 15,4 L20,4 L20,9 C20,9.66666667 19.6666667,10 19,10 C18.3333333,10 18,9.66666667 18,9 L18,6 Z M6,6 L6,9 C5.88561808,9.66666667 5.55228475,10 5,10 C4.44771525,10 4.11438192,9.66666667 4,9 L4,4 L9,4 C9.66666667,4 10,4.33333333 10,5 C10,5.66666667 9.66666667,6 9,6 L6,6 Z" fill="#000000" fill-rule="nonzero" />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </div>
                                            </div>
                                            <!--end::Symbol-->

                                            <!--begin::Title-->
                                            <div>
                                                <div class="font-size-h4 text-dark-75 font-weight-bolder">{{count($entry_overall->where('status','3'))}}</div>
                                                <div class="font-size-sm text-muted font-weight-bold mt-1">Completed</div>
                                            </div>
                                            <!--end::Title-->
                                        </div>
                                    </div>
                                    <!--end::Item-->
                                </div>
                            </div>
                            <!--end::Items-->

                            <!--begin::Chart-->
                            <div class="bg-primary py-0 my-0">
                                <div data-side="total_reports" data-chart="{{json_encode($total_reports)}}"></div>
                                <div id="kt_mixed_widget_reports_chart" style="height: 200px"></div>
                                <div class="row text-white">
                                    {{-- {{dd($total_reports)}} --}}
                                    @foreach ($total_reports as $item)
                                    <div class="col px-5">
                                        <div class="d-flex align-items-center">
                                            <!--begin::Symbol-->
                                            <div class="symbol symbol-20 symbol-{{$item[1]}} flex-shrink-0">
                                                <div class="symbol-label">
                                                    <span class="svg-icon svg-icon-lg svg-icon-danger">

                                                    </span>
                                                </div>
                                            </div>
                                            <!--end::Symbol-->

                                            <!--begin::Title-->
                                            <div class="ml-2">
                                                <div class="font-size-h4 text-dark-75 font-weight-bolder">{{round($item[0],1)}}%</div>
                                            </div>
                                            <!--end::Title-->
                                        </div>
                                        <div class="font-size-sm text-white font-weight-bold mt-1">{{$item[2]}}</div>

                                    </div>
                                    @endforeach
                                </div>
                            </div>
                            <!--end::Chart-->
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 17-->
                </div>
                <div class="col-xl-4">

                    <!--begin::List Widget 9-->
                    <div class="card card-custom gutter-b card-stretch">
                        <!--begin::Header-->
                        <div class="card-header align-items-center border-0 mt-4 slideInUp wow">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="font-weight-bolder text-dark">Recent Entries</span>
                                <span class="text-dark" style="font-size: 10px">
                                    <span class="text-muted">Road status indicators<br/></span>
                                    <i class="fa fa-sm fa-road text-warning icon-xl"></i> Pending&nbsp;
                                    <i class="fa fa-sm fa-road text-info icon-xl"></i> Ongoing&nbsp;
                                    <i class="fa fa-sm fa-road text-success icon-xl"></i> Completed
                                </span>
                            </h3>

                        </div>
                        <!--end::Header-->

                        <!--begin::Body-->
                        <div class="card-body pt-4 h-100" >
                            <div class="overflow-auto ">
                                <?php $count =0 ;?>
                                @foreach($recent_entry as $entry)

                                <?php $count++;
                                $delay = ($count  / 5 );
                                ?>
                                <div class="timeline timeline-5 mb-3 slideInRight wow" data-wow-duration=".50s" data-wow-delay="{{$delay}}s">
                                    <!--begin::Item-->
                                    <div class="timeline-item align-items-start">
                                        <!--begin::Label-->
                                        <div class="timeline-label font-weight-bolder text-dark small" style="font-size: 10px !important;"><span class="badge badge-dark">{{ date("h:i a",strtotime($entry->created_at))}}</span> {{  date("m,Y",strtotime($entry->created_at))}}</div>
                                        <!--end::Label-->
                                        <!--begin::Badge-->
                                        <div class="timeline-badge">

                                            <i class="fa fa-sm fa-road text-{{$entry->roads->progress->color_code}} icon-xl"></i>
                                        </div>
                                        <!--end::Badge-->

                                        <!--begin::Text-->
                                        <div class="font-weight-mormal font-size-lg timeline-content text-muted pl-3">
                                            <span class="font-weight-bolder text-link  d-block small"><i class="fa fa-sm fa-user"></i> {{$entry->phone}}</span>
                                            <span class="font-weight-bolder text-dark-75 small">{{ucfirst($entry->roads->name)}}, {{$entry->states->name}}</span>
                                            <span class="small d-block">{{$entry->roads->progress->description}}</span>
                                        </div>
                                        <!--end::Text-->
                                    </div>
                                    <!--end::Item-->



                                </div>
                                @endforeach
                            </div>
                            <!--end: Items-->
                        </div>
                        <!--end: Card Body-->
                    </div>
                    <!--end: Card-->
                    <!--end: List Widget 9-->
                </div>
                <div class="col-lg-4 ">
                    <!--begin::Mixed Widget 16-->
                        <div class="card card-custom gutter-b  bg-primary ">
                            <!--begin::Header-->
                            <div class="card-header border-0 pt-5">
                                <div class="card-title font-weight-bolder">
                                    <div class="card-label text-white">
                                        Project Percentile
                                        <div class="font-size-sm text-white mt-2">Here is a percentile analysis of active road development status</div>
                                    </div>
                                </div>
                            </div>
                            <!--end::Header-->

                            <!--begin::Body-->
                            <div class="card-body d-flex flex-column">
                                <!--begin::Chart-->
                                <div data-side="percentile" data-chart="{{ json_encode($percentile)}}"></div>
                                <div id="kt_mixed_widget_16_chart"  style="height: 250px"></div>
                                <div class="row text-white">
                                    {{-- {{dd($percentile)}} --}}
                                    @foreach ($percentile as $item)
                                    <div class="col px-5">
                                        <div class="d-flex align-items-center">
                                            <!--begin::Symbol-->
                                            <div class="symbol symbol-20 symbol-{{$item[1]}} flex-shrink-0">
                                                <div class="symbol-label">
                                                    <span class="svg-icon svg-icon-lg svg-icon-danger">

                                                    </span>
                                                </div>
                                            </div>
                                            <!--end::Symbol-->

                                            <!--begin::Title-->
                                            <div class="ml-2">
                                                <div class="font-size-h4 text-dark-75 font-weight-bolder">{{round($item[0],1)}}%</div>
                                            </div>
                                            <!--end::Title-->
                                        </div>
                                        <div class="font-size-sm text-white font-weight-bold mt-1">{{$item[2]}}</div>

                                    </div>
                                    @endforeach
                                </div>
                                <!--end::Chart-->
                                <!--begin::Items-->

                                <!--end::Items-->
                            </div>
                        </div>
                        <div class="row ">
                            {{-- <div class="col-xl-6 ">
                                <div class="card card-custom bg-dark  gutter-b card-stretch" >
                                    <div class="card-body">
                                        <span class="svg-icon svg-icon-3x svg-icon-white ml-n2"><!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo2/dist/assets/media/svg/icons/Layout/Layout-4-blocks.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <rect x="0" y="0" width="24" height="24"></rect>
                                        <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5"></rect>
                                        <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3"></path>
                                    </g>
                                </svg><!--end::Svg Icon--></span>
                                        <div class="text-inverse-primary font-weight-bolder font-size-h2 mt-3">790</div>

                                        <a href="#" class="text-inverse-primary font-weight-bold font-size-lg mt-1">Total Reports</a>
                                    </div>
                                </div>
                            </div> --}}
                            <div class="col-xl-12">
                                <!--begin::Tiles Widget 12-->
                                <div class="card card-custom gutter-b  card-stretch" >
                                    <div class="card-body">
                                        <span class="svg-icon svg-icon-3x svg-icon-success"><!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo2/dist/assets/media/svg/icons/Communication/Group.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                        <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                        <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero"></path>
                                    </g>
                                </svg><!--end::Svg Icon--></span>
                                        <div class="text-dark font-weight-bolder font-size-h2 mt-3">{{count($total_reports)}}</div>

                                        <a href="#" class="text-muted text-hover-primary font-weight-bold font-size-lg mt-1">Total Reports Entry</a>
                                    </div>
                                </div>
        <!--end::Tiles Widget 12-->
                            </div>
                        </div>
                    <!--end::Mixed Widget 16-->
                </div>
            </div>
            <!--end::Row-->

            <!--begin::Row-->
            <div class="row">
                <div class="col-lg-4">

                    <!--begin::List Widget 4-->
                    <div class="card card-custom card-stretch gutter-b">
                        <!--begin::Header-->
                        <div class="card-header border-0">
                            <h3 class="card-title font-weight-bolder text-dark">Geo Regions</h3>
                            <div class="card-toolbar">
                                <div class="dropdown dropdown-inline">
                                    <span class="btn btn-primary btn-sm font-size-sm font-weight-bolder text-white-75  small">
                                       <i class="fa fa-globe"></i> {{count($zones)}}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!--end::Header-->
                        <!--begin::Body-->
                        <div class="card-body pt-2">
                            <!--begin::Item-->
                            <?php $count = 0;  ?>
                            @foreach ($zones as $data)
                            <?php $count++;
                                $delay = ($count  / 5 );
                            ?>

                            <div class="d-flex align-items-center mb-10 animate wow slideInLeft" data-wow-duration=".50s" data-wow-delay="{{$delay}}s">
                                <!--begin::Bullet-->
                                <span class="bullet bullet-bar bg-{{$data->color}} align-self-stretch"></span>
                                <!--end::Bullet-->

                                <!--begin::Checkbox-->
                                <label class="checkbox checkbox-lg checkbox-light-{{$data->color}} checkbox-inline flex-shrink-0 m-0 mx-4">
                                    <input type="checkbox" name="select" value="1" />
                                    <span></span>
                                </label>
                                <!--end::Checkbox-->

                                <!--begin::Text-->
                                <div class="d-flex flex-column flex-grow-1">
                                    <a href="{{ route('regions.single',str_replace(' ','_',$data->zone)) }}" class="text-dark-75 text-hover-primary font-weight-bold  py-0 my-0">
                                        {{$data->zone}}
                                    </a>
                                    <span class="text-muted font-weight-bold py-0 my-0 small">

                                    </span>
                                </div>
                                <!--end::Text-->

                                <!--begin::Dropdown-->
                                <div class="dropdown dropdown-inline ml-2" data-toggle="tooltip" title="{{count($data->states)}} States" data-placement="left">
                                    <span class="badge badge-dark small"><i class="fa fa-map small"></i> {{count($data->states)}}</span>
                                </div>

                                <?php $score = 0;?>
                                @foreach ($data->states as $item)
                                    <?php $score += count($item->locals); ?>
                                @endforeach
                                <div class="dropdown dropdown-inline ml-2" data-toggle="tooltip" title="{{$score}} Local Governments" data-placement="left">
                                    <span class="badge badge-light small"><i class="fa fa-building text-dark" style="font-size: 10px"></i> {{$score}}</span>
                                </div>
                                <!--end::Dropdown-->
                            </div>
                            <!--end:Item-->
                            @endforeach

                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end:List Widget 4-->
                </div>
                <div class="col-lg-8">
                    <!--begin::Advance Table Widget 2-->
                    <div class="card card-custom card-stretch gutter-b">
                        <!--begin::Header-->
                        <div class="card-header border-0 pt-5">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="card-label font-weight-bolder text-dark">Most Atively Reported Federal Roads</span>
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
                                            <th class="p-0" style="min-width: 205px"></th>
                                            <th class="p-0" style="min-width: 10px"></th>
                                            <th class="p-0" style="min-width: 50px"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($roads_prior as $item)
                                        <tr>
                                            <td class="pl-0 py-4">
                                                <div class="symbol symbol-50 symbol-{{$item->roads->progress->color_code}} mr-1">
                                                    <span class="symbol-label">
                                                        <i class="fa fa-road fa-2x text-white"></i>
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{{ucfirst($item->roads->name)}}</a>
                                                <div>
                                                    <span class="font-weight-bolder">{{$item->states->name}}:</span>
                                                    <a class="text-muted font-weight-bold text-hover-primary" href="#">{{$item->zones->zone}}</a>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-dark-75 font-weight-bolder d-block font-size-lg">
                                                    {{$item->total}}
                                                </span>
                                                <span class="text-muted font-weight-bold">
                                                    Reports
                                                </span>
                                            </td>
                                            <td class="text-left">
                                                <span class="text-muted font-weight-500">
                                                    {{$item->roads->progress->description}}
                                                </span>
                                            </td>
                                            <td class="text-right">
                                                <span class="label label-lg label-light-{{$item->roads->progress->color_code}} label-inline">{{$item->roads->progress->name}}</span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/Settings-1.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000" />
                                                                <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3" />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </a>
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
            </div>
            <!--end::Row-->

            <!--begin::Row-->
            <div class="row">
                <div class="col-xl-4">
                    <!--begin::Mixed Widget 7-->
                    <div class="card card-custom gutter-b card-stretch">
                        <!--begin::Body-->
                        <div class="card-body">
                            <div class="d-flex flex-wrap align-items-center py-1">
                                <!--begin:Pic-->
                                <div class="symbol symbol-80 symbol-light-danger mr-5">
                                    <span class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/008-infography.svg" class="h-50 align-self-center" alt="" />
                                    </span>
                                </div>
                                <!--end:Pic-->

                                <!--begin:Title-->
                                <div class="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
                                    <a href="#" class="text-dark font-weight-bolder text-hover-primary font-size-h5">
                                        Monthly Subscription<br />
                                        Based SaaS
                                    </a>
                                    <span class="text-muted font-weight-bold font-size-lg">
                                        Due: 27 Apr 2020
                                    </span>
                                </div>
                                <!--end:Title-->

                                <!--begin:Stats-->
                                <div class="d-flex flex-column w-100 mt-12">
                                    <span class="text-dark mr-2 font-size-lg font-weight-bolder pb-3">
                                        Progress
                                    </span>

                                    <div class="progress progress-xs w-100">
                                        <div class="progress-bar bg-danger" role="progressbar" style="width: 65%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <!--end:Stats-->

                                <!--begin:Team-->
                                <div class="d-flex flex-column mt-10">
                                    <div class="text-dark mr-2 font-size-lg font-weight-bolder pb-4">
                                        Team
                                    </div>
                                    <div class="d-flex">
                                        <a href="#" class="symbol symbol-50 symbol-light-danger mr-3">
                                            <div class="symbol-label">
                                                <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/001-boy.svg" class="h-75 align-self-end" alt="" />
                                            </div>
                                        </a>

                                        <a href="#" class="symbol symbol-50 symbol-light-danger mr-3">
                                            <div class="symbol-label">
                                                <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/028-girl-16.svg" class="h-75 align-self-end" alt="" />
                                            </div>
                                        </a>

                                        <a href="#" class="symbol symbol-50 symbol-light-danger mr-3">
                                            <div class="symbol-label">
                                                <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/024-boy-9.svg" class="h-75 align-self-end" alt="" />
                                            </div>
                                        </a>

                                        <a href="#" class="symbol symbol-50 symbol-light-danger">
                                            <div class="symbol-label">
                                                <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/005-girl-2.svg" class="h-75 align-self-end" alt="" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <!--end:Team-->
                            </div>
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 7-->
                </div>
                <div class="col-xl-4">
                    <!--begin::Mixed Widget 8-->
                    <div class="card card-custom gutter-b card-stretch">
                        <!--begin::Card body-->
                        <div class="card-body">
                            <div class="d-flex flex-wrap align-items-center py-1">
                                <!--begin::Pic-->
                                <div class="symbol symbol-80 symbol-light-success mr-5">
                                    <span class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/014-kickstarter.svg" class="h-50 align-self-center" alt="" />
                                    </span>
                                </div>
                                <!--end::Pic-->

                                <!--begin::Title-->
                                <div class="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
                                    <a href="#" class="text-dark font-weight-bolder text-hover-primary font-size-h5">
                                        Monthly Subscription<br />
                                        Based SaaS
                                    </a>
                                    <span class="text-muted font-weight-bold font-size-lg">
                                        Due: 27 Apr 2020
                                    </span>
                                </div>
                                <!--end::Title-->

                                <!--begin::Stats-->
                                <div class="d-flex flex-column w-100 mt-12">
                                    <span class="text-dark mr-2 font-size-lg font-weight-bolder pb-3">
                                        Progress
                                    </span>

                                    <div class="progress progress-xs w-100">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: 65%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <!--end::Stats-->

                                <!--begin::Team-->
                                <div class="d-flex flex-column mt-10">
                                    <span class="text-dark mr-2 font-size-lg font-weight-bolder pb-4">
                                        Team
                                    </span>

                                    <div class="d-flex">
                                        <!--begin::Pic-->
                                        <a href="#" class="symbol symbol-50 symbol-light-success mr-3">
                                            <div class="symbol-label">
                                                <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/001-boy.svg" class="h-75 align-self-end" alt="" />
                                            </div>
                                        </a>
                                        <!--end::Pic-->

                                        <!--begin::Pic-->
                                        <a href="#" class="symbol symbol-50 symbol-light-success mr-3">
                                            <div class="symbol-label">
                                                <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/028-girl-16.svg" class="h-75 align-self-end" alt="" />
                                            </div>
                                        </a>
                                        <!--end::Pic-->

                                        <!--begin::Pic-->
                                        <a href="#" class="symbol symbol-50 symbol-light-success mr-3">
                                            <div class="symbol-label">
                                                <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/024-boy-9.svg" class="h-75 align-self-end" alt="" />
                                            </div>
                                        </a>
                                        <!--end::Pic-->
                                    </div>
                                </div>
                                <!--end::Team-->
                            </div>
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 8-->
                </div>
                <div class="col-xl-4">
                    <!--begin::Mixed Widget 9-->
                    <div class="card card-custom gutter-b card-stretch">
                        <!--begin::Body-->
                        <div class="card-body">
                            <div class="d-flex flex-wrap align-items-center py-1">
                                <!--begin::Pic-->
                                <div class="symbol symbol-80 symbol-light-primary mr-5">
                                    <span class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/010-vimeo.svg" class="h-50 align-self-center" alt="" />
                                    </span>
                                </div>
                                <!--end::Pic-->

                                <!--begin::Title-->
                                <div class="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
                                    <a href="#" class="text-dark font-weight-bolder text-hover-primary font-size-h5">
                                        Monthly Subscription<br />
                                        Based SaaS
                                    </a>
                                    <span class="text-muted font-weight-bold font-size-lg">
                                        Due: 27 Apr 2020
                                    </span>
                                </div>
                                <!--end::Title-->

                                <!--begin::Stats-->
                                <div class="d-flex flex-column w-100 mt-12">
                                    <span class="text-dark mr-2 font-size-lg font-weight-bolder pb-3">
                                        Progress
                                    </span>

                                    <div class="progress progress-xs w-100">
                                        <div class="progress-bar bg-primary" role="progressbar" style="width: 65%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <!--end::Stats-->

                                <!--begin::Team-->
                                <div class="d-flex flex-column mt-10">
                                    <span class="text-dark mr-2 font-size-lg font-weight-bolder pb-4">
                                        Team
                                    </span>

                                    <div class="d-flex">
                                        <!--begin::Pic-->
                                        <a href="#" class="symbol symbol-50 symbol-light-primary mr-3">
                                            <div class="symbol-label">
                                                <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/001-boy.svg" class="h-75 align-self-end" alt="" />
                                            </div>
                                        </a>
                                        <!--end::Pic-->

                                        <!--begin::Pic-->
                                        <a href="#" class="symbol symbol-50 symbol-light-primary mr-3">
                                            <div class="symbol-label">
                                                <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/028-girl-16.svg" class="h-75 align-self-end" alt="" />
                                            </div>
                                        </a>
                                        <!--end::Pic-->

                                        <!--begin::Pic-->
                                        <a href="#" class="symbol symbol-50 symbol-light-primary mr-3">
                                            <div class="symbol-label">
                                                <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/024-boy-9.svg" class="h-75 align-self-end" alt="" />
                                            </div>
                                        </a>
                                        <!--end::Pic-->

                                        <!--begin::Pic-->
                                        <a href="#" class="symbol symbol-50 symbol-light-primary">
                                            <div class="symbol-label">
                                                <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/005-girl-2.svg" class="h-75 align-self-end" alt="" />
                                            </div>
                                        </a>
                                        <!--end::Pic-->
                                    </div>
                                </div>
                                <!--end::Team-->
                            </div>
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 9-->
                </div>
            </div>
            <!--end::Row-->

            <!--begin::Row-->
            <div class="row">
                <div class="col-xl-4">
                    <!--begin::Mixed Widget 10-->
                    <div class="card card-custom card-stretch gutter-b">
                        <!--begin::Body-->
                        <div class="card-body d-flex flex-column">
                            <div class="flex-grow-1 pb-5">
                                <!--begin::Info-->
                                <div class="d-flex align-items-center pr-2 mb-6">
                                    <span class="text-muted font-weight-bold font-size-lg flex-grow-1">
                                        7 Hours Ago
                                    </span>
                                    <div class="symbol symbol-50">
                                        <span class="symbol-label bg-light-light">
                                            <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/006-plurk.svg" class="h-50 align-self-center" alt="" />
                                        </span>
                                    </div>
                                </div>
                                <!--end::Info-->

                                <!--begin::Link-->
                                <a href="#" class="text-dark font-weight-bolder text-hover-primary font-size-h4">
                                    PitStop - Multiple Email<br />
                                    Generator
                                </a>
                                <!--end::Link-->

                                <!--begin::Desc-->
                                <p class="text-dark-50 font-weight-normal font-size-lg mt-6">
                                    Pitstop creates quick email campaigns.<br />
                                    We help to strengthen your brand<br />
                                    for your every purpose.
                                </p>
                                <!--end::Desc-->
                            </div>
                            <!--begin::Team-->
                            <div class="d-flex align-items-center">
                                <!--begin::Pic-->
                                <a href="#" class="symbol symbol-45 symbol-light mr-3">
                                    <div class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/001-boy.svg" class="h-75 align-self-end" alt="" />
                                    </div>
                                </a>
                                <!--end::Pic-->

                                <!--begin::Pic-->
                                <a href="#" class="symbol symbol-45 symbol-light mr-3">
                                    <div class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/028-girl-16.svg" class="h-75 align-self-end" alt="" />
                                    </div>
                                </a>
                                <!--end::Pic-->

                                <!--begin::Pic-->
                                <a href="#" class="symbol symbol-45 symbol-light">
                                    <div class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/024-boy-9.svg" class="h-75 align-self-end" alt="" />
                                    </div>
                                </a>
                                <!--end::Pic-->
                            </div>
                            <!--end::Team-->
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 10-->
                </div>
                <div class="col-xl-4">
                    <!--begin::Mixed Widget 11-->
                    <div class="card card-custom card-stretch gutter-b">
                        <!--begin::Body-->
                        <div class="card-body d-flex flex-column">
                            <div class="flex-grow-1 pb-5">
                                <!--begin::Info-->
                                <div class="d-flex align-items-center pr-2 mb-6">
                                    <span class="text-muted font-weight-bold font-size-lg flex-grow-1">
                                        2 Days Ago
                                    </span>
                                    <div class="symbol symbol-50">
                                        <span class="symbol-label bg-light-light">
                                            <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/015-telegram.svg" class="h-50 align-self-center" alt="" />
                                        </span>
                                    </div>
                                </div>
                                <!--end::Info-->

                                <a href="#" class="text-dark font-weight-bolder text-hover-primary font-size-h4">
                                    Craft - ReactJS Admin<br />
                                    Theme
                                </a>

                                <!--begin::Desc-->
                                <p class="text-dark-50 font-weight-normal font-size-lg mt-6">
                                    Craft uses the latest and greatest frameworks<br />
                                    with ReactJS for complete modernization and<br />
                                    future proofing your business operations<br />
                                    and sales opportunities
                                </p>
                                <!--end::Desc-->
                            </div>

                            <!--begin::Team-->
                            <div class="d-flex align-items-center">
                                <!--begin::Pic-->
                                <a href="#" class="symbol symbol-45 symbol-light mr-3">
                                    <div class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/001-boy.svg" class="h-75 align-self-end" alt="" />
                                    </div>
                                </a>
                                <!--end::Pic-->

                                <!--begin::Pic-->
                                <a href="#" class="symbol symbol-45 symbol-light mr-3">
                                    <div class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/028-girl-16.svg" class="h-75 align-self-end" alt="" />
                                    </div>
                                </a>
                                <!--end::Pic-->

                                <!--begin: Pic-->
                                <a href="#" class="symbol symbol-45 symbol-light mr-3">
                                    <div class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/024-boy-9.svg" class="h-75 align-self-end" alt="" />
                                    </div>
                                </a>
                                <!--end::Pic-->

                                <!--begin::Pic-->
                                <a href="#" class="symbol symbol-45 symbol-light">
                                    <div class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/005-girl-2.svg" class="h-75 align-self-end" alt="" />
                                    </div>
                                </a>
                                <!--end::Pic-->
                            </div>
                            <!--end::Team-->
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 11-->
                </div>
                <div class="col-xl-4">
                    <!--begin::Mixed Widget 12-->
                    <div class="card card-custom card-stretch gutter-b">
                        <!--begin::Body-->
                        <div class="card-body d-flex flex-column">
                            <div class="flex-grow-1 pb-5">
                                <!--begin::Info-->
                                <div class="d-flex align-items-center pr-2 mb-6">
                                    <span class="text-muted font-weight-bold font-size-lg flex-grow-1">
                                        5 Weeks Ago
                                    </span>
                                    <div class="symbol symbol-50">
                                        <span class="symbol-label bg-light-light">
                                            <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/003-puzzle.svg" class="h-50 align-self-center" alt="" />
                                        </span>
                                    </div>
                                </div>
                                <!--end::Info-->

                                <a href="#" class="text-dark font-weight-bolder text-hover-primary font-size-h4">
                                    KT.com - High Quality<br />
                                    Templates
                                </a>

                                <!--begin::Desc-->
                                <p class="text-dark-50 font-weight-normal font-size-lg mt-6">
                                    Easy to use, incredibly flexible and secure<br />
                                    with in-depth documentation that outlines<br />
                                    everything for you
                                </p>
                                <!--end::Desc-->
                            </div>

                            <!--begin::Team-->
                            <div class="d-flex align-items-center">
                                <!--begin::Pic-->
                                <a href="#" class="symbol symbol-45 symbol-light mr-3">
                                    <div class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/001-boy.svg" class="h-75 align-self-end" alt="" />
                                    </div>
                                </a href="#">
                                <!--end::Pic-->

                                <!--begin::Pic-->
                                <a href="#" class="symbol symbol-45 symbol-light mr-3">
                                    <div class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/028-girl-16.svg" class="h-75 align-self-end" alt="" />
                                    </div>
                                </a>
                                <!--end::Pic-->

                                <!--begin::Pic-->
                                <a href="#" class="symbol symbol-45 symbol-light">
                                    <div class="symbol-label">
                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/avatars/024-boy-9.svg" class="h-75 align-self-end" alt="" />
                                    </div>
                                </a>
                                <!--end::Pic-->
                            </div>
                            <!--end::Team-->
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 12-->
                </div>
            </div>
            <!--end::Row-->

            <!--begin::Row-->
            <div class="row">
                <div class="col-lg-4">
                    <!--begin::Mixed Widget 16-->
                    <div class="card card-custom card-stretch gutter-b">
                        <!--begin::Header-->
                        <div class="card-header border-0 pt-5">
                            <div class="card-title font-weight-bolder">
                                <div class="card-label">
                                    Weekly Sales Stats
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
                                        <ul class="navi navi-hover">
                                            <li class="navi-header font-weight-bold py-4">
                                                <span class="font-size-lg">Choose Label:</span>
                                                <i class="flaticon2-information icon-md text-muted" data-toggle="tooltip" data-placement="right" title="Click to learn more..."></i>
                                            </li>
                                            <li class="navi-separator mb-3 opacity-70"></li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-text">
                                                        <span class="label label-xl label-inline label-light-success">Customer</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-text">
                                                        <span class="label label-xl label-inline label-light-danger">Partner</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-text">
                                                        <span class="label label-xl label-inline label-light-warning">Suplier</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-text">
                                                        <span class="label label-xl label-inline label-light-primary">Member</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="navi-item">
                                                <a href="#" class="navi-link">
                                                    <span class="navi-text">
                                                        <span class="label label-xl label-inline label-light-dark">Staff</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="navi-separator mt-3 opacity-70"></li>
                                            <li class="navi-footer py-4">
                                                <a class="btn btn-clean font-weight-bold btn-sm" href="#">
                                                    <i class="ki ki-plus icon-sm"></i>
                                                    Add new
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
                            <!--begin::Chart-->
                            <div id="kt_mixed_widget_16_chart" style="height: 200px"></div>
                            <!--end::Chart-->

                            <!--begin::Items-->
                            <div class="mt-10 mb-5">
                                <div class="row row-paddingless mb-10">
                                    <!--begin::Item-->
                                    <div class="col">
                                        <div class="d-flex align-items-center mr-2">
                                            <!--begin::Symbol-->
                                            <div class="symbol symbol-45 symbol-light-info mr-4 flex-shrink-0">
                                                <div class="symbol-label">
                                                    <span class="svg-icon svg-icon-lg svg-icon-info">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Shopping/Cart3.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <path d="M12,4.56204994 L7.76822128,9.6401844 C7.4146572,10.0644613 6.7840925,10.1217854 6.3598156,9.76822128 C5.9355387,9.4146572 5.87821464,8.7840925 6.23177872,8.3598156 L11.2317787,2.3598156 C11.6315738,1.88006147 12.3684262,1.88006147 12.7682213,2.3598156 L17.7682213,8.3598156 C18.1217854,8.7840925 18.0644613,9.4146572 17.6401844,9.76822128 C17.2159075,10.1217854 16.5853428,10.0644613 16.2317787,9.6401844 L12,4.56204994 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                                                                <path d="M3.5,9 L20.5,9 C21.0522847,9 21.5,9.44771525 21.5,10 C21.5,10.132026 21.4738562,10.2627452 21.4230769,10.3846154 L17.7692308,19.1538462 C17.3034221,20.271787 16.2111026,21 15,21 L9,21 C7.78889745,21 6.6965779,20.271787 6.23076923,19.1538462 L2.57692308,10.3846154 C2.36450587,9.87481408 2.60558331,9.28934029 3.11538462,9.07692308 C3.23725479,9.02614384 3.36797398,9 3.5,9 Z M12,17 C13.1045695,17 14,16.1045695 14,15 C14,13.8954305 13.1045695,13 12,13 C10.8954305,13 10,13.8954305 10,15 C10,16.1045695 10.8954305,17 12,17 Z" fill="#000000" />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </div>
                                            </div>
                                            <!--end::Symbol-->

                                            <!--begin::Title-->
                                            <div>
                                                <div class="font-size-h4 text-dark-75 font-weight-bolder">$2,034</div>
                                                <div class="font-size-sm text-muted font-weight-bold mt-1">Author Sales</div>
                                            </div>
                                            <!--end::Title-->
                                        </div>
                                    </div>
                                    <!--end::Item-->

                                    <!--begin::Item-->
                                    <div class="col">
                                        <div class="d-flex align-items-center mr-2">
                                            <!--begin::Symbol-->
                                            <div class="symbol symbol-45 symbol-light-danger mr-4 flex-shrink-0">
                                                <div class="symbol-label">
                                                    <span class="svg-icon svg-icon-lg svg-icon-danger">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Home/Library.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <path d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z" fill="#000000" />
                                                                <rect fill="#000000" opacity="0.3" transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519) " x="16.3255682" y="2.94551858" width="3" height="18" rx="1" />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </div>
                                            </div>
                                            <!--end::Symbol-->

                                            <!--begin::Title-->
                                            <div>
                                                <div class="font-size-h4 text-dark-75 font-weight-bolder">$706</div>
                                                <div class="font-size-sm text-muted font-weight-bold mt-1">Commission</div>
                                            </div>
                                            <!--end::Title-->
                                        </div>
                                    </div>
                                    <!--end::Item-->
                                </div>

                                <div class="row row-paddingless">
                                    <!--begin::Item-->
                                    <div class="col">
                                        <div class="d-flex align-items-center mr-2">
                                            <!--begin::Symbol-->
                                            <div class="symbol symbol-45 symbol-light-success mr-4 flex-shrink-0">
                                                <div class="symbol-label">
                                                    <span class="svg-icon svg-icon-lg svg-icon-success">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Shopping/Cart3.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <path d="M12,4.56204994 L7.76822128,9.6401844 C7.4146572,10.0644613 6.7840925,10.1217854 6.3598156,9.76822128 C5.9355387,9.4146572 5.87821464,8.7840925 6.23177872,8.3598156 L11.2317787,2.3598156 C11.6315738,1.88006147 12.3684262,1.88006147 12.7682213,2.3598156 L17.7682213,8.3598156 C18.1217854,8.7840925 18.0644613,9.4146572 17.6401844,9.76822128 C17.2159075,10.1217854 16.5853428,10.0644613 16.2317787,9.6401844 L12,4.56204994 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                                                                <path d="M3.5,9 L20.5,9 C21.0522847,9 21.5,9.44771525 21.5,10 C21.5,10.132026 21.4738562,10.2627452 21.4230769,10.3846154 L17.7692308,19.1538462 C17.3034221,20.271787 16.2111026,21 15,21 L9,21 C7.78889745,21 6.6965779,20.271787 6.23076923,19.1538462 L2.57692308,10.3846154 C2.36450587,9.87481408 2.60558331,9.28934029 3.11538462,9.07692308 C3.23725479,9.02614384 3.36797398,9 3.5,9 Z M12,17 C13.1045695,17 14,16.1045695 14,15 C14,13.8954305 13.1045695,13 12,13 C10.8954305,13 10,13.8954305 10,15 C10,16.1045695 10.8954305,17 12,17 Z" fill="#000000" />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </div>
                                            </div>
                                            <!--end::Symbol-->

                                            <!--begin::Title-->
                                            <div>
                                                <div class="font-size-h4 text-dark-75 font-weight-bolder">$49</div>
                                                <div class="font-size-sm text-muted font-weight-bold mt-1">Average Bid</div>
                                            </div>
                                            <!--end::Title-->
                                        </div>
                                    </div>
                                    <!--end::Item-->

                                    <!--begin::Item-->
                                    <div class="col">
                                        <div class="d-flex align-items-center mr-2">
                                            <!--begin::Symbol-->
                                            <div class="symbol symbol-45 symbol-light-primary mr-4 flex-shrink-0">
                                                <div class="symbol-label">
                                                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Shopping/Barcode-read.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <rect fill="#000000" opacity="0.3" x="4" y="4" width="8" height="16" />
                                                                <path d="M6,18 L9,18 C9.66666667,18.1143819 10,18.4477153 10,19 C10,19.5522847 9.66666667,19.8856181 9,20 L4,20 L4,15 C4,14.3333333 4.33333333,14 5,14 C5.66666667,14 6,14.3333333 6,15 L6,18 Z M18,18 L18,15 C18.1143819,14.3333333 18.4477153,14 19,14 C19.5522847,14 19.8856181,14.3333333 20,15 L20,20 L15,20 C14.3333333,20 14,19.6666667 14,19 C14,18.3333333 14.3333333,18 15,18 L18,18 Z M18,6 L15,6 C14.3333333,5.88561808 14,5.55228475 14,5 C14,4.44771525 14.3333333,4.11438192 15,4 L20,4 L20,9 C20,9.66666667 19.6666667,10 19,10 C18.3333333,10 18,9.66666667 18,9 L18,6 Z M6,6 L6,9 C5.88561808,9.66666667 5.55228475,10 5,10 C4.44771525,10 4.11438192,9.66666667 4,9 L4,4 L9,4 C9.66666667,4 10,4.33333333 10,5 C10,5.66666667 9.66666667,6 9,6 L6,6 Z" fill="#000000" fill-rule="nonzero" />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </div>
                                            </div>
                                            <!--end::Symbol-->

                                            <!--begin::Title-->
                                            <div>
                                                <div class="font-size-h4 text-dark-75 font-weight-bolder">$5.8M</div>
                                                <div class="font-size-sm text-muted font-weight-bold mt-1">All Time Sales</div>
                                            </div>
                                            <!--end::Title-->
                                        </div>
                                    </div>
                                    <!--end::Item-->
                                </div>
                            </div>
                            <!--end::Items-->
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 16-->
                </div>
                <div class="col-lg-8">
                    <!--begin::Base Table Widget 2-->
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
                                        <a class="nav-link py-2 px-4" data-toggle="tab" href="#kt_tab_pane_2_1">Month</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-4" data-toggle="tab" href="#kt_tab_pane_2_2">Week</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-4 active" data-toggle="tab" href="#kt_tab_pane_2_3">Day</a>
                                    </li>
                                </ul>
                            </div>
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
                                            <th class="p-0" style="min-width: 150px"></th>
                                            <th class="p-0" style="min-width: 140px"></th>
                                            <th class="p-0" style="min-width: 120px"></th>
                                            <th class="p-0" style="min-width: 40px"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="pl-0 py-5">
                                                <div class="symbol symbol-50 symbol-light mr-2">
                                                    <span class="symbol-label">
                                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/006-plurk.svg" class="h-50 align-self-center" alt="" />
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">Top Authors</a>
                                                <span class="text-muted font-weight-bold d-block">Successful Fellas</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-bold">
                                                    ReactJs, HTML
                                                </span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-bold">
                                                    4600 Users
                                                </span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-success">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Navigation/Arrow-right.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                                <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1" />
                                                                <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) " />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pl-0 py-5">
                                                <div class="symbol symbol-50 symbol-light mr-2">
                                                    <span class="symbol-label">
                                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/015-telegram.svg" class="h-50 align-self-center" alt="" />
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">Popular Authors</a>
                                                <span class="text-muted font-weight-bold d-block">Most Successful</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-bold">
                                                    Python, MySQL
                                                </span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-bold">
                                                    7200 Users
                                                </span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-success">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Navigation/Arrow-right.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                                <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1" />
                                                                <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) " />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pl-0 py-5">
                                                <div class="symbol symbol-50 symbol-light mr-2">
                                                    <span class="symbol-label">
                                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/003-puzzle.svg" class="h-50 align-self-center" alt="" />
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">New Users</a>
                                                <span class="text-muted font-weight-bold d-block">Awesome Users</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-bold">
                                                    Laravel, Metronic
                                                </span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-bold">
                                                    890 Users
                                                </span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-success">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Navigation/Arrow-right.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                                <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1" />
                                                                <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) " />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pl-0 py-5">
                                                <div class="symbol symbol-50 symbol-light mr-2">
                                                    <span class="symbol-label">
                                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/005-bebo.svg" class="h-50 align-self-center" alt="" />
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">Active Customers</a>
                                                <span class="text-muted font-weight-bold d-block">Best Customers</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-bold">
                                                    AngularJS, C#
                                                </span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-bold">
                                                    6370 Users
                                                </span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-success">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Navigation/Arrow-right.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                                <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1" />
                                                                <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) " />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pl-0 py-5">
                                                <div class="symbol symbol-50 symbol-light mr-2">
                                                    <span class="symbol-label">
                                                        <img src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/misc/014-kickstarter.svg" class="h-50 align-self-center" alt="" />
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">Bestseller Theme</a>
                                                <span class="text-muted font-weight-bold d-block">Amazing Templates</span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-bold">
                                                    ReactJS, Ruby
                                                </span>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-muted font-weight-bold">
                                                    354 Users
                                                </span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-success">
                                                        <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Navigation/Arrow-right.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                                <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1" />
                                                                <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) " />
                                                            </g>
                                                        </svg>
                                                        <!--end::Svg Icon--></span> </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--end::Table-->
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Base Table Widget 2-->
                </div>
            </div>
            <!--end::Row-->
            <!--end::Dashboard-->
        </div>
        <!--end::Container-->
    </div>
    <!--end::Entry-->
</div>
@endsection
@section('scripts')
<script src="{{asset('dash/js/charts/reports/index.js')}}" type="text/javascript"></script>
@endsection
