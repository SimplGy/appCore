/*globals define, curl, console */
/*jshint asi:true */


define(
    [
        'backbone',
        'underscore',
        'dolla',
        '../shared/appCore/appPaths.collection',
        '../shared/appCore/app.router',
        '../shared/appCore/app.view',
        '../shared/appCore/app.webSocket'
    ],
    function(Backbone, _, $, PathCollection, AppRouter, AppView, AppWebSocket) {
        var _me = 'shared/appCore/appCore',
            AppCore

        // Set the dom library that backbone should use. We used to do this by wrapping the library, but this is less fragile.
        Backbone.setDomLibrary($)


        AppCore = function(){}
        AppCore.prototype = {
            /**
             * Start the application core with specific configuration parameters
             * @param options.path: An array of paths for the application. This structure should fit the model from shared/appCore/appPaths.collection
             * @constructor
             */
            start: function(options){
                //console.log(_me+'.start()')
                if (!options) { throw new Error(_me+': You need to send options to the start method') }
                if (!options.paths) { throw new Error(_me+': options.paths is required') }

                // Allow our application to handle events
                _.extend(this, Backbone.Events)
                this.on('all', function(e){ console.log('[app event] ' + e) })

                // Set up the application model, which stores data about the configuration and state of the application
                this.model = new Backbone.Model()
                this.model.set( 'paths', new PathCollection(options.paths) )
                //this.model.on('all', function(e, model){ console.log(_me+'.model event: ' + e + ' | ' + model.get('curPage').id) })

                // Set up the web socket manager, which collects server connections and throws events for them
                this._webSocketMgr = new AppWebSocket({ 'app': this })

                // Set up the backbone view, which loads in child 'page' views by observing this.model.curPage
                this._bbView = new AppView({ 'appModel': this.model })

                // Set up the backbone router, which watches for url changes and modifies this.model.curPage
                this._bbRouter = new AppRouter({ 'appModel': this.model })
            }


        }

        return new AppCore()
    })

