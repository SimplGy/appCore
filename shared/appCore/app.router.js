/*globals define, curl, console */
/*jshint asi:true */


define(
    [
        'backbone'
    ],
    function(Backbone) {
        var _me = 'shared/appCore/app.router',
            AppRouter

        AppRouter = Backbone.Router.extend({

            'routes': {
                '*path': 'defaultRoute'
            },

            initialize: function(options) {
                this.options = options
                if (!this.options.appModel) { throw new Error(_me + ': need to be sent an application model in order to create itself')}
                this.defaultPageId = this.options.appModel.get('paths').at(0).id // the first specified path becomes the default route

                // Build a route for each path in the application's path collection
                this.options.appModel.get('paths').each( this.buildRouteFromPath, this)
                this.on('all', function(e){ console.log(_me + ' ' + e) })
                Backbone.history.start()
            },

            setPageById: function(id, urlParams) {
                this.options.appModel.set({ 'curPage': { 'id':id, 'options':urlParams } })
            },

            defaultRoute: function() {
                this.setPageById(this.defaultPageId, arguments)
            },

            buildRouteFromPath: function(pathModel) {
                var id = pathModel.get('id'),
                    paramCount = pathModel.get('paramCount'),
                    that = this,
                    setCurPage = function() { that.setPageById(id, arguments) }

                // Build every path to support up to 3 optional parameters using Backbone's routes
                this.route( id + '/:a/:b/:c', id, setCurPage)
                this.route( id + '/:a/:b', id, setCurPage)
                this.route( id + '/:a', id, setCurPage)
                this.route( id, id, setCurPage)
            }
        })

        return AppRouter
    })

