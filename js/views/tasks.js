var app = app || {};

app.TasksView = Backbone.View.extend({
    el: '#tasks',
    $tasksList: $('#tasksList'),
    $name: $('#name'),
    initialize: function(initialTasks) {
        this.collection = new app.Tasks(initialTasks);
        this.focusForm();
        this.render();
        this.applySortable();
        this.listenTo(this.collection, 'add', this.renderTask);
        this.listenTo(this.collection, 'add', this.saveCollection);
        this.listenTo(this.collection, 'destroy', this.saveCollection);
        this.listenTo(this.collection, 'destroy', this.focusForm);
        this.listenTo(this.collection, 'change', this.saveCollection);
        this.listenTo(this.collection, 'change', this.focusForm);
    },
    applySortable: function () {
        Sortable.create(this.$tasksList[0], {
            onEnd: function () {
                var newModels = [];

                this.$el.find('.task-name').each(function() {
                    newModels.push(new app.Task({
                        name: $(this).text(),
                        done: $(this).hasClass('success')
                    }));
                });

                this.collection.reset(newModels);

                this.saveCollection();
            }.bind(this)
        });
    },
    render: function() {
        this.collection.each(function(item) {
            this.renderTask(item);
        }, this);
    },
    clearAndFocusForm: function() {
        this.clearForm().focusForm();

        return this;
    },
    clearForm: function() {
        this.$name.val('');

        return this;
    },
    focusForm: function() {
        //You don't want to focus when on mobile device
        //It will trigger keyboard.
        $.browser.mobile ? null : this.$name.focus();

        return this;
    },
    renderTask: function(item) {
        var taskView = new app.TaskView({
            model: item
        });

        this.$tasksList.append(taskView.render().el);
        this.clearAndFocusForm();
    },
    events: {
        'click #add': 'addTask'
    },
    addTask: function(e) {
        e.preventDefault();

        var formData = {};

        $('#addTask').find('input').each(function(i, el) {
            formData[el.id] = this.urlify($(el).val());
        }.bind(this));

        var task = new app.Task(formData);

        if (!task.isValid()) {
            alert(task.validationError);
        }
        else {
            this.collection.add(task);
        }
    },
    saveCollection: function() {
        $.cookie('bbtdl', this.collection.toJSON());
    },
    urlify: function(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
            return '<a href="' + url + '" target="_blank">' + url + '</a>';
        })
    }
});
