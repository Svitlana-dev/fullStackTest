
$(document).ready(function () {
    var base_url = 'http://localhost/fullstack-test-master/';
    $("#login-username").keypress(function (e) {
        var keyCode = e.which;
        if (keyCode == 32) {
            return false;
        }
    });
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serializeArray();
        var fd = {};
        data.forEach(function (item) {
            fd[item.name] = item.value;
        });

        $.ajax({
            url: './api/auth.php',
            data: fd,
            type: 'POST',
            dataType: 'json',
            success: function (res) {
                if (res.result == 'ok') {

                    location.href = "./users.html";

                    if (fd['remember']) {
                        localStorage.setItem('kc_login', JSON.stringify(fd));
                    }
                    else {
                        localStorage.removeItem("kc_login");
                    }
                } else {
                    alert(res.msg);
                }
            },
            error: function (err) {
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
