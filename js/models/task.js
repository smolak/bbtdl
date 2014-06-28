var app = app || {};

app.Task = Backbone.Model.extend({
    defaults: {
        name: '',
        done: false
    },
    validate: function(attrs, options) {
        attrs.name = attrs.name.trim();

        if (attrs.name === '') {
            return 'Task name must not be blank.';
        }
    },
    display: function() {
        return this.get('name');
    }
});