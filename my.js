// Put your custom code here

$().ready(function(){
    log('приложение запущено');

    document.addEventListener("deviceready", function() {
        log('устройство готово');
        document.addEventListener("online", function() {
            log('есть интернет');
        }, false);

        document.addEventListener("offline", function() {
            log('нет интернета');
        }, false);

        document.addEventListener("pause", function() {
            //log('paused!');
        }, false);

        document.addEventListener("resume", function() {
            //log('resume!');
        }, false);

        document.addEventListener("batterycritical", function() {
            log('батарея разряжена');
        }, false);

        document.addEventListener("batterystatus", function(info) {
            log('batterystatus!'+info.level);
            log('batterystatus!'+info.isPlugged);
        }, false);

    }, false);



    //log('device name:'+window.device.name);

    // my events asdsa

    $('#gnSubmit').on('taphold', function(e) {
        var d = $('#gnInputtext').val();
        var r = $('#round').val();
        var m = $('#mode').val();
        var m = $('#mode').val();
        var uuid = device.uuid;

        if (m == 'f' && !/\d\d[^\d]\d\d\d\d\d\d\d\d/.test(d)) {
            alert('Ошибка ввода!'); return;
        }

        if ((m == 's' || m == 'k') && !/\d\d[^\d]\d\d\d\d/.test(d)) {
            alert('Ошибка ввода!'); return;
        }

        var info = {result:d, point: r, mode:m, uuid:uuid};
        $.getJSON('http://rally.co.ua/rallies/21/site/mobileinput', info)
            .done(function(data) {
                if (data.result) {
                    log(m + r + ' ' + d, 'data');
                    $('#gnInputtext').val('');
                } else {
                    alert(data.error);
                }

            })
            .fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                log( "Request Failed: " + err);
            });
    });

    $('#mode').on('change', function() {
        if ($(this).val() == 'f') {
            log('==== вводим финиши');
            $('#gnInputtext').attr('placeholder', 'ББ-ЧЧММССмс');
        }
        if ($(this).val() == 's') {
            log('==== вводим старты');
            $('#gnInputtext').attr('placeholder', 'ББ-ЧЧММ');
        }
        if ($(this).val() == 'k') {
            log('==== вводим КВ');
            $('#gnInputtext').attr('placeholder', 'ББ-ЧЧММ');
        }
    });

    $('#round').on('change', function() {
        log('вводим для круга ' + $(this).val());
    });

});

function log(string, type) {
    if (typeof type != undefined)
        $('#log').prepend('<p class="log log-data">'+string+'</p>');
    else
        $('#log').prepend('<p class="log">'+string+'</p>');

    console.log(string);
}

function check_network() {
    var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Неизвестное соединение';
    states[Connection.ETHERNET] = 'кабельное соединение';
    states[Connection.WIFI]     = 'WiFi соединение';
    states[Connection.CELL_2G]  = '2G соединение';
    states[Connection.CELL_3G]  = 'Cell 3G соединение';
    states[Connection.CELL_4G]  = 'Cell 4G соединение';
    states[Connection.NONE]     = 'Нет соединения с интернетом';
    confirm('Вы подключены через:\n ' + states[networkState]);
}