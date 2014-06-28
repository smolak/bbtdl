var app = app || {};

app.TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: _.template($('#taskView').html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    },
    focusForm: function() {
        $('#name').focus();
    },
    events: {
        'click #remove': 'taskRemove',
        'click .task-name': 'taskDone'
    },
    taskRemove: function() {
        this.model.destroy();
        this.remove();
        this.focusForm();
    },
    taskDone: function() {
        this.$el.toggleClass('success');
        this.focusForm();
    }
});