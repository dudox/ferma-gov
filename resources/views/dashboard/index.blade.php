@extends('layouts.dashboard')
@section('title', 'Dashboard')
@section('dashboard_a','menu-item-here')
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
                    <!--begin::Mixed Widget 2-->
                    <div class="card card-custom bg-gray-100 gutter-b card-stretch">
                        <!--begin::Header-->
                        <div class="card-header border-0 bg-primary py-5">
                            <h3 class="card-title font-weight-bolder text-white">Projects Analysis</h3>
                        </div>
                        <!--end::Header-->

                        <!--begin::Body-->
                        <div class="card-body p-0 position-relative overflow-hidden">
                            <!--begin::Chart-->
                            <div id="reports_chart" data-chart="{{ json_encode($reports_zone) }}"></div>
                            <div id="kt_mixed_widget_2_chart" class="card-rounded-bottom bg-primary" style="height: 200px"></div>
                            <!--end::Chart-->

                            <!--begin::Stats-->
                            <div class="card-spacer mt-n25">
                                <!--begin::Row-->
                                <div class="row m-0">
                                    <div class="col bg-white px-6 py-8 rounded-xl mr-7 mb-7">
                                        <span class="svg-icon svg-icon-2x svg-icon-warning d-block my-2">
                                            <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo7/dist/assets/media/svg/icons/Media/Equalizer.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <rect x="0" y="0" width="24" height="24" />
                                                    <rect fill="#000000" opacity="0.3" x="13" y="4" width="3" height="16" rx="1.5" />
                                                    <rect fill="#000000" x="8" y="9" width="3" height="11" rx="1.5" />
                                                    <rect fill="#000000" x="18" y="11" width="3" height="9" rx="1.5" />
                                                    <rect fill="#000000" x="3" y="13" width="3" height="7" rx="1.5" />
                                                </g>
                                            </svg>
                                           <span class="font-weight-bolder h5 float-right" style="font-size: 20px !important;">{{count($entry_overall->where('status',1))}}</span>
                                        </span> <a href="#" class="text-warning font-weight-bold">
                                            UR Roads
                                        </a>
                                    </div>
                                    <div class="col bg-white px-6 py-8 rounded-xl mb-7">
                                        <span class="svg-icon svg-icon-2x svg-icon-info d-block my-2">
                                            <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo7/dist/assets/media/svg/icons/Media/Equalizer.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <rect x="0" y="0" width="24" height="24" />
                                                    <rect fill="#000000" opacity="0.3" x="13" y="4" width="3" height="16" rx="1.5" />
                                                    <rect fill="#000000" x="8" y="9" width="3" height="11" rx="1.5" />
                                                    <rect fill="#000000" x="18" y="11" width="3" height="9" rx="1.5" />
                                                    <rect fill="#000000" x="3" y="13" width="3" height="7" rx="1.5" />
                                                </g>
                                            </svg>
                                           <span class="font-weight-bolder h5 float-right" style="font-size: 20px !important;">{{count($entry_overall->where('status',2))}}</span>
                                        </span>
                                        <a href="#" class="text-info font-weight-bold mt-2">
                                            WIP Roads
                                        </a>
                                    </div>
                                </div>

                                <div class="row m-0">
                                    <div class="col bg-white px-6 py-8 rounded-xl mr-7 mb-7">
                                        <span class="svg-icon svg-icon-2x svg-icon-success d-block my-2">
                                            <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo7/dist/assets/media/svg/icons/Media/Equalizer.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <rect x="0" y="0" width="24" height="24" />
                                                    <rect fill="#000000" opacity="0.3" x="13" y="4" width="3" height="16" rx="1.5" />
                                                    <rect fill="#000000" x="8" y="9" width="3" height="11" rx="1.5" />
                                                    <rect fill="#000000" x="18" y="11" width="3" height="9" rx="1.5" />
                                                    <rect fill="#000000" x="3" y="13" width="3" height="7" rx="1.5" />
                                                </g>
                                            </svg>
                                           <span class="font-weight-bolder h5 float-right" style="font-size: 20px !important;">{{count($entry_overall->where('status',3))}}</span>
                                        </span> <a href="#" class="text-success font-weight-bold">
                                            Completed Roads
                                        </a>
                                    </div>
                                    <div class="col bg-white px-6 py-8 rounded-xl mb-7">
                                        <span class="svg-icon svg-icon-2x svg-icon-link d-block my-2">
                                            <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo7/dist/assets/media/svg/icons/Media/Equalizer.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <rect x="0" y="0" width="24" height="24" />
                                                    <rect fill="#000000" opacity="0.3" x="13" y="4" width="3" height="16" rx="1.5" />
                                                    <rect fill="#000000" x="8" y="9" width="3" height="11" rx="1.5" />
                                                    <rect fill="#000000" x="18" y="11" width="3" height="9" rx="1.5" />
                                                    <rect fill="#000000" x="3" y="13" width="3" height="7" rx="1.5" />
                                                </g>
                                            </svg>
                                           <span class="font-weight-bolder h5 float-right" style="font-size: 20px !important;">{{count($entry_overall)}}</span>
                                        </span>
                                        <a href="#" class="text-dark-50 font-weight-bold mt-2">
                                            Total Roads
                                        </a>
                                    </div>
                                </div>


                                <div class="row m-0">
                                    <div class="col bg-white px-6 py-8 rounded-xl">
                                        <span class="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <rect x="0" y="0" width="24" height="24" />
                                                    <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000" />
                                                    <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3" />
                                                </g>
                                            </svg>
                                            <span class="font-weight-bolder h5 float-right" style="font-size: 20px !important;">{{count($users)}}</span>
                                        </span>
                                        <a href="#" class="text-danger font-weight-bold font-size-h3 mt-2">
                                            Administrators
                                        </a>
                                    </div>

                                </div>
                                <!--end::Row-->
                            </div>
                            <!--end::Stats-->
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Mixed Widget 2-->
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
                                    <i class="fa fa-sm fa-road text-warning icon-xl"></i> UR&nbsp;
                                    <i class="fa fa-sm fa-road text-info icon-xl"></i> WIP&nbsp;
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
                    <div class="row ">
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
                        </div>
                    </div>
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
                                <span class="card-label font-weight-bolder text-dark">Most Actively Reported Federal Roads</span>
                                <span class="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span>
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
                                            <th class="p-0" style="width: 30px"></th>
                                            <th class="p-0" style="min-width: 200px"></th>
                                            <th class="p-0" style="min-width: 60px"></th>
                                            <th class="p-0" style="min-width: 205px"></th>
                                            <th class="p-0" style="min-width: 10px"></th>
                                            <th class="p-0" style="min-width: 50px"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($roads_prior as $item)
                                        <tr>
                                            <td class="pl-0 py-4">
                                                <div class="symbol symbol-30 symbol-{{$item->roads->progress->color_code}} mr-1">
                                                    <span class="symbol-label">
                                                        <i class="fa fa-road fa-lg text-white"></i>
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="pl-0">
                                                <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 badge badge-sm py-0">{{ucfirst($item->roads->name)}}</a>
                                                <div>
                                                    <span class="font-weight-bolder badge">{{$item->states->name}}:</span>
                                                    <a class="text-primary text-hover-primary badge badge-white badge-sm badge-pill small" href="{{ route('regions.single',str_replace(' ','_',$item->zones->zone)) }}"><u>{{$item->zones->zone}}</u></a>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                <span class="text-dark-75 font-weight-bolder small">
                                                    <span class="badge badge-light">Reports {{$item->total}}</span>
                                                </span>
                                            </td>
                                            <td class="text-left">
                                                <span class="text-dark font-weight-500 small">
                                                    {{$item->roads->progress->description}}
                                                </span>
                                            </td>
                                            <td class="text-right small">
                                                <span class="label label-sm label-light-{{$item->roads->progress->color_code}} label-inline">{{$item->roads->progress->name}}</span>
                                            </td>
                                            <td class="text-right pr-0">
                                                <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                                    <span class="svg-icon svg-icon-md svg-icon-primary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000" />
                                                                <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3" />
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </a>
                                            </td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection
@section('scripts')
<script src="{{asset('dash/js/charts/reports/index.js')}}" type="text/javascript"></script>
@endsection
