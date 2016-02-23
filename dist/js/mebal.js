(function() {

    var client = new ZeroClipboard($('.demo-code'));

    client.on('ready', function(event) {
        // console.log( 'movie is loaded' );

        client.on('copy', function(event) {
            event.clipboardData.setData('text/plain', $(event.target).attr("data-code"));
        });

        client.on('aftercopy', function(event) {
            // console.log('Copied text to clipboard: ' + event.data['text/plain']);
        });
    });

    client.on('error', function(event) {
        // console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
        ZeroClipboard.destroy();
    });


})();
/* something */