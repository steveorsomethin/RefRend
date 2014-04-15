'use strict';

/* 
 * Config for bootstrapping the application, and mapping dependencies
 */

var require = {
    baseUrl: './',

    paths: {
        // Libs
        three: './deps/three',
        threeStats: './deps/stats.min',
        rx: './deps/rx',
        rxBinding: './deps/rx.binding',
        rxTime: './deps/rx.time',
        rxDom: './deps/rx.dom',
        gen: './deps/gen',
        // Modules
        application: './application'
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