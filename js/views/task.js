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
    events: {
        'click #remove': 'taskRemove',
        'click .task-name': 'taskDone'
    },
    taskRemove: function() {
        this.model.destroy();
        this.remove();
    },
    taskDone: function() {
        this.$el.find('.task-name').toggleClass('success');
        this.model.set('done', !this.model.get('done'));
    }
});