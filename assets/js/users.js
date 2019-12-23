var dta = null;
$(document).ready(function () {
    var base_url = 'http://localhost/fullstack-test-master/';
    

    $.ajax({
        url: './api/users.php',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            // debugger
            if (data.result == 'error') {
                location.href = "./index.html";
            } else if (data.result == 'ok') {
                data = data['data'];
                var pagelink = '';
                var total_record = data.length;
                var total_links = Math.ceil(total_record / 5);
                total_links = total_links ? total_links : 1;
                dta = data;
                show_records(1);
                for (var i = 1; i <= total_links; i++) {
                    pagelink += '<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="show_records(' + i + ')">' + i + '</a></li>';
                }
                $('.pagination').html(pagelink);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
});


function show_records(page = 1) {
    if (page == 1) {
        var start = 0;
        var end = 5
    } else {
        var start = (page - 1) * 5;
        
        if((dta.length - start)< 5){
            var end = dta.length;
        }
        else{
            var end = page * 5;
        }
    }
    var datalist = '';

    for (var i = start; i < end; i++) {
        datalist += '<tr><td><i class="fa fa-check-circle"></i></td><td>' + dta[i].username + '<span>' + dta[i].name + '</span></td><td>...<span>' +dta[i].group_name + '</span></td></tr>';
    }
    $('tbody').html(datalist);
}

$('.btn-logout').click(function () {
    $.ajax({
        url: './api/auth.php',
        type: 'delete',
        dataType: 'json',
        success: function (res) {
            if (res.result == 'ok') {
                location.href = './index.html';
            } else {
                alert(res.msg);
            }
        },
        error: function () {
            alert('Something went wrong!');
        }
    });
});


