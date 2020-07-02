@extends('layouts.dashboard')

@section('content')
<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <!--begin::Subheader-->
    <div class="subheader py-2 py-lg-4 subheader-transparent" id="kt_subheader">
        <div class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <!--begin::Details-->
            <div class="d-flex align-items-center flex-wrap mr-2">
                <!--begin::Title-->
                <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">New User</h5>
                <!--end::Title-->
                <!--begin::Separator-->
                <div class="subheader-separator subheader-separator-ver mt-2 mb-2 mr-5 bg-gray-200"></div>
                <!--end::Separator-->
                <!--begin::Search Form-->
                <div class="d-flex align-items-center" id="kt_subheader_search">
                    <span class="text-dark-50 font-weight-bold" id="kt_subheader_total">Enter user details and submit</span>
                </div>
                <!--end::Search Form-->
            </div>
            <!--end::Details-->
            <!--begin::Toolbar-->
            {{-- <div class="d-flex align-items-center">
                <!--begin::Button-->
                <a href="/metronic/preview/demo9/#.html" class="btn btn-default font-weight-bold btn-sm px-3 font-size-base">Back</a>
                <!--end::Button-->
                <!--begin::Dropdown-->
                <div class="btn-group ml-2 show">
                    <button type="button" class="btn btn-primary font-weight-bold btn-sm px-3 font-size-base">Submit</button>
                    <button type="button" class="btn btn-primary font-weight-bold btn-sm px-3 font-size-base dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></button>
                    <div class="dropdown-menu dropdown-menu-sm p-0 m-0 dropdown-menu-right show" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-86px, 31px, 0px);">
                        <ul class="navi py-5">
                            <li class="navi-item">
                                <a href="#" class="navi-link">
                                    <span class="navi-icon">
                                        <i class="flaticon2-writing"></i>
                                    </span>
                                    <span class="navi-text">Save &amp; continue</span>
                                </a>
                            </li>
                            <li class="navi-item">
                                <a href="#" class="navi-link">
                                    <span class="navi-icon">
                                        <i class="flaticon2-medical-records"></i>
                                    </span>
                                    <span class="navi-text">Save &amp; add new</span>
                                </a>
                            </li>
                            <li class="navi-item">
                                <a href="#" class="navi-link">
                                    <span class="navi-icon">
                                        <i class="flaticon2-hourglass-1"></i>
                                    </span>
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
    <!--begin::Entry-->
    <div class="d-flex flex-column-fluid">
        <!--begin::Container-->
        <div class="container">
            <!--begin::Card-->
            <div class="card card-custom card-transparent">
                <div class="card-body p-0">
                    <!--begin::Wizard-->
                    <div class="wizard wizard-4" id="kt_wizard" data-wizard-state="first" data-wizard-clickable="true">
                        <!--begin::Card-->
                        <div class="card card-custom card-shadowless rounded-top-0">
                            <!--begin::Body-->
                            <div class="card-body p-0">
                                <div class="row justify-content-center py-8 px-8 py-lg-15 px-lg-10">
                                    <div class="col-xl-12 col-xxl-10">
                                        <!--begin::Wizard Form-->
                                        <form class="form fv-plugins-bootstrap fv-plugins-framework" id="kt_form" action="{{route('register.new')}}" method="POST">
                                            @csrf
                                            <div class="row justify-content-center">
                                                <div class="col-xl-9">
                                                    @if(session()->has('message'))
                                                        <div  class=" alert alert-success">
                                                            <button type="button" class="close text-white" data-dismiss="alert">x</button>
                                                            {{ session()->get('message') }}
                                                        </div>
                                                    @endif
                                                    <!--begin::Wizard Step 1-->
                                                    <div class="my-5 step" data-wizard-type="step-content" data-wizard-state="current">
                                                        <h5 class="text-dark font-weight-bold mb-10">User's Profile Details:</h5>
                                                        <!--begin::Group-->
                                                        <div class="form-group row">
                                                            <label class="col-xl-3 col-lg-3 col-form-label text-left">Avatar</label>
                                                            <div class="col-lg-9 col-xl-9">
                                                                <div class="image-input image-input-outline" id="kt_user_add_avatar">
                                                                    <div class="image-input-wrapper" style="background-image: url({{asset('assets/img/brand/coat.jpg')}})"></div>
                                                                    <label class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Change avatar">
                                                                        <i class="fa fa-pen icon-sm text-muted"></i>
                                                                        <input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg">
                                                                        <input type="hidden" name="profile_avatar_remove">
                                                                    </label>
                                                                    <span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="cancel" data-toggle="tooltip" title="" data-original-title="Cancel avatar">
                                                                        <i class="ki ki-bold-close icon-xs text-muted"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--end::Group-->
                                                        <!--begin::Group-->
                                                        <div class="form-group row fv-plugins-icon-container has-success">
                                                            <label class="col-xl-3 col-lg-3 col-form-label">First Name</label>
                                                            <div class="col-lg-9 col-xl-9">
                                                                <input class="form-control form-control-solid form-control-lg is-valid @error('firstname') is-invalid @enderror" name="firstname" type="text" value="" required>
                                                                @error('firstname')
                                                                    <div class="alert alert-danger">{{ $message }}</div>
                                                                @enderror
                                                            <div class="fv-plugins-message-container"></div></div>
                                                        </div>
                                                        <!--end::Group-->
                                                        <!--begin::Group-->
                                                        <div class="form-group row fv-plugins-icon-container has-success">
                                                            <label class="col-xl-3 col-lg-3 col-form-label">Last Name</label>
                                                            <div class="col-lg-9 col-xl-9">
                                                                <input class="form-control form-control-solid form-control-lg is-valid @error('lastname') is-invalid @enderror" name="lastname" type="text" value="" required>
                                                                @error('lastname')
                                                                    <div class="alert alert-danger">{{ $message }}</div>
                                                                @enderror
                                                            <div class="fv-plugins-message-container"></div></div>
                                                        </div>
                                                        <!--end::Group-->
                                                        <!--begin::Group-->
                                                        {{-- <div class="form-group row fv-plugins-icon-container has-success">
                                                            <label class="col-xl-3 col-lg-3 col-form-label">Contact Phone</label>
                                                            <div class="col-lg-9 col-xl-9">
                                                                <div class="input-group input-group-solid input-group-lg">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text">
                                                                            <i class="fa fa-phone"></i>
                                                                        </span>
                                                                    </div>
                                                                    <input type="text" class="form-control form-control-solid form-control-lg is-valid" name="phone" placeholder="Phone" required>
                                                                </div>
                                                                <span class="form-text text-muted">Enter valid Nigerian phone number(e.g: +2348012345678).</span>
                                                            <div class="fv-plugins-message-container"></div></div>
                                                        </div> --}}
                                                        <!--end::Group-->
                                                        <!--begin::Group-->
                                                        <div class="form-group row fv-plugins-icon-container has-success">
                                                            <label class="col-xl-3 col-lg-3 col-form-label">Email Address</label>
                                                            <div class="col-lg-9 col-xl-9">
                                                                <div class="input-group input-group-solid input-group-lg">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text">
                                                                            <i class="fa fa-at"></i>
                                                                        </span>
                                                                    </div>
                                                                    <input type="text" class="form-control form-control-solid form-control-lg is-valid @error('email') is-invalid @enderror" name="email" value="" required>
                                                                    @error('email')
                                                                        <div class="alert alert-danger">{{ $message }}</div>
                                                                    @enderror
                                                                </div>
                                                            <div class="fv-plugins-message-container"></div></div>
                                                        </div>
                                                        <div class="form-group row fv-plugins-icon-container has-success">
                                                            <label class="col-xl-3 col-lg-3 col-form-label">Role</label>
                                                            <div class="col-9">
                                                                <select name="role" onchange="showOptions(this)" class="form-control form-control-lg form-control-solid @error('role') is-invalid @enderror">
                                                                    <option>Select Role...</option>
                                                                    <option value="1" >Regional Supervisor</option>
                                                                    <option value="2">National Supervisor</option>
                                                                    @error('role')
                                                                        <div class="alert alert-danger">{{ $message }}</div>
                                                                    @enderror
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <!--end::Group-->
                                                        <!--begin::Group-->
                                                        <div class="form-group" id="regions" style="display: none">
                                                        <fieldset class="form-group">
                                                            <div class="row">
                                                              <legend class="col-xl-3 col-lg-3 col-form-label">Assign region</legend>
                                                              <div class="col-9">
                                                                <div class="form-check">
                                                                  <input class="form-check-input" type="radio" name="region" id="region1" value="1" >
                                                                  <label class="form-check-label" for="region1">
                                                                    North Central
                                                                  </label>
                                                                </div>
                                                                <div class="form-check">
                                                                  <input class="form-check-input" type="radio" name="region" id="region2" value="2">
                                                                  <label class="form-check-label" for="region2">
                                                                    North East
                                                                  </label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="radio" name="region" id="region3" value="3">
                                                                    <label class="form-check-label" for="region3">
                                                                      North West
                                                                    </label>
                                                                  </div>
                                                                  <div class="form-check">
                                                                    <input class="form-check-input" type="radio" name="region" id="region4" value="4">
                                                                    <label class="form-check-label" for="region4">
                                                                      South East
                                                                    </label>
                                                                  </div>
                                                                  <div class="form-check">
                                                                    <input class="form-check-input" type="radio" name="region" id="region5" value="5">
                                                                    <label class="form-check-label" for="region5">
                                                                      South South
                                                                    </label>
                                                                  </div>
                                                                  <div class="form-check">
                                                                    <input class="form-check-input" type="radio" name="region" id="region6" value="6">
                                                                    <label class="form-check-label" for="region6">
                                                                      South West
                                                                    </label>
                                                                  </div>
                                                                @error('region')
                                                                    <div class="alert alert-danger">{{ $message }}</div>
                                                                @enderror
                                                              </div>
                                                            </div>
                                                          </fieldset>
                                                        </div>
                                                        <!--end::Group-->
                                                         <!--end::Group-->
                                                        <!--begin::Group-->
                                                        <div class="form-group row fv-plugins-icon-container has-success">
                                                            <label class="col-xl-3 col-lg-3 col-form-label">Password</label>
                                                            <div class="col-lg-9 col-xl-9">
                                                                <input class="form-control form-control-solid form-control-lg is-valid @error('password') is-invalid @enderror" name="password" type="password" value="" required>
                                                            @error('password')
                                                                <div class="alert alert-danger">{{ $message }}</div>
                                                            @enderror
                                                            <div class="fv-plugins-message-container"></div></div>
                                                        </div>
                                                        <!--end::Group-->
                                                        <!--begin::Group-->
                                                    </div>
                                                    <!--end::Wizard Step 1-->
                                                    <!--begin::Wizard Actions-->
                                                    <div class="d-flex justify-content-center border-top pt-10 mt-15">
                                                        <div class="col-xl-7">
                                                            <button class="btn btn-primary py-2">Submit</button>
                                                        </div>
                                                    </div>
                                                    <!--end::Wizard Actions-->
                                                </div>
                                            </div>
                                        <div></div><div></div><div></div></form>
                                        <!--end::Wizard Form-->
                                    </div>
                                </div>
                            </div>
                            <!--end::Body-->
                        </div>
                        <!--end::Card-->
                    </div>
                    <!--end::Wizard-->
                </div>
            </div>
            <!--end::Card-->
        </div>
        <!--end::Container-->
    </div>
    <!--end::Entry-->
</div>
@endsection
@section('scripts')
    <script>
        $(".alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
        function showOptions(s) {
            var x = document.getElementById("regions");
            if(s[s.selectedIndex].value=="1"){
                x.style.display = "block";
             }else{
                 x.style.display = "none";
             }
            }
    </script>
@endsection
