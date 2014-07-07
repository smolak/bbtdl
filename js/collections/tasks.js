define([
    'backbone',
    'localstorage',
    'models/task'
], function(Backbone, LocalStorage, taskModel) {

    var taskCollection = Backbone.Collection.extend({
        model: taskModel,
        localStorage: new LocalStorage('bbtdl-collection')
    });

    return taskCollection;

});