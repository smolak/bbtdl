define([
    'backbone',
    'models/task',
    'views/tasks/task',
    'collections/tasks'
], function(Backbone, taskModel, taskView, tasksCollection) {

    var tasksView = Backbone.View.extend({
        el: '#tasks',
        $tasksList: $('#tasksList'),
        $name: $('#name'),
        initialize: function() {
            this.collection = new tasksCollection;
            //this.focusForm();
            this.render();
            this.listenTo(this.collection, 'add', this.renderTask);
        },
        render: function() {
            this.collection.each(function(item) {
                this.renderTask(item);
            });
        },
        renderTask: function(item) {
            var view = new taskView({
                model: item
            });

            this.$tasksList.append(view.render().el);
            //this.clearAndFocusForm();
        },
        events: {
            'click #add': 'addTask'
        },
        addTask: function(e) {
            console.log('adding taks');

            e.preventDefault();

            var formData = {};

            $('#addTask').find('input').each(function(i, el) {
                formData[el.id] = $(el).val();
            });

            var model = new taskModel(formData);

            if (!model.isValid()) {
                alert(model.validationError);
            }
            else {
                this.collection.add(model);
            }
        }
    });

    return tasksView;

});