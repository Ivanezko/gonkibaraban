// Put your custom code here

$().ready(function(){
    log('DOM ready');

/*
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

    }, false);*/



    //log('device name:'+window.device.name);

    // my events

    $('#gnSubmit').on('taphold', function(e) {
        log('taphold submit');
        $.getJSON('http://rally.co.ua/rallies/21/site/mobileinput', function(data) {
            log('json retrieved');
            var items = [];

            $.each(data, function(key, val) {
                items.push('<li id="' + key + '">' + val + '</li>');
            });

            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('body');
        });
    });

    $('.gn-clear').on('tap', function(e) {
        log('click clear');
    });

});

function log(string) {
    $('#log').append('<p>'+string+'</p>');
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