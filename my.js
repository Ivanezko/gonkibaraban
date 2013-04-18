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

    log('device name:'+window.device.name);

    $('#gnInputtext').focus();

    $('#mainPage').on('click', function(e) {
        $('#gnInputtext').focus();
    });

    // my events

    $('#gnSubmit').on('click', function(e) {
        log('click submit');
        $.getJSON('http://rally.co.ua/rallies/21/site/crew', function(data) {
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
    $('.gn-clear').on('click', function(e) {
        log('click clear');
    });

});

function log(string) {
    $('#log').append('<p>'+string+'</p>');
    console.log(string);
}