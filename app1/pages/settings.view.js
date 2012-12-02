/*globals define */
/*jshint asi:true */


define(
    [
        'backbone',
        'dolla'
    ],
    function(Backbone, $) {
        var me = 'app1/pages/settings.view',
            Page

        // Private
        Page = Backbone.View.extend({
            /**
             * Set up a new view
             * @param options.parentSelector a selector for the element to append this view to
             * @param options.urlParams an array of options parsed by Backbone.Router from the url
             */
            initialize: function() {
                $(this.options.parentSelector).html(this.$el)
                this.render()
            },
            render: function() {
                this.$el.html(me)
                this.$el.append('<br/> options: ' + this.options.urlParams[0] +' / '+ this.options.urlParams[1] +' / '+ this.options.urlParams[2] )
                $('body').css('background-color','blanchedalmond')
            }
        })
        return Page
    }
)
