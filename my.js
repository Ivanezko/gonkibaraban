// Put your custom code here

var uuid = document.location.hash.replace('#','');
var mode = '';
var rallyId = 0;
var isRegistered = false;
var queue = {}; // {info:info,date:new Date()}

var auth_interval = 30000;
var send_queue_interval = 7000;


function sendQueue(info) {
    if (typeof(info) == 'undefined') {
        // wdo we have something old in queue to send?
        var found = false;
        $.each(queue, function( k, v ) {
            if (!found && (new Date() - v.date > 30000) ) {
                found = true;
                sendData(v.info);
            }
        });
    }
    if (typeof(info) != 'undefined') {
        sendData(info);
    }
}


function sendData(info) {
    queue[info.result] = {info:info, date:new Date()};
    $.getJSON('http://gonki.in.ua/rallies/' + rallyId + '/site/mobileinput', info)
        .done(function (data) {
            if (data.result) {
                delete queue[data.result];
                log(data.result, 'data');
            } else {
                log(data.error);
            }
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            //log("нет ответа от сервера: " + err);
        });
}

function register() {
    $.getJSON('http://gonki.in.ua/', {act:'getRallyInfo'})
        .done(function(data) {
            $('#title').html(data.name);
            rallyId = data.id;
            isRegistered = true;
            log('register ok:' + rallyId);
            auth();
            setInterval(auth, auth_interval);
            setInterval(sendQueue, send_queue_interval);
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ', ' + error;
            log( "Register error: " + err);
        });
}

function auth() {
    if (!isRegistered) {
        register();
        return;
    }
    //log( "Auth try with uid: " + uuid);
    $.getJSON('http://gonki.in.ua/rallies/' + rallyId + '/site/mobileinput', {act:'auth',uuid:uuid})
        .done(function(data) {
            $('#gnPname').html(data.n);
            $('#gnInputtext').css('font-size','34px');
            mode = data.m;
            //log( "Auth ok: " + mode);
            if (mode == 'finish') {
                $('#gnInputtext').attr('placeholder', 'ББ-ЧЧММССмс');
            }
            if (mode == 'start') {
                $('#gnInputtext').attr('placeholder', 'ББ-ЧЧММ');
            }
            if (mode == 'kv') {
                $('#gnInputtext').attr('placeholder', 'ББ-ЧЧММ');
            }
            if (mode == 'full') {
                $('#gnInputtext').attr('placeholder', 'ББ-ЧЧММ-ЧЧММССмс');
                $('#gnInputtext').css('font-size','30px');
            }
        }).fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ', ' + error;
        log( "Auth error: " + err);
    });
}





$().ready(function(){
    log('приложение запущено');
    log('version: 2014.02.08.1');


    document.addEventListener("deviceready", function() {
        if (typeof device != 'undefined') uuid = device.uuid;
        log('устройство готово: '+uuid);
        document.addEventListener("online", function() {
            log('есть интернет! :)');
        }, false);

        document.addEventListener("offline", function() {
            log('нет интернета :(');
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

    $('#gnSubmit').on('click', function(e) {
        var d = $('#gnInputtext').val();
        $('#gnInputtext').val('');

        if (mode == 'finish' && !(/\d{1,3}[^\d]\d{8}/.test(d) || /\d{4}> \d{2}:\d{2}:\d{2},\d{2} .{2}/.test(d)) ) {
            alert('Ошибка ввода!'); return;
        }
        if ((mode == 'start') && !/\d{1,3}[^\d]\d{4}[^\d]?/.test(d)) {
            alert('Ошибка ввода!'+mode); return;
        }
        if ((mode == 'kv') && !/\d{1,3}[^\d]\d{4}/.test(d)) {
            alert('Ошибка ввода!'); return;
        }
        if ((mode == 'full') && !/\d{1,3}[^\d]\d{4}[^\d]?[^\d]\d{8}/.test(d)) {
            alert('Ошибка ввода!'); return;
        }

        sendQueue({result:d, uuid:uuid});
    });

});

function log(string, type) {
    if (typeof type != undefined)
        $('#log').prepend('<p class="log log-data">'+string+'</p>');
    else
        $('#log').prepend('<p class="log">'+string+'</p>');

    console.log(uuid + ':' + string);
}
