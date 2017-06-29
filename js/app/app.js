require([
    "esri/map",
    "app/speechSearch",
    "dojo/domReady!"
], function(Map, SpeechSearch) {
    var map = new Map("map", {
        center: [-53, -6.56],
        zoom: 8,
        basemap: "topo"
    });

    var speechSearch = new SpeechSearch(map);
});