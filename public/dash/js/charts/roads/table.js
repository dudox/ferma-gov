"use strict";
var KTDatatablesSearchOptionsAdvancedSearch = function() {
    $.fn.dataTable.Api.register("column().title()", function() {
        return $(this.header()).text().trim()
    });
    return {
        init: function() {
            var t;
            t = $("#kt_datatable").DataTable({
                responsive: !0,
                dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
                lengthMenu: [5, 10, 25, 50],
                pageLength: 10,
                language: {
                    lengthMenu: "Display _MENU_"
                },
                searchDelay: 500,
                processing: !0,
                serverSide: !1,
                ajax: {
                    url:  "/api/datatables/roads",
                    type: "POST",
                    data: {
                        columnsDef: ["Road","Regions", "State", "Status", "Type", "Road Health","Action"]
                    }
                },
                columns: [{
                    data: "Road"
                },{
                    data: "Regions"
                }, {
                    data: "State"
                }, {
                    data: "Status"
                }, {
                    data: "Road Health"
                }, {
                    data: "LGA"
                },{
                    data: "Actions",
                    responsivePriority: -1
                }],

                initComplete: function() {
                    this.api().columns().every(function() {
                        switch (this.title()) {

                            case "Regions":
                                this.data().unique().sort().each(function(t, a) {
                                    $('.datatable-input[data-col-index="1"]').append('<option value="' + t + '">' + t + "</option>")
                                });
                                break;
                            case "State":
                                this.data().unique().sort().each(function(t, a) {
                                    $('.datatable-input[data-col-index="2"]').append('<option value="' + t + '">' + t + "</option>")
                                });
                                break;
                            case "Road Health":
                                this.data().unique().sort().each(function(t, a) {
                                    $('.datatable-input[data-col-index="4"]').append('<option value="' + t + '">' + t + "</option>")
                                });
                                    break;
                            case "Status":
                                var t = {
                                    1: {
                                        title: "Pending",
                                        class: "label-light-primary"
                                    },
                                    2: {
                                        title: "In Progress",
                                        class: " label-light-info"
                                    },
                                    3: {
                                        title: "Fixed",
                                        class: " label-light-success"
                                    },
                                };
                                this.data().unique().sort().each(function(a, e) {
                                    $('.datatable-input[data-col-index="3"]').append('<option value="' + t[a].title + '">' + t[a].title + "</option>")
                                });
                                break;
                        }
                    })
                },
                columnDefs: [{
                    targets: -1,
                    title: "Actions",
                    orderable: !1,
                    render: function(t, a, e, l) {
                        return '\t\t\t\t\t\t<a href="'+t+'" class="btn btn-sm btn-light-primary btn-block" title="Edit details">\t\t\t\t\t\t\t\tExpand\t\t\t\t\t\t\t\t\t<i class="fa fa-chevron-right fa-sm"></i>\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t\t\t\t'
                    }
                }, {
                    targets: 3,
                    render: function(t, a, e, l) {
                        var i = {
                            1: {
                                title: "Pending",
                                class: "label-light-primary"
                            },
                            2: {
                                title: "In Progress",
                                class: " label-light-info"
                            },
                            3: {
                                title: "Fixed",
                                class: " label-light-success"
                            },
                        };
                        return void 0 === i[t] ? t : '<span class="label label-lg font-weight-bold' + i[t].class + ' label-inline">' + i[t].title + "</span>"
                    }
                },

            ]
            }), $("#kt_search").on("click", function(a) {
                a.preventDefault();
                var e = {};
                $(".datatable-input").each(function() {
                    var t = $(this).data("col-index");
                    e[t] ? e[t] += "|" + $(this).val() : e[t] = $(this).val()
                }), $.each(e, function(a, e) {
                    t.column(a).search(e || "", !1, !1)
                }), t.table().draw()
            }), $("#kt_reset").on("click", function(a) {
                a.preventDefault(), $(".datatable-input").each(function() {
                    $(this).val(""), t.column($(this).data("col-index")).search("", !1, !1)
                }), t.table().draw()
            }), $("#kt_datepicker").datepicker({
                todayHighlight: !0,
                templates: {
                    leftArrow: '<i class="la la-angle-left"></i>',
                    rightArrow: '<i class="la la-angle-right"></i>'
                }
            })
        }
    }
}();
jQuery(document).ready(function() {
    KTDatatablesSearchOptionsAdvancedSearch.init()
});
