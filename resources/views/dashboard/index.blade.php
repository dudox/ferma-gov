<?php
    $count = $entries->count();
    $completed = $entries->where('status', 3)->count();
    $ongoing = $entries->where('status', 2)->count();
    $pending = $entries->where('status', 1)->count();
    $completedPercent = ($completed * 100) / $count;
    $ongoingPercent = ($ongoing * 100) / $count;
    $pendingPercent = ($pending * 100) / $count;
?>
@extends('layouts.dashboard')
@section('style')
    <style>
        .success {
            /* customize stroke width of the donut slices in CSS. Note that this property is already set in JavaScript and label positioning also relies on this. In the right situation though it can be very useful to style this property. You need to use !important to override the style attribute */
            fill: #87CB16 !important;
            /* create modern looking rounded donut charts */
        }

        .warning {
            /* customize stroke width of the donut slices in CSS. Note that this property is already set in JavaScript and label positioning also relies on this. In the right situation though it can be very useful to style this property. You need to use !important to override the style attribute */
            fill: #FF9500  !important;
            /* create modern looking rounded donut charts */
        }

        .info {
            /* customize stroke width of the donut slices in CSS. Note that this property is already set in JavaScript and label positioning also relies on this. In the right situation though it can be very useful to style this property. You need to use !important to override the style attribute */
            fill: #1DC7EA  !important;
            /* create modern looking rounded donut charts */
        }

        .bar-success {
            stroke: #87CB16 !important;
        }

        .bar-info {
            stroke: #1DC7EA  !important;
        }

        .bar-warning {
            stroke: #FF9500  !important;
        }
