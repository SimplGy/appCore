/*globals define, curl, console */
/*jshint asi:true */


define(
    [
        'backbone'
    ],
    function() {
        var _me = 'shared/appCore/app.webSocket',
            _host = 'ws://velociraptor:9999/queue',
            AppWebSocket,
            _onOpen,
            _onMessage,
            _onClose,
            _onError


        // ---------------------------------------- Private
        _onOpen = function(){
            this.app.trigger('sock:open', this.readyState)
        }
        _onMessage = function(msg){
            this.app.trigger('sock:message', JSON.parse(msg.data), msg) // send both the data as and object and the raw message
            console.log(msg)
        }
        _onClose = function(){
            this.app.trigger('sock:close', this.readyState)
        }
        _onError = function() {
            this.app.trigger('sock:error')
        }


        // ---------------------------------------- Public
        AppWebSocket = function (options) {
            this.app = options.app
            if (WebSocket) {
                this.socket = new WebSocket(_host);
                this.socket.onopen = _onOpen.bind(this)
                this.socket.onmessage = _onMessage.bind(this)
                this.socket.onclose = _onClose.bind(this)
                this.socket.onerror = _onError.bind(this)
            } else {
                console.log(_me+' WebSockets are not supported by this device or browser')
            }
        }
        AppWebSocket.prototype = {
            send: function(msg) { this.socket.send(msg) },
            close: function() { this.socket.close() }
        }

        return AppWebSocket
    })

