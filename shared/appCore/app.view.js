/*globals define, curl, console */
/*jshint asi:true */


define(
    [
        'backbone'
    ],
    function(Backbone) {
        var _me = 'shared/appCore/app.view',
            _pageHolderSelector = '#PageHolder',
            AppView

        AppView = Backbone.View.extend({
            initialize: function() {
                //console.log(_me+'.initialize()')
                if (!this.options.appModel) { throw new Error(_me + ': need to be sent an application model in order to create itself')}
                this.setElement('body') // Safe to assume that an application core view can have the body for its own

                // If the data indicating which page is current changes, then change the page
                this.options.appModel.on('change:curPage', this.render, this)
            },

            render: function(model, curPage) {
                this.showPage(curPage.id, curPage.options)
            },

            /**
             * Change the application's page.
             * This involves loading a new set of resources for
             * A page is a special kind of object that is uniquely defined by a single identifier with no / or spaces
             * @param pageId A unique ID of a page page. Should match one of the 'id' properties in the appPaths.collection's models
             * @param pageOptions Passed from the route. Things like #search/kiwi/page12 get sent here. If they were properly parameterized, they'll come across as an array.
             */
            showPage: function(pageId, pageOptions){
                //console.log(_me+'.show()')
                var pathModel = this.options.appModel.get('paths').get(pageId)

                // If the page path is good, curl in the new application page and its resources
                if ( pathModel instanceof Backbone.Model ) {
                    curl([ pathModel.get('modulePath') ]).then(
                        function(ApplicationPage) { new ApplicationPage({ 'parentSelector':_pageHolderSelector, 'urlParams': pageOptions }) },
                        function() { throw new Error(_me + ': ' + pathModel.get('modulePath') + ' is not a valid module path for pageId: ' + pageId) }
                    )
                } else {
                    console.log(_me + ': ' + pageId + ' is not a valid page id')
                }
            }
        })

        return AppView
    })

