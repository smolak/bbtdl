var app = app || {};

app.TaskView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#taskView').html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    },
    events: {
        'click #done': 'taskDone'
    },
    taskDone: function() {
        this.model.destroy();
        this.remove();
    }
});