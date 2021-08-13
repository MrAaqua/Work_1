jQuery(document).ready(function ($) {
    "use strict";
    $("#phone").mask("+7(999) 999-99-99");


    var filesExt = ['jpg', 'gif', 'png', 'stl', 'pdf', 'obj', 'mtl', 'dot', 'doc', 'jpeg', 'gif'];


    $('input[type=file]').change(function () {

        let asw = Math.round($(this)[0].files[0].size / 5000)

        if(asw < 3000){
          asw = 1000
        }

        $('#loadUpl').slideDown()
         $('#msgUpl').slideUp()
        if ($(this).val().length > 0) {

            let start = Date.now();

            let timer = setInterval(function () {
                let timePassed = Date.now() - start;

                if (timePassed > asw) {
                    $('#loadUpl').slideUp()
                    $('#msgUpl').slideDown();
                    console.log(1)
                    clearInterval(timer);
                    return;
                }

            }, 20);
        }

        var parts = $(this).val().split('.');

        if (filesExt.join().search(parts[parts.length - 1]) != -1) {

        } else {

            let ierror = true
            $(this).next('.validate').html((ierror ? ($(this).attr('data-msg') !== undefined ? $(this).attr('data-msg') : 'wrong Input') : '')).show('blind')
            $('input[type=file]').val('');
        }
    });


    //Contact
    $('form.php-email-form').submit(function () {

        var f = $(this).find('.form-group'),
            ferror = false,
            emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

        f.children('select').each(function () {
            var i = $(this);// current input
            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            ferror = ierror = true;
                        }
                        break;
                }
                i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }

        });

        f.children('input').each(function () { // run all inputs

            var i = $(this);// current input

            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            ferror = ierror = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(exp)) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'email':
                        if (!emailExp.test(i.val())) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'file':
                        let parts = i.val().split('.');
                        if (filesExt.join().search(parts[parts.length - 1]) != -1) {
                            ferror = ierror = false;
                        } else {
                            ferror = ierror = true;
                        }
                        break;

                    case 'checked':
                        if (!i.is(':checked')) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'regexp':
                        exp = new RegExp(exp);
                        if (!exp.test(i.val())) {
                            ferror = ierror = true;
                        }
                        break;
                }
                i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });
        f.children('textarea').each(function () { // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            ferror = ierror = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(exp)) {
                            ferror = ierror = true;
                        }
                        break;
                }
                i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });
        if (ferror) return false;
        else var str = $(this).serialize();

        var this_form = $(this);
        var action = $(this).attr('action');

        if (!action) {
            this_form.find('#msgLd').slideUp();
            this_form.find('.error-message').slideDown().html('The form action property is not set!');
            return false;
        }
        // массив расширений

        this_form.find('.sent-message').slideUp();
        this_form.find('.error-message').slideUp();
        this_form.find('#msgLd').slideDown();

        var formData = new FormData(document.forms.contactForm);


        $.ajax({
            type: "POST",
            url: action,
            data: formData,
            contentType: false,
            processData: false,
            success: function (msg) {
                if (msg == 'OK') {
                    this_form.find('#msgLd').slideUp();
                    this_form.find('.sent-message').slideDown();
                    this_form.find("input:not(input[type=submit]), textarea").val('');
                } else {
                    this_form.find('#msgLd').slideUp();
                    this_form.find('.error-message').slideDown().html(msg);
                }
            }
        });
        return false;
    });

});

