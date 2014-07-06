define([
    'backbone',
    'models/task'
], function(Backbone, taskModel) {

    var taskCollection = Backbone.Collection.extend({
        model: taskModel
    });

    return taskCollection;

});