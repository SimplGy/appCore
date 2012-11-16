/*globals define, console */
/*jshint asi:true */


define(
    [
        'backbone',
        'underscore'
    ],
    function(Backbone, _) {
        var _me = 'shared/appCore/appPaths.collection',
            PathCollection,
            PathModel

        // Private
        PathModel = Backbone.Model.extend({
            defaults: {
                'id': 'DEFAULTID',
                'description': null,
                'tabBarLocation': 0, // 0 means don't show on the tab bar. Integers indicate show order on tab bar
                'isDebugOnly': false,
                'usesHelp': true,
                'paramCount': 0 // How many parameters will this view take?
            },
            initialize: function() {
                this.setCalculatedDefaults()
            },
            setCalculatedDefaults: function() {
                var id = this.get('id'),
                    shortName = id.charAt(0).toUpperCase() + id.slice(1), // Capitalize first letter
                    calculatedDefaults = {
                        'modulePath': 'pages/' + this.get('id') + '.view',
                        'shortName': shortName,
                        'fullName': shortName
                    }
                // Use these defaults only if those attributes don't already exist
                this.attributes = _.extend( calculatedDefaults, this.attributes)
            }
        })

        // Public
        PathCollection = Backbone.Collection.extend({
            initialize: function () {
                this.model = PathModel
            }
        })
        return PathCollection
    }
)