</style>
@endsection
@section('content')
    <div class="row">
        <div class="col-md-4">
            <div class="card ">
                <div class="card-header ">
                    <h4 class="card-title">Repair Statistics</h4>
                    <p class="card-category">Repair Performance Over time</p>
                </div>
                <div class="card-body ">
                    <div id="chartPreferences" class="ct-chart ct-perfect-fourth"></div>
                    <div class="legend">
                        <i class="fa fa-circle text-warning"></i> Pending
                        <i class="fa fa-circle text-info"></i> Ongoing
                        <i class="fa fa-circle text-success"></i> Completed
                    </div>
                    <hr>
                    <div class="stats">
                        {{-- <i class="fa fa-clock-o"></i> Reflect time frame --}}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card ">
                <div class="card-header ">
                    <h4 class="card-title">Total Repairs</h4>
                    <p class="card-category">All Repairs Completed And ongoing</p>
                </div>
                <div class="card-body ">
                    <div id="chartActivity" class="ct-chart"></div>
                </div>
                <div class="card-footer ">
                    <div class="legend">
                        <i class="fa fa-circle text-success"></i> Completed
                        <i class="fa fa-circle text-info"></i> Ongoing
                        <i class="fa fa-circle text-warning"></i> Pending
                    </div>
                    <hr>
                    <div class="stats">
                        {{-- <i class="fa fa-check"></i> Data information certified --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="card  card-tasks">
                <div class="card-header ">
                    <h4 class="card-title">Entries</h4>
                    <p class="card-category">Last 5 Entries</p>
                </div>
                <div class="card-body ">
                    <div class="table-full-width">
                        <table class="table">
                            <tbody>

                                <?php
                                    $counter = 1;
                                    $latest = $entries->orderBy('created_at', 'DESC')->take(5);
                                 ?>
                                @foreach ($latest->get() as $entry)
                                    <tr>
                                        <td>
                                            <div class="">
                                                {{$counter++}}
                                            </div>
                                        </td>
                                        <td>{{$entry->location}}</td>
                                        <td class="td-actions text-right">
                                            <button type="button" rel="tooltip" title="Manage Entry" class="btn btn-info btn-simple btn-link">
                                                {{-- <i class="fa fa-edit"></i> --}}
                                            </button>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer ">
                    <hr>
                    <div class="stats">
                        <i class="now-ui-icons loader_refresh spin"></i> Last Updated at {{date("D, d M Y h:i A", strtotime($latest->first()->created_at)) ?? ''}}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
<script>
    $().ready(function() {
   $sidebar = $('.sidebar');
   $sidebar_img_container = $sidebar.find('.sidebar-background');

   $full_page = $('.full-page');

   $sidebar_responsive = $('body > .navbar-collapse');

   window_width = $(window).width();

   fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();

   if (window_width > 767 && fixed_plugin_open == 'Dashboard') {
       if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
           $('.fixed-plugin .dropdown').addClass('show');
       }

   }

   $('.fixed-plugin a').click(function(event) {
       // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
       if ($(this).hasClass('switch-trigger')) {
           if (event.stopPropagation) {
               event.stopPropagation();
           } else if (window.event) {
               window.event.cancelBubble = true;
           }
       }
   });

   $('.fixed-plugin .background-color span').click(function() {
       $(this).siblings().removeClass('active');
       $(this).addClass('active');

       var new_color = $(this).data('color');

       if ($sidebar.length != 0) {
           $sidebar.attr('data-color', new_color);
       }

       if ($full_page.length != 0) {
           $full_page.attr('filter-color', new_color);
       }

       if ($sidebar_responsive.length != 0) {
           $sidebar_responsive.attr('data-color', new_color);
       }
   });

   $('.fixed-plugin .img-holder').click(function() {
       $full_page_background = $('.full-page-background');

       $(this).parent('li').siblings().removeClass('active');
       $(this).parent('li').addClass('active');


       var new_image = $(this).find("img").attr('src');

       if ($sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
           $sidebar_img_container.fadeOut('fast', function() {
               $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
               $sidebar_img_container.fadeIn('fast');
           });
       }

       if ($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
           var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

           $full_page_background.fadeOut('fast', function() {
               $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
               $full_page_background.fadeIn('fast');
           });
       }

       if ($('.switch-sidebar-image input:checked').length == 0) {
           var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
           var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

           $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
           $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
       }

       if ($sidebar_responsive.length != 0) {
           $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
       }
   });

   $('.switch input').on("switchChange.bootstrapSwitch", function() {

       $full_page_background = $('.full-page-background');

       $input = $(this);

       if ($input.is(':checked')) {
           if ($sidebar_img_container.length != 0) {
               $sidebar_img_container.fadeIn('fast');
               $sidebar.attr('data-image', '#');
           }

           if ($full_page_background.length != 0) {
               $full_page_background.fadeIn('fast');
               $full_page.attr('data-image', '#');
           }

           background_image = true;
       } else {
           if ($sidebar_img_container.length != 0) {
               $sidebar.removeAttr('data-image');
               $sidebar_img_container.fadeOut('fast');
           }

           if ($full_page_background.length != 0) {
               $full_page.removeAttr('data-image', '#');
               $full_page_background.fadeOut('fast');
           }

           background_image = false;
       }
   });
});

type = ['primary', 'info', 'success', 'warning', 'danger'];

demo = {
   initPickColor: function() {
       $('.pick-class-label').click(function() {
           var new_class = $(this).attr('new-class');
           var old_class = $('#display-buttons').attr('data-class');
           var display_div = $('#display-buttons');
           if (display_div.length) {
               var display_buttons = display_div.find('.btn');
               display_buttons.removeClass(old_class);
               display_buttons.addClass(new_class);
               display_div.attr('data-class', new_class);
           }
       });
   },

   initDocumentationCharts: function() {
       /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

       dataDailySalesChart = {
           labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
           series: [
               [12, 17, 7, 17, 23, 18, 38]
           ]
       };

       optionsDailySalesChart = {
           lineSmooth: Chartist.Interpolation.cardinal({
               tension: 0
           }),
           low: 0,
           high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
           chartPadding: {
               top: 0,
               right: 0,
               bottom: 0,
               left: 0
           },
       }

       var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

       // lbd.startAnimationForLineChart(dailySalesChart);
   },

   initDashboardPageCharts: function() {

       var dataPreferences = {
           series: [
               [25, 30, 20, 25]
           ]
       };

       var optionsPreferences = {
           donut: true,
           donutWidth: 40,
           startAngle: 0,
           total: 100,
           showLabel: false,
           axisX: {
               showGrid: false
           }
       };

       Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

       Chartist.Pie('#chartPreferences', {
           labels: ['{{number_format($pendingPercent, 1)}}%', '{{number_format($ongoingPercent, 1)}}%', '{{number_format($completedPercent, 1)}}%'],
           series: [{value: {{number_format($pendingPercent, 1)}}, className: 'warning'}, {value: {{number_format($ongoingPercent, 1)}}, className: 'info'}, {value: {{number_format($completedPercent, 1)}}, className: 'success'}]
       });

       var dataSales = {
           labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
           series: [
               [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
               [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
               [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
           ]
       };

       var optionsSales = {
           lineSmooth: false,
           low: 0,
           high: 800,
           showArea: true,
           height: "245px",
           axisX: {
               showGrid: false,
           },
           lineSmooth: Chartist.Interpolation.simple({
               divisor: 3
           }),
           showLine: false,
           showPoint: false,
           fullWidth: false
       };

       var responsiveSales = [
           ['screen and (max-width: 640px)', {
               axisX: {
                   labelInterpolationFnc: function(value) {
                       return value[0];
                   }
               }
           }]
       ];

       var chartHours = Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);

       // lbd.startAnimationForLineChart(chartHours);

       var data = {
           labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
           series: [
               {value: @json($ongoingValues), className: 'bar-info'},
               {value: @json($completedValues), className: 'bar-success'},
               {value: @json($pendingValues), className: 'bar-warning'},
           ]
       };

       var options = {
           seriesBarDistance: 10,
           axisX: {
               showGrid: false
           },
           height: "245px"
       };

       var responsiveOptions = [
           ['screen and (max-width: 640px)', {
               seriesBarDistance: 5,
               axisX: {
                   labelInterpolationFnc: function(value) {
                       return value[0];
                   }
               }
           }]
       ];

       var chartActivity = Chartist.Bar('#chartActivity', data, options, responsiveOptions);

   },

   initGoogleMaps: function() {
       var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
       var mapOptions = {
           zoom: 13,
           center: myLatlng,
           scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
           styles: [{
               "featureType": "water",
               "elementType": "geometry",
               "stylers": [{
                   "color": "#e9e9e9"
               }, {
                   "lightness": 17
               }]
           }, {
               "featureType": "landscape",
               "elementType": "geometry",
               "stylers": [{
                   "color": "#f5f5f5"
               }, {
                   "lightness": 20
               }]
           }, {
               "featureType": "road.highway",
               "elementType": "geometry.fill",
               "stylers": [{
                   "color": "#ffffff"
               }, {
                   "lightness": 17
               }]
           }, {
               "featureType": "road.highway",
               "elementType": "geometry.stroke",
               "stylers": [{
                   "color": "#ffffff"
               }, {
                   "lightness": 29
               }, {
                   "weight": 0.2
               }]
           }, {
               "featureType": "road.arterial",
               "elementType": "geometry",
               "stylers": [{
                   "color": "#ffffff"
               }, {
                   "lightness": 18
               }]
           }, {
               "featureType": "road.local",
               "elementType": "geometry",
               "stylers": [{
                   "color": "#ffffff"
               }, {
                   "lightness": 16
               }]
           }, {
               "featureType": "poi",
               "elementType": "geometry",
               "stylers": [{
                   "color": "#f5f5f5"
               }, {
                   "lightness": 21
               }]
           }, {
               "featureType": "poi.park",
               "elementType": "geometry",
               "stylers": [{
                   "color": "#dedede"
               }, {
                   "lightness": 21
               }]
           }, {
               "elementType": "labels.text.stroke",
               "stylers": [{
                   "visibility": "on"
               }, {
                   "color": "#ffffff"
               }, {
                   "lightness": 16
               }]
           }, {
               "elementType": "labels.text.fill",
               "stylers": [{
                   "saturation": 36
               }, {
                   "color": "#333333"
               }, {
                   "lightness": 40
               }]
           }, {
               "elementType": "labels.icon",
               "stylers": [{
                   "visibility": "off"
               }]
           }, {
               "featureType": "transit",
               "elementType": "geometry",
               "stylers": [{
                   "color": "#f2f2f2"
               }, {
                   "lightness": 19
               }]
           }, {
               "featureType": "administrative",
               "elementType": "geometry.fill",
               "stylers": [{
                   "color": "#fefefe"
               }, {
                   "lightness": 20
               }]
           }, {
               "featureType": "administrative",
               "elementType": "geometry.stroke",
               "stylers": [{
                   "color": "#fefefe"
               }, {
                   "lightness": 17
               }, {
                   "weight": 1.2
               }]
           }]
       };

       var map = new google.maps.Map(document.getElementById("map"), mapOptions);

       var marker = new google.maps.Marker({
           position: myLatlng,
           title: "Hello World!"
       });

       // To add the marker to the map, call setMap();
       marker.setMap(map);
   },

//    showNotification: function(from, align) {
//        color = Math.floor((Math.random() * 4) + 1);

//        $.notify({
//            icon: "nc-icon nc-app",
//            message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."

//        }, {
//            type: type[color],
//            timer: 8000,
//            placement: {
//                from: from,
//                align: align
//            }
//        });
//    }



}
</script>
@endsection
