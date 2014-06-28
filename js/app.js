$.cookie.json = true;
$.cookie.defaults.expires = 30;

var tasks = $.cookie('bbtdl');

tasks = tasks || [];

new app.TasksView(tasks);
