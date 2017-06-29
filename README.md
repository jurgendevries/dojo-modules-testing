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
* Voeg een karma.conf.js bestand toe
* Voeg een testfolder aan het project toe en plaats daarin het bestand main.js
* Voeg de testfolder en alle JavaScript files daarin toe aan je karma.conf.js configuratie. Zorg er ook voor dat je gewone JavaScript bestanden in de configuratie opgenomen worden.
