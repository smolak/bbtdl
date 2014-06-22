var app = app || {};

app.TasksView = Backbone.View.extend({
    el: '#tasks',
    initialize: function(initialTasks) {
        this.collection = new app.Tasks(initialTasks);
        this.render();
        this.listenTo(this.collection, 'add', this.renderTask);
    },
    render: function() {
        this.collection.each(function(item) {
            this.renderTask(item);
        }, this);
    },
    clearForm: function() {
        $('#name').val('').focus();
    },
    renderTask: function(item) {
        var taskView = new app.TaskView({
            model: item
        });

        this.$el.append(taskView.render().el);
        this.clearForm();
    },
    events: {
        'click #add': 'addTask'
    },
    addTask: function(e) {
        e.preventDefault();

        var formData = {};

        $('#addTask').children('input').each(function(i, el) {
            formData[el.id] = $(el).val();
        });

        var task = new app.Task(formData);

        if (!task.isValid()) {
            alert(task.validationError);
        }
        else {
            this.collection.add(task);
        }
    }
});