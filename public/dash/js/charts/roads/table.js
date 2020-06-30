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
                serverSide: !0,
                ajax: {
                    url:  "/api/datatables/roads",
                    type: "POST",
                    data: {
                        columnsDef: ["Road","Regions", "State", "Status", "Date", "Type", "LGA"]
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
                    data: "Date"
                }, {
                    data: "Type"
                }, {
                    data: "LGA"
                }],

                initComplete: function() {
                    this.api().columns().every(function() {
                        switch (this.title()) {

                            case "Regions":
                                this.data().unique().sort().each(function(t, a) {
                                    console.log(t);
                                    $('.datatable-input[data-col-index="1"]').append('<option value="' + t.name + '">' + t.name + "</option>")
                                });
                                break;
                            case "Status":
                                var t = {
                                    1: {
                                        title: "Pending",
                                        class: "label-light-primary"
                                    },
                                    2: {
                                        title: "Delivered",
                                        class: " label-light-danger"
                                    },
                                    3: {
                                        title: "Canceled",
                                        class: " label-light-primary"
                                    },
                                    4: {
                                        title: "Success",
                                        class: " label-light-success"
                                    },
                                    5: {
                                        title: "Info",
                                        class: " label-light-info"
                                    },
                                    6: {
                                        title: "Danger",
                                        class: " label-light-danger"
                                    },
                                    7: {
                                        title: "Warning",
                                        class: " label-light-warning"
                                    }
                                };
                                this.data().unique().sort().each(function(a, e) {
                                    $('.datatable-input[data-col-index="6"]').append('<option value="' + a + '">' + t[a].title + "</option>")
                                });
                                break;
                            case "Type":
                                t = {
                                    1: {
                                        title: "Online",
                                        state: "danger"
                                    },
                                    2: {
                                        title: "Retail",
                                        state: "primary"
                                    },
                                    3: {
                                        title: "Direct",
                                        state: "success"
                                    }
                                }, this.data().unique().sort().each(function(a, e) {
                                    $('.datatable-input[data-col-index="7"]').append('<option value="' + a + '">' + t[a].title + "</option>")
                                })
                        }
                    })
                },
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
