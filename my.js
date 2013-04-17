// Put your custom code here

$().ready(function(){
    log('DOM ready');
    document.addEventListener("deviceready", function() {
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


        // my events
        $('.gn-number').on('click', function(e) {
            log('click number:'+$(this).text());
        });
        $('.gn-space').on('click', function(e) {
            log('click space');
        });
        $('.gn-submit').on('click', function(e) {
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





    }, false);

});

function log(string) {
    $('#log').append('<p>'+string+'</p>');
}