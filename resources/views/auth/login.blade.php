<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>
    {{env('APP_NAME')}}
  </title>
  <!-- Favicon -->
  <link href="../assets/img/brand/logo.png" rel="icon" type="image/png">
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
  <!-- Icons -->
  <link href="../assets/js/plugins/nucleo/css/nucleo.css" rel="stylesheet" />
  <link href="../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link href="../assets/css/argon-dashboard.css?v=1.1.0" rel="stylesheet" />
</head>

<body class="bg-gradient-primary">
  <div class="main-content py-5">
    <!-- Navbar -->
    <!-- Header -->
    <div class="container mt--1">
    <div class="header-body text-center mb-0 py-6">
        <div class="row justify-content-center">
        <div class="col-lg-12 col-md-12">
            <img src="../assets/img/brand/blue.svg" width="150em" height="150em" />
            <h1 class="text-white" style="position: relative; z-index: 100;"> Federal Road Maintenance Monitoring Platform </h1>
        </div>
        </div>
    </div>
    </div>

    <!-- Page content -->
    <div class="container mt--7">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-primary" style="border: none;z-index: 10;">
            <div class="card-body px-lg-5 py-lg-5">
              <form role="form" method="POST" action="{{route('signin')}}">
                @csrf
                <div>
                </div>
                <div class="form-group mb-3">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                    </div>
                    <input class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" placeholder="Email" type="email" name="email" required>
                        @if ($errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" placeholder="Password" type="password" name="password" required>
                    @if ($errors->has('password'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-white my-4 text-primary">Sign in</button>
                </div>
              </form>
            </div>
          </div>
          {{-- <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light"><small>Forgot password?</small></a>
            </div>
            <div class="col-6 text-right">
              <a href="#" class="text-light"><small>Create new account</small></a>
            </div> --}}
          </div>
        </div>
      </div>
    </div>
    <footer style="position:fixed; left: 2%; bottom: 2%; width: 100%;">
      <div class="">
        <div class="row">
          <div class="col-xl-6" style="">
            <div class="copyright text-xl-left text-white">
              © {{date("Y", time())}} <a href="https://www.mayapro1.com" class="font-weight-bold ml-1 text-white" target="_blank">Mayapro1 Limited</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  <!--   Core   -->
  <script src="../assets/js/plugins/jquery/dist/jquery.min.js"></script>
  <script src="../assets/js/plugins/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <!--   Optional JS   -->
  <!--   Argon JS   -->
  <script src="../assets/js/argon-dashboard.min.js?v=1.1.0"></script>
  <script src="https://cdn.trackjs.com/agent/v3/latest/t.js"></script>
  <script>
    window.TrackJS &&
      TrackJS.install({
        token: "ee6fab19c5a04ac1a32a645abde4613a",
        application: "argon-dashboard-free"
      });
  </script>
</body>

</html>
