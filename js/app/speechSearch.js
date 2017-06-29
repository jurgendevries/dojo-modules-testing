define([
    'dojo/_base/declare',
    'esri/dijit/Search',
    "app/speech"
], function(declare, Search, Speech) {
    return declare(null, {
        constructor: function(map) {
            this.search = new Search({
                enableLabel: true,
                enableInfoWindow: false,
                map: map
            }, "");
            this.search.startup();

            this.speech = new Speech({
                '*searchTerm': (searchTerm) => {
                    this.searching(searchTerm);
                }
            });
        },

        searching: function(searchTerm) {
            return this.search.search(searchTerm).then((result) => {
                if(result && result.length) {
                    return result[0];
                } else {
                    return null;
                }
            }, (error) => {
                console.log(error);
            });
        }
    });
});