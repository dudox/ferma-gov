@extends('layouts.dashboard')
@section('title','Accounts')

@section('content')
<div class="content  d-flex flex-column flex-column-fluid" id="kt_content">
    <div class="subheader py-2 py-lg-4  subheader-transparent " id="kt_subheader">
        <div class=" container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <div class="d-flex align-items-center flex-wrap mr-2">
                <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">
                    Edit User </h5>
                <div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-5 bg-gray-200"></div>
                <div class="d-flex align-items-center" id="kt_subheader_search">
                    <span class="text-dark-50 font-weight-bold" id="kt_subheader_total">
                        {{$users->name}}
                    </span>
                </div>

            </div>
            <!--end::Details-->

            <!--begin::Toolbar-->
            {{-- <div class="d-flex align-items-center">
                <!--begin::Button-->
                <a href="/metronic/preview/demo9/#.html" class="btn btn-default font-weight-bold btn-sm px-3 font-size-base">

                    Back </a>
                <!--end::Button-->

                <!--begin::Dropdown-->
                <div class="btn-group ml-2">
                    <button type="button" class="btn btn-primary font-weight-bold btn-sm px-3 font-size-base">

                        Save Changes </button>

                    <button type="button" class="btn btn-primary font-weight-bold btn-sm px-3 font-size-base dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>

                    <div class="dropdown-menu dropdown-menu-sm p-0 m-0 dropdown-menu-right">
                        <ul class="navi py-5">
                            <li class="navi-item">
                                <a href="#" class="navi-link">
                                    <span class="navi-icon"><i class="flaticon2-writing"></i></span>
                                    <span class="navi-text">Save &amp; continue</span>
                                </a>
                            </li>
                            <li class="navi-item">
                                <a href="#" class="navi-link">
                                    <span class="navi-icon"><i class="flaticon2-medical-records"></i></span>
                                    <span class="navi-text">Save &amp; add new</span>
                                </a>
                            </li>
                            <li class="navi-item">
                                <a href="#" class="navi-link">
                                    <span class="navi-icon"><i class="flaticon2-hourglass-1"></i></span>
                                    <span class="navi-text">Save &amp; exit</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--end::Dropdown-->

            </div> --}}
            <!--end::Toolbar-->
        </div>
    </div>
    <!--end::Subheader-->

    <div class="d-flex flex-column-fluid">
        <div class=" container ">
            <div class="card card-custom">
                <div class="card-header card-header-tabs-line nav-tabs-line-3x">
                    <div class="card-toolbar">
                        <ul id="myTab" class="nav nav-tabs nav-bold nav-tabs-line nav-tabs-line-3x">

                            <li class="nav-item mr-3">
                                <a class="nav-link active" data-toggle="tab" href="#kt_user_edit_tab_1">
                                    <span class="nav-icon"><span class="svg-icon">
                                            <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/General/User.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <polygon points="0 0 24 0 24 24 0 24" />
                                                    <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                                                    <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fill-rule="nonzero" />
                                                </g>
                                            </svg>
                                            <!--end::Svg Icon--></span></span>
                                    <span class="nav-text font-size-lg">Account</span>
                                </a>
                            </li>
                            <li class="nav-item mr-3">
                                <a class="nav-link" data-toggle="tab" href="#kt_user_edit_tab_2">
                                    <span class="nav-icon"><span class="svg-icon">
                                            <!--begin::Svg Icon | path:/metronic/themes/metronic/theme/html/demo9/dist/assets/media/svg/icons/Communication/Shield-user.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <rect x="0" y="0" width="24" height="24" />
                                                    <path d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z" fill="#000000" opacity="0.3" />
                                                    <path d="M12,11 C10.8954305,11 10,10.1045695 10,9 C10,7.8954305 10.8954305,7 12,7 C13.1045695,7 14,7.8954305 14,9 C14,10.1045695 13.1045695,11 12,11 Z" fill="#000000" opacity="0.3" />
                                                    <path d="M7.00036205,16.4995035 C7.21569918,13.5165724 9.36772908,12 11.9907452,12 C14.6506758,12 16.8360465,13.4332455 16.9988413,16.5 C17.0053266,16.6221713 16.9988413,17 16.5815,17 C14.5228466,17 11.463736,17 7.4041679,17 C7.26484009,17 6.98863236,16.6619875 7.00036205,16.4995035 Z" fill="#000000" opacity="0.3" />
                                                </g>
                                            </svg>
                                            <!--end::Svg Icon--></span></span>
                                    <span class="nav-text font-size-lg">Change Password</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>

                <div class="card-body px-0">

                    <div class="tab-content">

                        <div class="tab-pane active px-7" id="kt_user_edit_tab_1" role="tabpanel">
                            <!--begin::Row-->
                            <form class="form" method="post" action="{{ route('account.info.update') }}" id="kt_form">
                                @csrf
                                <div class="row justify-content-center">
                                    <div class="col-xl-7">
                                        <div class="my-2">
                                            <!--begin::Row-->
                                            <div class="row">
                                                <label class="col-form-label col-3 text-lg-right text-left"></label>
                                                <div class="col-12">
                                                    @if(session()->has('personal'))
                                                        <div  class=" alert alert-primary">
                                                            <button type="button" class="close text-white" data-dismiss="alert">x</button>
                                                            {{ session()->get('personal') }}
                                                        </div>
                                                    @endif
                                                </div>
                                                <div class="col-12">
                                                    <h6 class=" text-dark font-weight-bold mb-10">Update account information</h6>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="">Full Name</label>
                                                <input name="name" class="form-control form-control-lg form-control-solid" type="text" value="{{ $users->name }}" required/>
                                            </div>

                                            <div class="form-group">
                                                <label class="">Email Address</label>
                                                <input name="email" type="text" class="form-control form-control-lg form-control-solid" value="{{ $users->email }}" placeholder="Email" required/>
                                                <span class="form-text text-muted">Email will not be publicly displayed. <a href="#">Learn more</a>.</span>
                                            </div>

                                            <div class="form-group">
                                                <label>Role</label>
                                                <select class="form-control form-control-lg form-control-solid">
                                                    <option>@if(empty($users->regions->zone)) National Supervisor @else {{ $users->regions->zone }} @endif</option>
                                                </select>
                                            </div>
                                            <div class="col-xl-7">
                                                <button class="btn btn-primary py-2">Save Changes <i class="fa fa-chevron-right fa-sm"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>


                        <div class="tab-pane px-7" id="kt_user_edit_tab_2" role="tabpanel">
                            <form class="form" method="post" action="{{ route('account.password.update') }}" id="kt_form">
                                @csrf
                                <div class="row justify-content-center">
                                    <div class="col-xl-7">
                                        <div class="my-2">
                                            <div class="row">
                                                <label class="col-form-label col-3 text-lg-right text-left"></label>
                                                <div class="col-12">
                                                    @if(session()->has('password'))
                                                        <div  class=" alert alert-{{ session()->get('color') }}">
                                                            <button type="button" class="close text-white" data-dismiss="alert">x</button>
                                                            {{ session()->get('password') }}
                                                        </div>
                                                    @endif
                                                </div>
                                                <div class="col-12">
                                                    <h6 class=" text-dark font-weight-bold mb-10">Security:</h6>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label>Current Password</label>
                                                <input class="form-control form-control-lg form-control-solid mb-1" type="password" name="old" value="" />
                                                <a href="#" class="font-weight-bold font-size-sm">Forgot password ?</a>
                                                @error('old')
                                                   <span class="d-block text-danger">
                                                    {{ $message }}
                                                   </span>
                                                @enderror
                                            </div>

                                            <div class="form-group">
                                                <label class="">New Password</label>
                                                <input class="form-control form-control-lg form-control-solid" type="password" name="password" value="" />
                                                @error('password')
                                                   <span class="d-block text-danger">
                                                    {{ $message }}
                                                   </span>
                                                @enderror
                                            </div>

                                            <div class="form-group">
                                                <label class="">Verify Password</label>
                                                <input class="form-control form-control-lg form-control-solid" type="password" name="confirm" value="" />
                                                @error('confirm')
                                                   <span class="d-block text-danger">
                                                    {{ $message }}
                                                   </span>
                                                @enderror
                                            </div>
                                            <div class="form-group">
                                                <button class="btn btn-primary py-2">
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>

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
