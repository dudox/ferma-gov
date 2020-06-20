
<!DOCTYPE html>

<html lang="en" >
    <!--begin::Head-->
    <head>
        <meta charset="utf-8"/>
        <title>{{env('APP_NAME')}} | Login</title>
        <meta name="description" content="Login page example"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />

        <link href="{{asset('dash/css/calendar.css')}}" rel="stylesheet" type="text/css" />
        <link href="{{asset('dash/css/bootstrap.min.css?v=7.0.5')}}" rel="stylesheet" type="text/css" />
        <link href="{{asset('dash/css/prismjs.css?v=7.0.5')}}" rel="stylesheet" type="text/css" />
        <link href="{{asset('dash/css/ferma-dashboard.css?v=7.0.5')}}" rel="stylesheet" type="text/css" />

        <link rel="shortcut icon" href="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/media/logos/favicon.ico" />

        <!-- Hotjar Tracking Code for keenthemes.com -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1070954,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-37564768-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-37564768-1');
</script>    </head>
    <!--end::Head-->

    <style>
        .fv-help-block {
            text-align: left !important;
            font-weight: 500 !important;
            margin: 0% !important;
            padding: 0% !important;
        }

        .background {
            background: url('../dash/img/bg/02.jpg') !important;
            position: relative !important;
            height: 100% !important;
            width: 100%;
        }

        .layer {
            background-color: #36b883;
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: .9;
        }




        #slidecaption {
            -webkit-animation-name: spinner;
            -webkit-animation-timing-function: linear;
            -webkit-animation-iteration-count: infinite;
            -webkit-animation-duration: 5s;
            animation-name: spinner;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-duration: 5s;
            -webkit-transform-style: preserve-3d;
            -moz-transform-style: preserve-3d;
            -ms-transform-style: preserve-3d;
            transform-style: preserve-3d;
            }


            /* WebKit and Opera browsers */
            @-webkit-keyframes spinner {
            from
            {
                -webkit-transform: rotateY(0deg);
            }
            to {
                -webkit-transform: rotateY(-360deg);
            }
            }
            /* all other browsers */
            @keyframes spinner {
            from {
                -moz-transform: rotateY(0deg);
                -ms-transform: rotateY(0deg);
                transform: rotateY(0deg);
            }
            to
            {
                -moz-transform: rotateY(-360deg);
                -ms-transform: rotateY(-360deg);
                transform: rotateY(-360deg);

            }
            }
    </style>

    <!--begin::Body-->
    <body  id="kt_body"  class="header-fixed header-mobile-fixed subheader-enabled page-loading "  >
        <div class="background ">
    	<!--begin::Main-->
	<div class="d-flex flex-column flex-root layer">
		<!--begin::Login-->
<div class="login login-3 login-signin-on d-flex flex-row-fluid" id="kt_login" style="opacity: 1 !important;">
	<div class="d-flex flex-center bgi-size-cover bgi-no-repeat flex-row-fluid" >
		<div class="login-form text-center text-white p-7 position-relative overflow-hidden">
			<!--begin::Login Header-->
			<div class="d-flex flex-center mb-15">
				<a href="#">
                    <img id="slidecaption" src="../assets/img/brand/blue.svg"  class="max-h-100px" alt=""/>
				</a>
			</div>
			<!--end::Login Header-->

			<!--begin::Login Sign in form-->
			<div class="login-signin">
                <form class="form" id="kt_login_signin_form" role="form" method="POST" action="{{route('signin')}}">
                    @csrf
					<div class="form-group">
                        <input class="form-control h-auto text-white placeholder-white  bg-dark-o-70  border-0 py-4 px-8 mb-2" type="email" placeholder="Email" name="email" autocomplete="off"/>
                        @if ($errors->has('email'))
                            <span class="invalid-feedback text-danger" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
					</div>
					<div class="form-group">
						<input class="form-control h-auto text-white placeholder-white  bg-dark-o-70  border-0 py-4 px-8 mb-2" type="password" placeholder="Password" name="password"/>
					</div>
					<div class="form-group d-flex flex-wrap justify-content-between align-items-center">
						<div class="checkbox-inline">
							<label class="checkbox checkbox-outline checkbox-white text-white m-0">
								<input type="checkbox" name="remember"/>
								<span></span>
								Remember me
							</label>
						</div>
						<a href="javascript:;" id="kt_login_forgot" class="text-white font-weight-bold">Forget Password ?</a>
					</div>
					<div class="form-group text-center mt-5 ">
						<button id="kt_login_signin_submit" type="submit" class="btn btn-block btn-outline-white font-weight-bold opacity-90 py-3">Sign In</button>
					</div>
				</form>
			</div>
             <!--begin::Content footer-->

        </div>

    </div>

</div>

<!--end::Login-->
    </div>
    <div class="position-absolute bottom-0 text-center w-100 py-3">
        <a href="#" class="text-white text-center small">&copy; Copyright Smart Sahara</a>
    </div>
<!--end::Main-->
</div>


        <script>var HOST_URL = "/metronic/tools/preview";</script>
        <!--begin::Global Config(global config for global JS scripts)-->
        <script>
            var KTAppSettings = {
    "breakpoints": {
        "sm": 576,
        "md": 768,
        "lg": 992,
        "xl": 1200,
        "xxl": 1200
    },
    "colors": {
        "theme": {
            "base": {
                "white": "#ffffff",
                "primary": "#0BB783",
                "secondary": "#E5EAEE",
                "success": "#1BC5BD",
                "info": "#8950FC",
                "warning": "#FFA800",
                "danger": "#F64E60",
                "light": "#F3F6F9",
                "dark": "#212121"
            },
            "light": {
                "white": "#ffffff",
                "primary": "#D7F9EF",
                "secondary": "#ECF0F3",
                "success": "#C9F7F5",
                "info": "#EEE5FF",
                "warning": "#FFF4DE",
                "danger": "#FFE2E5",
                "light": "#F3F6F9",
                "dark": "#D6D6E0"
            },
            "inverse": {
                "white": "#ffffff",
                "primary": "#ffffff",
                "secondary": "#212121",
                "success": "#ffffff",
                "info": "#ffffff",
                "warning": "#ffffff",
                "danger": "#ffffff",
                "light": "#464E5F",
                "dark": "#ffffff"
            }
        },
        "gray": {
            "gray-100": "#F3F6F9",
            "gray-200": "#ECF0F3",
            "gray-300": "#E5EAEE",
            "gray-400": "#D6D6E0",
            "gray-500": "#B5B5C3",
            "gray-600": "#80808F",
            "gray-700": "#464E5F",
            "gray-800": "#1B283F",
            "gray-900": "#212121"
        }
    },
    "font-family": "Poppins"
};
        </script>
    <script src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/plugins/global/plugins.bundle.js?v=7.0.5"></script>
    <script src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/plugins/custom/prismjs/prismjs.bundle.js?v=7.0.5"></script>
    <script src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/js/scripts.bundle.js?v=7.0.5"></script>
    <script src="https://keenthemes.com/metronic/themes/metronic/theme/html/demo9/dist/assets/plugins/custom/fullcalendar/fullcalendar.bundle.js?v=7.0.5"></script>
    <script src="{{asset('dash/js/auth/login.js')}}"></script>
                        <!--end::Page Scripts-->
            </body>
    <!--end::Body-->
</html>
