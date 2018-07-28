$(function () {
  $.validator.addMethod("pwcheck", function(value) {
          return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
              && /[a-z]/.test(value) // has a lowercase letter
              && /[A-Z]/.test(value) // has a uppercase letter
              && /\d/.test(value) // has a digit
              && /(\b(?:([A-Za-z0-9])(?!\2{4}))+\b)/.test(value) //don't repeate more than 2
       });
       $.validator.addMethod("phcheck",function (value) {
         return /^\d*(?:\.\d{1,2})?$/.test(value)
       });
var key = "SL1116";
var form_validation = function() {
    var e = function() {
            jQuery(".form-valide").validate({
                ignore: [],
                errorClass: "invalid-feedback animated fadeInDown",
                errorElement: "div",
                errorPlacement: function(e, a) {
                    jQuery(a).parents(".form-group > div").append(e)
                },
                highlight: function(e) {
                    jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
                },
                success: function(e) {
                    jQuery(e).closest(".form-group").removeClass("is-invalid"), jQuery(e).remove()
                },
                rules: {
                    "username": {
                        required: !0,
                        minlength: 3
                    },
                    "name": {
                        required: !0,
                        minlength: 3
                    },
                    "newPass": {
                        required: !0,
                        minlength: 5
                    },
                    "oldPass": {
                        required: !0,
                        minlength: 5
                    },
                    "email": {
                        required: !0,
                        email: !0
                    },
                    "ref_code":{
                      required: !0,
                      equalTo : '[name="key"]',
                    },
                    "val-email": {
                        required: !0,
                        email: !0
                    },
                    "password": {
                        required: !0,
                        minlength: 5,
                        pwcheck: true,
                    },
                    "val-confirm-password": {
                        required: !0,
                        equalTo: "#val-password"
                    },
                    "main_cat": {
                        required: !0
                    },
                    "sub_cat_i": {
                        required: !0,
                        minlength: 3
                    },
                    "sub_cat": {
                        required: !0
                    },
                    "val-select2-multiple": {
                        required: !0,
                        minlength: 2
                    },
                    "rfid": {
                        required: !0,
                        minlength: 5
                    },
                    "year": {
                        required: !0
                    },
                    "major": {
                        required: !0
                    },
                    "val-currency": {
                        required: !0,
                        currency: ["$", !0]
                    },
                    "val-website": {
                        required: !0,
                        url: !0
                    },
                    "phoneus": {
                        required: !0,
                        minlength: 9,
                        maxlength: 12,
                        phcheck : true
                    },
                    "val-digits": {
                        required: !0,
                        digits: !0
                    },
                    "role": {
                        required: !0,
                        number: !0
                    },
                    "book_range": {
                        required: !0,
                        range: [1, 31]
                    },
                    "val-terms": {
                        required: !0
                    },
                    "book_author":{
                      required: !0,
                      minlength: 3
                    },
                    "book_name":{
                      required: !0,
                      minlength: 3
                    },
                    "barcode":{
                      required: !0,
                      number: !0
                    },
                },
                messages: {
                    "username": {
                        required: "Please enter a username",
                        minlength: "Your username must consist of at least 3 characters"
                    },
                    "name": {
                        required: "Please enter a username",
                        minlength: "Your username must consist of at least 3 characters"
                    },
                    "book_name": {
                        required: "Please enter a book name",
                        minlength: "Book name must consist of at least 3 characters"
                    },
                    "oldPass": {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    "newPass": {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    "ref_code": {
                        required: "Please enter a REF code",
                        equalTo: "You need to correct Ref code"
                    },
                    "book_author": {
                        required: "Please enter a book author name",
                        minlength: "Book author name must consist of at least 3 characters"
                    },
                    "barcode": {
                        required: "Please scan barcode number",
                        number: "Don't Type characters"
                    },
                    "book_range": {
                        required: "Please input book range",
                        range: "Please enter a number between 1 and 31!"
                    },
                    "sub_cat_i": {
                        required: "Please enter a Sub categories",
                        minlength: "Your sub category name must consist of at least 3 characters"
                    },
                    "val-email": "Please enter a valid email address",
                    "password": {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long",
                        pwcheck: "Please input at least 1 Upper, 1 lower, 1 digit and don't more 4 same word"
                    },
                    "val-confirm-password": {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long",
                        equalTo: "Please enter the same password as above"
                    },
                    "phoneus": {
                      required:"Please enter a Myanmar phone!",
                      minlength: "Phone number is at least 9 Number",
                      phcheck: "Please enter phone number english only",
                    },
                    "main_cat": "Please select a main categories!",
                    "sub_cat": "Please select a sub categories!",
                    "val-select2-multiple": "Please select at least 2 values!",
                    "rfid": "What can we do to become better?",
                    "major": "Please select a major!",
                    "year": "Please select a year!",
                    "val-currency": "Please enter a price!",
                    "val-website": "Please enter your website!",

                    "val-digits": "Please enter only digits!",
                    "role": "Please enter a role!",
                    "val-range": "Please enter a number between 1 and 31!",
                    "val-terms": "You must agree to the service terms!"
                }
            })
        }
    return {
        init: function() {
            e(), a(), jQuery(".js-select2").on("change", function() {
                jQuery(this).valid()
            })
        }
    }
}();
jQuery(function() {
    form_validation.init()
});
});
