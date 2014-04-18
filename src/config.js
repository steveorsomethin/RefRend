/* 
 * Config for bootstrapping the application, and mapping dependencies
 */

var require = {
    baseUrl: '../',

    paths: {
        // Libs
        three: './deps/three',
        threeStats: './deps/stats.min',
        // Modules
        application: './src/application',
        matrix: './src/math/matrix'
    },

    shim: {
        three: {
            exports: 'THREE'
        },
        threeStats: {
            exports: 'Stats',
            deps: ['three']
        }
    },

    deps: [
        // 'stuff here',
    ],

    callback: function() {
        console.log('Configuration loaded');

        // Bootstrap the main application entry point
        require(['application']);
    }
};