// Put your custom code here

$().ready(function(){

    document.addEventListener("deviceready", function() {
        document.addEventListener("online", function() {
            alert('online!');
        }, false);

        document.addEventListener("offline", function() {
            alert('offline!');
        }, false);

        document.addEventListener("pause", function() {
            alert('paused!');
        }, false);

        document.addEventListener("resume", function() {
            alert('resume!');
        }, false);

        document.addEventListener("batterycritical", function() {
            alert('batterycritical!');
        }, false);

        document.addEventListener("batterystatus", function(info) {
            alert('batterystatus!'+info.level);
            alert('batterystatus!'+info.isPlugged);
        }, false);


        // my events






    }, false);

});
