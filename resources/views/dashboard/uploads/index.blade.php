
<!DOCTYPE html>

<html lang="en" >
    <head>
        <meta charset="utf-8"/>
        <title>{{env('APP_NAME')}} | iReporter</title>
        <meta name="description" content="Login page example"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css">
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">

        <link href="{{asset('dash/css/calendar.css')}}" rel="stylesheet" type="text/css" />
        <link href="{{asset('dash/css/bootstrap.min.css?v=7.0.5')}}" rel="stylesheet" type="text/css" />
        <link href="{{asset('dash/css/prismjs.css?v=7.0.5')}}" rel="stylesheet" type="text/css" />
        <link href="{{asset('dash/css/ferma-dashboard.css?v=7.0.5')}}" rel="stylesheet" type="text/css" />

        <link rel="shortcut icon" href="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/logos/favicon.ico" />
        <style>
              .background {
            background: url('https://i2.wp.com/media.premiumtimesng.com/wp-content/files/2017/10/ferma-project-site-e1507349081183.jpg?fit=636%2C380&ssl=1') !important;
            background-size: cover !important;
            position: relative !important;
            height: 100% !important;
            width: 100%;
        }

        .layer {
            background-color: #000;
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: .9;
        }

            .h1 {
          color: #88B04B;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-weight: 900;
          font-size: 40px;
          margin-bottom: 10px;
        }
        .p {
          color: #404F5E;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-size:20px;
          margin: 0;
        }
      .ii {
        color: #9ABC66;
        font-size: 100px;
        line-height: 200px;
        margin-left:-15px;
      }
      .card {
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 3px #C8D0D8;
        display: inline-block;
        margin: 0 auto;
      }
        }
        </style>
        <body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled page-loading">
            <div class="background ">
            <!--begin::Main-->
                <div class="d-flex flex-column flex-root layer">
                    <!--begin::Login-->
                    <div class="login login-5 login-signin-on d-flex flex-row-fluid" id="kt_login">
                        <div class="d-flex flex-center bgi-size-cover bgi-no-repeat flex-row-fluid" >
                            <div class="login-form text-center text-white p-7 position-relative overflow-hidden">
                                <!--begin::Login Header-->
                                <div class="d-flex flex-center mb-15">
                                    <a href="#">
                                        <img src="{{ asset('assets/img/brand/blue.svg') }}" class="max-h-75px" alt="" />
                                    </a>
                                </div>
                                <!--end::Login Header-->

                                <!--begin::Login Sign in form-->
                                @if(!session()->has('status'))
                                <div class="login-signin">
                                    <div class="">
                                        <h3 class="opacity-100 font-weight-bold text-white">Welcome to FERMA iReporter</h3>
                                        <p class="opacity-100 text-left">You are currently reporting <span class="text-warning">{{ ucfirst($user->roads->name) }} Rd</span> in {{ $user->states->name}} </p>
                                        <br>
                                        <p class="text-left"><i class="fa fa-user-circle"></i> {{ $user->name }}</p>
                                        <p class="text-left"><i class="fa fa-phone"></i> {{ $user->phone }}</p>
                                    </div>
                                    <form class="form" id="kt_login_signin_form" method="post" action="{{ url()->full() }}" enctype="multipart/form-data">
                                        @csrf
                                        <div class="form-group">
                                            <label for="" class="text-white text-left">If the above information are valid, please upload an image of the bad road</label>
                                            <input class="form-control h-auto text-white bg-white-o-5 rounded-pill border-0 py-4 px-8" type="file" name="image" accept="image/x-png,image/gif,image/jpeg" autocomplete="off" required/>
                                            <input type="hidden" name="id" value="{{ $user->id }}">
                                        </div>
                                        <div class="form-group text-center mt-10">
                                            <button id="kt_login_signin_submit" class="btn btn-pill btn-primary opacity-90 px-15 py-3 float-right">Upload</button>
                                        </div>
                                    </form>
                                </div>
                                @else
                                    <div class="card">
                                        <div style="border-radius:200px; width:200px; background: #F8FAF5; margin:0 auto;">
                                            <i class="checkmark ii">✓</i>
                                        </div>
                                        <h1 class="h1">Success</h1>
                                        <p class="p p-0">Thank you for participating in our FERMA Image iReporter Segments<br /> we'll be in touch shortly!</p>
                                    </div>
                                @endif
                            </div>
                        </div>
                    </div>
                    <!--end::Login-->
                </div>
                <div class="position-absolute bottom-0 text-center w-100 py-3">
                    <a href="#" class="text-white text-center small">&copy; Copyright Smart Sahara</a>
                </div>
            </div>
        </body>
        <script src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/plugins/global/plugins.bundle.js?v=7.0.5"></script>
        <script src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/plugins/custom/prismjs/prismjs.bundle.js?v=7.0.5"></script>
        <script src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/js/scripts.bundle.js?v=7.0.5"></script>

</html>
