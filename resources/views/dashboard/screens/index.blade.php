@extends('layouts.dashboard')
@section('content')
<div class="row justify-content-center">
    <div class="col-lg-10 col-md-10">
      <div class="card shadow border-0">
        <div class="card-header pb-5">
          <div class="text-muted text-center mt-2 mb-3"><h4>Manage Screen Messages</h4></div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form" method="POST" action="{{route('screens.update')}}">
              @csrf
              <div class="form-group mb-3">
                  <div class="input-group">
                  <input class="form-control" placeholder="First Option" type="text" name="first" value="{{$screenOne->value}}" required>
                  </div>
              </div>
            <div class="form-group mb-3">
              <div class="input-group input-group-alternative">
                <input class="form-control" placeholder="Second option" type="text" name="second" value="{{$screenTwo->value}}" required>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary my-4">Update Screens</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
@endsection
