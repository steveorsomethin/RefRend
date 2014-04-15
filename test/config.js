'use strict';

/* 
* Config for bootstrapping the application, and mapping dependencies
*/

var require = {
    baseUrl: '../',

    paths: {
        // Modules
        EventRegistration: './core/EventRegistration',
        EventDispatcher: './core/EventDispatcher',
        ServiceLocator: './core/ServiceLocator',
        ObservableList: './core/ObservableList',
        CommandMap: './core/CommandMap',
        ObjectBase: './core/ObjectBase',
        DataCache: './core/DataCache',
        TitleDataProvider: './data/TitleDataProvider',
        ScreenCommands: './commands/ScreenCommands',
        ScreenModel: './models/ScreenModel',
        TitleCommands: './commands/TitleCommands',
        TitleModel: './models/TitleModel',
        CategoryCommands: './commands/CategoryCommands',
        CategoryModel: './models/CategoryModel',
        services: './services'
    },

    deps: [
        'services',
        'EventDispatcher',
        'ScreenCommands',
        'ScreenModel',
        'TitleCommands',
        'TitleModel',
        'CategoryCommands',
        'CategoryModel'
    ],

    callback: function(services,
                       EventDispatcher,
                       ScreenCommands,
                       ScreenModel,
                       TitleCommands,
                       TitleModel,
                       CategoryCommands,
                       CategoryModel) {

        // dispatcher is a singleton used for application level events
        services.register('Dispatcher', function() {
            return new EventDispatcher();
        });

        // Screen related context/commands
        services.register('ScreenModel', function() {
            return new ScreenModel();
        });
        services.register('ScreenCommands', function() {
            return new ScreenCommands(dispatcher);
        });

        // Title related context/commands/data
        services.register('TitleDataProvider', function() {
            return new TitleDataProvider();
        });
        services.register('TitleModel', function() {
            return new TitleModel();
        });
        services.register('TitleCommands', function() {
            return new TitleCommands(dispatcher);
        });

        // Category related context/commands/data
        services.register('CategoryDataProvider', function() {
            return new CategoryDataProvider();
        });
        services.register('CategoryModel', function() {
            return new CategoryModel();
        });
        services.register('CategoryCommands', function() {
            return new CategoryCommands(dispatcher);
        });

        console.log('Configuration loaded');

        mocha.run();
    }
};