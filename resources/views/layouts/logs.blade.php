@extends('layouts.dashboard')


@section('content')
    <div class="container">
    
	<div class="row">
		<div class="card-body table-full-width table-responsive">
            <table class="table table-hover table-striped">
                  <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date and time</th>
                        <th>Activity</th>                                          
                    </tr>
                </thead>   
              <tbody>
              <?php $count = 1?>
                @if(count($logs) > 0)
                        @foreach($logs as $log)
                            <tr >
                                <td>{{$count++}}</td>
                                <td>{{ $log->user_id}}</td>
                                <td>{{ $log->created_at }}</td>                                
                                <td><span class="label label-inline {{($log->activity=="user logged in") ? "label-success" : "label-warning" }}">{{$log->activity}}</span></td> 
                            </tr>
                        @endforeach
                @else
                    <tr> <td colspan="5" class="text-center"> No Logs Found </td> </tr>
                @endif                        
              </tbody>
            </table>
        </div>
	</div>
</div>
@endsection