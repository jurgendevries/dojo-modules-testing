define([
    'dojo/_base/declare'
], function(declare) {
    return declare(null, {
        
        constructor: function(commands) {
            
            // Add our commands to annyang
            annyang.addCommands(commands);
            annyang.setLanguage('nl-NL');

            annyang.start();
            console.log('started');
        }
    });
});