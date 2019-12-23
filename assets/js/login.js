// for longin part________________________________
// var base_url = 'http://localhost/fullstack-test-master/';
// $(document).ready(function () {
//     var myCookie = getCookie("user_id");

//     if (myCookie != null) {
//         window.location = 'user_list.html';
//     }
//     var cook_username = getCookie("user_name");
//     var cook_pass = getCookie("user_pass");
//     if (cook_username != null) {
//         $('#login-username').val(cook_username);
//     }
//     if (cook_pass != null) {
//         $('#login-password').val(cook_pass);
//     }

// });


// $("#login_btn").click(function (e) {
//     e.preventDefault();
//     $.ajax({
//         type: "POST",
//         url: base_url + "api/auth.php",
//         data: {
//             username: $('#login-username').val(), // < note use of 'this' here
//             password: $("#login-password").val()
//         },
//         success: function (result) {
//             if (result.status == 200) {
//                 // localStorage.setItem("user_id", result.data.id);
//                 // localStorage.setItem("user_name", result.data.username);
//                 var d = new Date();
//                 d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
//                 var expires = "expires=" + d.toUTCString();
//                 document.cookie = 'user_id' + "=" + result.data.id + ";" + expires + ";path=/";
//                 if ($('input[name="remember"]:checked').length) {
//                     document.cookie = 'user_name' + "=" + result.data.username + ";" + expires + ";path=/";
//                     document.cookie = 'user_pass' + "=" + $("#login-password").val() + ";" + expires + ";path=/";
//                 }
//                 else {
//                     document.cookie = 'user_name' + "=;" + expires + ";path=/";
//                     document.cookie = 'user_pass' + "=;" + expires + ";path=/";
//                 }
//                 window.location = 'user_list.html';
//             } else {
//                 $('#error').html('Username/Password incorrect');
//             }
//             console.log('ok', result);
//         },
//         error: function (result) {
//             console.log('error', result)
//         }
//     });
// });

// function getCookie(name) {
//     var dc = document.cookie;
//     var prefix = name + "=";
//     var begin = dc.indexOf("; " + prefix);
//     if (begin == -1) {
//         begin = dc.indexOf(prefix);
//         if (begin != 0) return null;
//     }
//     else {
//         begin += 2;
//         var end = document.cookie.indexOf(";", begin);
//         if (end == -1) {
//             end = dc.length;
//         }
//     }
//     // because unescape has been deprecated, replaced with decodeURI
//     //return unescape(dc.substring(begin + prefix.length, end));
//     return decodeURI(dc.substring(begin + prefix.length, end));
// }

$(document).ready(function() {
    var base_url = 'http://localhost/fullstack-test-master/';

    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        var data = $(this).serializeArray();
        var fd = {};
        data.forEach(function(item) {
           fd[item.name] = item.value;
        });

        $.ajax({
            url: './api/auth.php',
            data: fd,
            type: 'POST',
            dataType: 'json',
            success: function(res) {
                if (res.result == 'ok') {
                        
                    location.href="./users.html";

                    if (fd['remember']) {
                        localStorage.setItem('kc_login', JSON.stringify(fd));
                    }
                    else{
                        localStorage.removeItem("kc_login");
                    }
                } else {
                    alert(res.msg);
                }
            },
            error: function(err) {
                $('#error').html('Username/Password incorrect');
            }
        });
    });

    var rmLogin = localStorage.getItem('kc_login');
    if (rmLogin) {
        rmLogin = JSON.parse(rmLogin);
        $('#login-username').val(rmLogin.username);
        $('#login-password').val(rmLogin.password);
    }
});
