/*globals define */
/*jshint asi:true */


define(
    [
        'backbone',
        'app',
        'dolla'
    ],
    function(Backbone, app, $) {
        var me = 'app1/pages/home.view',
            Home


        Home = Backbone.View.extend({
            /**
             * Set up a new view
             * @param options.parentSelector a selector for the element to append this view to
             * @param options.urlParams an array of options parsed by Backbone.Router from the url
             */
            initialize: function() {
                $(this.options.parentSelector).html(this.$el)
                this.render()


                app.on('sock:message', function(data, rawMsg){
                    this.$el.append(
                        '<h3>'+ data.title +'</h3>' +
                        '<p>'+ data.description +'</p>' +
                        '<p>'+ new Date(data.dateTime).toLocaleString() + '</p>'
                    )
                }.bind(this))
            },
            render: function() {
                this.$el.html(me)
                this.$el.append('<br/> options: ' + this.options.urlParams[0] +' / '+ this.options.urlParams[1] +' / '+ this.options.urlParams[2] )
                app.trigger('pageLoaded:'+app.model.get('curPage').id)
                $('body').css('background-color','lavender')
            }
        })
        return Home
    }
)
