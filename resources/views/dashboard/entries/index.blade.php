@extends('layouts.dashboard')
@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="card strpied-tabled-with-hover">
                <div class="card-header ">
                    <h4 class="card-title">Damage Entries</h4>
                    <p class="card-category">All Damages Reported</p>
                </div>
                <form class="form-inline" method="POST" action="{{route('entries.clear')}}">
                    @csrf
                    @method('DELETE')
                    <input class="form-control" style="margin-left: 1em;" placeholder="input 'confirm' to proceed" name="confirm" required/>
                    <button class="btn btn-danger" style="margin-left: 1em;"> Clear Records </button>
                </form>
                <div class="card-body table-full-width table-responsive">
                    <table class="table table-hover table-striped">
                        <thead>
                            <th>ID</th>
                            <th>Location</th>
                            <th>User Phone</th>
                            <th>User Name</th>
                            <th>Status</th>
                            <th>Change Status</th>
                        </thead>
                        <tbody>
                            <?php $count = 1 + $entries->currentPage() * $entries->perPage() - $entries->perPage(); ?>
                            @if($entries->count() > 0)
                                @foreach($entries as $entry)
                                    <tr>
                                        <td>{{$count++}}</td>
                                        <td>{{$entry->location}}</td>
                                        <td>{{$entry->phone}}</td>
                                        <td>{{$entry->name ?? ''}}</td>
                                        <td class="{{$entry->progress->color_code ?? ''}}">
                                            <div class="legend">
                                                <i class="fa fa-circle {{$entry->progress->color_code ?? ''}}"></i>{{$entry->progress->name ?? ''}}
                                            </div>
                                        </td>
                                        <td>
                                            <form action="{{route('entries.update', $entry->id)}}" name="hey{{$entry->id}}" method="POST">
                                                @csrf
                                                <select class="form-control" onchange="hey{{$entry->id}}.submit()" name="status">
                                                    @foreach(\App\DamageStatus::get() as $status)
                                                    <?php $select = ''; if($entry->status === $status->id) $select = 'selected'; ?>
                                                        <option value="{{$status->id}}" {{$select}}>
                                                            {{$status->name}}
                                                        </option>
                                                    @endforeach
                                                </select>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                                {{ $entries->appends(request()->input())->links() }}
                            @endif

                            @if($entries->count() < 1)
                                <tr> <td colspan="5" class="text-center"> No Entries Found </td> </tr>
                            @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
