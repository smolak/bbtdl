define([
    'backbone',
    'views/tasks/tasks'
], function(Backbone, tasksView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '*actions': 'defaultAction'
        }
    });

    var initialize = function() {
        var router = new AppRouter();

        router.on('route:defaultAction', function() {
            new tasksView();
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});