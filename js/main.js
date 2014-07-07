require.config({
    paths: {
        jquery: 'libs/jquery/jquery.min',
        underscore: 'libs/underscore/underscore.min',
        backbone: 'libs/backbone/backbone.min',
        localstorage: 'libs/backbone/plugins/backbone.localStorage.min'
    }
});

require([
    // Load our app module and pass it to our definition function
    'app'
], function(App) {
    // The "app" dependency is passed in as "App"
    App.initialize();
});