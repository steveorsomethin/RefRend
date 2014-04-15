/* 
* Config for bootstrapping the application, and mapping dependencies
*/

var require = {
    baseUrl: '../',

    paths: {
        // Modules
    },

    deps: [

    ],

    callback: function() {
        console.log('Configuration loaded');

        mocha.run();
    }
};