# dojo-modules-testing
**De start van dit project is de applicatie die we tijdens de modules opdracht gemaakt hebben. Volg onderstaande stappen om een idee te krijgen wat er nodig is om een applicatie die gebruik maakt van de ESRI JavaScript API te testen.**

* Voeg aan je package.json de volgende devDependencies en een test script toe:
```diff
{
  "name": "dojo-modules-testing",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start":"lite-server",
+    "test": "echo \"Testing: \" && karma start" 
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "lite-server": "2.3.0",
+    "karma": "1.7.0",
+    "karma-chrome-launcher": "2.1.1",
+    "karma-dojo": "0.0.1",
+    "karma-jasmine": "1.1.0",
+    "jasmine-core": "2.6.1" 
  }
}

``` 
* Installeer de nieuwe dependencies
```
npm install
```
* Voeg een karma.conf.js bestand toe
  * Wanneer je bij de eerste modules opdracht de karma-cli dependecy globaal (-g) geïnstalleerd hebt, kun je een karma.conf.js bestand toevoegen door het volgende commando uit te voeren:
  ```
  karma init
  ```
  * Kies overal voor de standaard opties.
* Voeg een testfolder aan de js folder toe en plaats daarin het bestand main.js
  * Voeg de volgende inhoud in dit bestand toe:
  ```javascript
  (function(window) {
    'use strict';

    var allTestFiles = [];
    var TEST_REGEXP = /.*\.test\.js$/;

    for (var file in window.__karma__.files) {
        if (TEST_REGEXP.test(file)) {
        allTestFiles.push(file);
        }
    }

    window.dojoConfig = {
        packages: [
        // local pacakges to test
        {
            name: 'app',
            location: '/base/js/app'
        },

        // esri/dojo packages
        {
            name: 'dgrid',
            location: 'http://js.arcgis.com/3.20/dgrid'
        }, {
            name: 'dijit',
            location: 'http://js.arcgis.com/3.20/dijit'
        }, {
            name: 'esri',
            location: 'http://js.arcgis.com/3.20/esri'
        }, {
            name: 'dojo',
            location: 'http://js.arcgis.com/3.20/dojo'
        }, {
            name: 'dojox',
            location: 'http://js.arcgis.com/3.20/dojox'
        }, {
            name: 'put-selector',
            location: 'http://js.arcgis.com/3.20/put-selector'
        }, {
            name: 'util',
            location: 'http://js.arcgis.com/3.20/util'
        }, {
            name: 'xstyle',
            location: 'http://js.arcgis.com/3.20/xstyle'
        }, {
            name: 'moment',
            location: 'http://js.arcgis.com/3.20/moment',
        }
        ],
        async: true
    };


    /**
    * This function must be defined and is called back by the dojo adapter
    * @returns {string} a list of dojo spec/test modules to register with your testing framework
    */
    window.__karma__.dojoStart = function() {
        return allTestFiles;
    };
    })(window);

  ```
  * Dit bestand gaat er voor zorgen dat de testfiles beschikbaar worden gesteld en dat je lokale modules en de dojo en esri modules beschikbaar zijn in je testen.
* Voeg de testfolder en alle JavaScript files daarin toe aan je karma.conf.js configuratie. Zorg er ook voor dat je gewone JavaScript bestanden in de configuratie opgenomen worden.
```diff
// Karma configuration
// Generated on Thu Jun 29 2017 20:39:19 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
+    frameworks: ['jasmine', 'dojo'],


    // list of files / patterns to load in the browser
    files: [
+      'https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js',
+      'js/test/main.js',

      // all the sources, tests
+      {pattern: 'js/**/*.js', included: false}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
```
* Maak in de testfolder vervolgens een speech.test.js bestand aan met de volgende inhoud:
```javascript
define([
  'esri/dijit/Search',
  'esri/map',
  'dojo/dom-construct',
  'app/speechSearch'
], function(
  Search,
  Map,
  domConstruct,
  SpeechSearch
) {
  
  describe('.fetchCurrentTemperature', function() {
    var searchPromise;
    var promiseHelper;

    var map;
    var frag;
    var anyangg;

    // create the map
    beforeEach(function() {
      frag = document.createDocumentFragment();
      var div = domConstruct.create('div', {style: 'width:300px;height:200px'});
      domConstruct.place(div, frag);
      map = new Map(div, {
          basemap: "topo",
          center: [-122.45, 37.75],
          zoom: 13,
          sliderStyle: "small"
      });
      console.log('created map');
    });

    // destroy the map
    afterEach(function() {
      map.destroy();
      map = null;
      frag = null;
    });

    beforeEach(function() {
      var promise = new Promise(function(resolve, reject) {
        promiseHelper = {
          resolve: resolve,
          reject: reject
        };
      });

      speechSearcher = new SpeechSearch(map);
      spyOn(speechSearcher.search, "search").and.returnValue(promise);
      searchPromise = speechSearcher.searching('test');

    });

    describe('on succesfull search', function() {
      beforeEach(function() {
        promiseHelper.resolve(['found']);
      });

      it('resolves its promise with the searchresult', function(done) {
        searchPromise.then(function(result) {
          expect(result).toEqual('found');
          done();
        });
      });
    });

    describe('on unsuccesfull search', function() {
      beforeEach(function() {
        promiseHelper.resolve(null);
      });

      it('resolves its promise with the searchresult', function(done) {
        searchPromise.then(function(result) {
          expect(result).toEqual(null);
          done();
        });
      });
    });

    
  });
});
```