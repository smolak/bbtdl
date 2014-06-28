$.cookie.json = true;

var tasks = $.cookie('bbtdl');

new app.TasksView(tasks);
