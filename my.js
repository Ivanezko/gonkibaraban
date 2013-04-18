// Put your custom code here

$().ready(function(){
    log('DOM ready');

    document.addEventListener("deviceready", function() {
        log('device ready');
        document.addEventListener("online", function() {
            log('online!');
        }, false);

        document.addEventListener("offline", function() {
            log('offline!');
        }, false);

        document.addEventListener("pause", function() {
            log('paused!');
        }, false);

        document.addEventListener("resume", function() {
            log('resume!');
        }, false);

        document.addEventListener("batterycritical", function() {
            log('batterycritical!');
        }, false);

        document.addEventListener("batterystatus", function(info) {
            log('batterystatus!'+info.level);
            log('batterystatus!'+info.isPlugged);
        }, false);

    }, false);



    //log('device name:'+window.device.name);

    // my events

    $('#gnSubmit').on('taphold', function(e) {
        log('taphold submit');
        var info = {result:555, point: 1, mode:'start'};
        $.getJSON('http://rally.co.ua/rallies/21/site/mobileinput', info)
            .done(function(data) {
                log('request ok');
                console.log(data);
                log(data);
                var items = [];

                $.each(data, function(key, val) {
                    log(key + ':' + val);
                });

            })
            .fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                log( "Request Failed: " + err);
            });
    });

    $('.gn-clear').on('tap', function(e) {
        log('click clear');
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