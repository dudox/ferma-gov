@extends('layouts.dashboard')
@section('title', 'Configurations')
@section('content')
<div class="content  d-flex flex-column flex-column-fluid" id="kt_content">
    <div class="subheader py-2 py-lg-4  subheader-transparent " id="kt_subheader">
        <div class=" container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <div class="d-flex align-items-center flex-wrap mr-2">
                <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">
                    Configurations </h5>
                <div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-5 bg-gray-200"></div>
                <div class="d-flex align-items-center" id="kt_subheader_search">
                    <span class="text-dark-50 font-weight-bold" id="kt_subheader_total">
                       <i class="fa fa-cog fa-sm"></i> settings
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex flex-column-fluid">
        <div class=" container ">
            <div class="card card-custom">
                <div class="card-header card-header-tabs-line nav-tabs-line-3x">
                    <div class="card-toolbar">
                        <ul id="myTab" class="nav nav-tabs nav-bold nav-tabs-line nav-tabs-line-3x">
                            <li class="nav-item mr-3">
                                <a class="nav-link active" data-toggle="tab" href="#kt_user_edit_tab_1">
                                  <span class="navi-icon mr-4">
                                    <span class="svg-icon svg-icon-lg">
                                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                          <rect x="0" y="0" width="24" height="24"></rect>
                                          <path d="M6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,13 C19,13.5522847 18.5522847,14 18,14 L6,14 C5.44771525,14 5,13.5522847 5,13 L5,3 C5,2.44771525 5.44771525,2 6,2 Z M13.8,4 C13.1562,4 12.4033,4.72985286 12,5.2 C11.5967,4.72985286 10.8438,4 10.2,4 C9.0604,4 8.4,4.88887193 8.4,6.02016349 C8.4,7.27338783 9.6,8.6 12,10 C14.4,8.6 15.6,7.3 15.6,6.1 C15.6,4.96870845 14.9396,4 13.8,4 Z" fill="#000000" opacity="0.3"></path>
                                          <path d="M3.79274528,6.57253826 L12,12.5 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 Z" fill="#000000"></path>
                                        </g>
                                      </svg>
                                      <!--end::Svg Icon-->
                                    </span>
                                  </span>
                                    <span class="nav-text font-size-lg">Screens</span>
                                </a>
                            </li>
                            {{-- <li class="nav-item mr-3">
                                <a class="nav-link" data-toggle="tab" href="#kt_user_edit_tab_2">
                                  <span class="navi-icon mr-4">
                                    <span class="svg-icon svg-icon-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                                <path d="M4.85714286,1 L11.7364114,1 C12.0910962,1 12.4343066,1.12568431 12.7051108,1.35473959 L17.4686994,5.3839416 C17.8056532,5.66894833 18,6.08787823 18,6.52920201 L18,19.0833333 C18,20.8738751 17.9795521,21 16.1428571,21 L4.85714286,21 C3.02044787,21 3,20.8738751 3,19.0833333 L3,2.91666667 C3,1.12612489 3.02044787,1 4.85714286,1 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                                <path d="M6.85714286,3 L14.7364114,3 C15.0910962,3 15.4343066,3.12568431 15.7051108,3.35473959 L20.4686994,7.3839416 C20.8056532,7.66894833 21,8.08787823 21,8.52920201 L21,21.0833333 C21,22.8738751 20.9795521,23 19.1428571,23 L6.85714286,23 C5.02044787,23 5,22.8738751 5,21.0833333 L5,4.91666667 C5,3.12612489 5.02044787,3 6.85714286,3 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z" fill="#000000" fill-rule="nonzero"></path>
                                            </g>
                                        </svg>
                                      <!--end::Svg Icon-->
                                    </span>
                                  </span>
                                    <span class="nav-text font-size-lg">@Override Limits</span>
                                </a>
                            </li> --}}
                        </ul>
                    </div>
                </div>

                <div class="card-body px-0">
                    <div class="tab-content">
                        <div class="tab-pane active px-7" id="kt_user_edit_tab_1" role="tabpanel">
                            <!--begin::Row-->
                            <form class="form" method="post" action="{{ route('screens.update') }}" id="kt_form">
                                @csrf
                                <div class="row justify-content-center">
                                    <div class="col-xl-7">
                                        <div class="my-2">
                                            <!--begin::Row-->
                                            <div class="row">
                                                <label class="col-form-label col-3 text-lg-right text-left"></label>
                                                <div class="col-12">
                                                    @if(session()->has('success'))
                                                        <div  class=" alert alert-primary">
                                                            <button type="button" class="close text-white" data-dismiss="alert">x</button>
                                                            {{ session()->get('success') }}
                                                        </div>
                                                    @endif
                                                </div>
                                                <div class="col-12">
                                                    <h6 class=" text-dark font-weight-bold mb-10">Manage Screen Messages</h6>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                              <input class="form-control" placeholder="First Option" type="text" name="first" value="{{$screenOne->value}}" required>
                                            </div>
                                            <div class="form-group">
                                              <input class="form-control" placeholder="Second option" type="text" name="second" value="{{$screenTwo->value}}" required>

                                            </div>
                                            <div class="form-group">
                                                <button class="btn btn-primary py-2">Update Screen Messages &nbsp;<i class="fa fa-chevron-right fa-sm"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {{-- <div class="tab-pane px-7" id="kt_user_edit_tab_2" role="tabpanel">
                            <!--begin::Row-->
                            <form class="form" method="post" action="{{ route('override.update') }}" id="kt_form">
                                @csrf
                                <div class="row justify-content-center">
                                    <div class="col-xl-7">
                                        <div class="my-2">
                                            <!--begin::Row-->
                                            <div class="row">
                                                <label class="col-form-label col-3 text-lg-right text-left"></label>
                                                <div class="col-12">
                                                    @if(session()->has('success1'))
                                                        <div  class=" alert alert-primary }}">
                                                            <button type="button" class="close text-white" data-dismiss="alert">x</button>
                                                            {{ session()->get('success1') }}
                                                        </div>
                                                    @endif
                                                </div>
                                                <div class="col-12">
                                                    <h6 class=" text-dark font-weight-bold mb-10">@Override Road Health Limits</h6>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="bad-level">Bad Level
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                                        <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                                        <div class="progress-bar bg-info" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                                      </div>
                                                </label>
                                              <input class="form-control" placeholder="Bad Level Cap" type="text" name="bad" value="{{$status[3]['cap']}}" required>
                                              <span></span>
                                            </div>
                                            <div class="form-group">
                                                <label for="bad-level">Critical Level
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                                        <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                                        <div class="progress-bar bg-info" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                                        <div class="progress-bar bg-danger" role="progressbar" style="width:30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                                      </div>
                                                </label>
                                              <input class="form-control" placeholder="Critical Level Cap" type="text" name="critical" value="{{$status[4]['cap']}}" required>

                                            </div>
                                            <div class="form-group">
                                                <button class="btn btn-primary py-2">Set Level &nbsp;<i class="fa fa-chevron-right fa-sm"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div> --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('scripts')
    <script>
        $(".alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            localStorage.setItem('activeTab', $(e.target).attr('href'));
        });

        var activeTab = localStorage.getItem('activeTab');
        if(activeTab){
            $('.nav-tabs a[href="' + activeTab + '"]').tab('show');
        }
    </script>
@endsection
