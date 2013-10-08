/*globals define */
/*jshint asi:true */


define(
    [
        'backbone',
        'app',
        'dolla'
    ],
    function(Backbone, app, $) {
        var me = 'exampleApp2/pages/dashboard.view',
            Page


        Page = Backbone.View.extend({
            /**
             * Set up a new view
             */
            initialize: function() {
                $(this.options.parentSelector).html(this.$el)
                this.render()
            },
            render: function() {
                this.$el.html(me)
                this.$el.append('<br/> options: ' + this.options.urlParams[0] +' / '+ this.options.urlParams[1] +' / '+ this.options.urlParams[2] )
                app.trigger('pageLoaded:'+app.model.get('curPage').id)
                $('body').css('background-color','gray')
            }
        })
        return Page
    }
)
