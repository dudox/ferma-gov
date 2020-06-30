@extends('layouts.dashboard')
@section('content')
<div class="row justify-content-center pt-10 pb-30">
  <div class="col-lg-8 col-md-8">
    <div class="card shadow border-0">
      <div class="card-header pb-5">
        <div class="text-muted text-center mt-2 mb-3"><h4>Manage Screen Messages</h4></div>
      </div>
      
      @if(session()->has('success'))
      <div class="row justify-content-center mt-3">
        <div  class="col-md-6 alert alert-success">
            <button type="button" class="close text-white" data-dismiss="alert">x</button>
            {{ session()->get('success') }}
        </div>
      </div>
  @endif
      <div class="card-body px-lg-5 py-lg-5">
        <form role="form" method="POST" action="{{route('screens.update')}}">
          @csrf
          <div class="form-group mb-3 ">
              <div class="input-group">
              <input class="form-control" placeholder="First Option" type="text" name="first" value="{{$screenOne->value}}" required>
              </div>
          </div>
        <div class="form-group mb-3">
          <div class="input-group input-group-alternative">
            <input class="form-control" placeholder="Second option" type="text" name="second" value="{{$screenTwo->value}}" required>
          </div>
        </div>
        <div class="card-footer">
         <div class="row justify-content-center">
          <div class="text-center">
            <button type="submit" class="btn btn-primary my-4">Update Screens</button>
          </div>
         </div>
        </div>
       </form>
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
