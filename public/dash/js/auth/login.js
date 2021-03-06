"use strict";
var KTLogin = function() {
    var t, i = function(i) {
        var o = "login-" + i + "-on";
        i = "kt_login_" + i + "_form";
        t.removeClass("login-forgot-on"), t.removeClass("login-signin-on"), t.removeClass("login-signup-on"), t.addClass(o), KTUtil.animateClass(KTUtil.getById(i), "animate__animated animate__backInUp")
    };
    return {
        init: function() {
            var o;
            t = $("#kt_login"), o = FormValidation.formValidation(KTUtil.getById("kt_login_signin_form"), {
                    fields: {
                        email: {
                            validators: {
                                notEmpty: {
                                    message: "E-mail address is required"
                                },
                                emailAddress: {
                                    message: "E-mail address is invalid"
                                }
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: "Password is required"
                                }
                            }
                        }
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger,
                        submitButton: new FormValidation.plugins.SubmitButton,
                        bootstrap: new FormValidation.plugins.Bootstrap,
                        defaultSubmit: new FormValidation.plugins.DefaultSubmit(),


                    }
                }), $("#kt_login_signin_submit").on("click", function(t) {
                    t.preventDefault(), o.validate().then(function(t) {

                        "Valid" == t ?
                        // ajax start

                            $("#kt_login_signin_form").submit()

                        //ajax ends

                        : swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light-primary"
                            }
                        }).then(function() {
                            KTUtil.scrollTop()
                        })
                    })
                }), $("#kt_login_forgot").on("click", function(t) {
                    t.preventDefault(), i("forgot")
                }), $("#kt_login_signup").on("click", function(t) {
                    t.preventDefault(), i("signup")
                }),

                function(t) {
                    var o;
                    o = FormValidation.formValidation(KTUtil.getById("kt_login_forgot_form"), {
                        fields: {
                            email: {
                                validators: {
                                    notEmpty: {
                                        message: "Email address is required"
                                    },
                                    emailAddress: {
                                        message: "The value is not a valid email address"
                                    }
                                }
                            }
                        },
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger,
                            bootstrap: new FormValidation.plugins.Bootstrap
                        }
                    }), $("#kt_login_forgot_submit").on("click", function(t) {
                        t.preventDefault(), o.validate().then(function(t) {
                            "Valid" == t ? KTUtil.scrollTop() : swal.fire({
                                text: "Sorry, looks like there are some errors detected, please try again.",
                                icon: "error",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn font-weight-bold btn-light-primary"
                                }
                            }).then(function() {
                                KTUtil.scrollTop()
                            })
                        })
                    }), $("#kt_login_forgot_cancel").on("click", function(t) {
                        t.preventDefault(), i("signin")
                    })
                }()
        }
    }
}();
jQuery(document).ready(function() {
    KTLogin.init()
});
