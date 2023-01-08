## Inbetriebnahme

* Packages Installieren `$ npm i`
* Datenbank per Docker starten
  * per Terminal in den `db-docker` Ordner navigieren; `$ docker-compose up -d` ausführen
* Datenbank und Benutzer prüfen
  * Auf `http://localhost:8080/` im Web navigieren
    * Login: root
    * Password: docker
  * Prüfen ob eine Datenbank mit dem Namen `bill` existiert.
  * Auf `Rechte` klicken
    * Prüfen ob der Benutzer `bill` existert.
* Server per SSR starten `$ npm run dev:ssr`
  * Tabellen werden beim start für `bill` generiert.
  * `http://localhost:4200` kann jetzt im Web aufgerufen werden.

## Web User erstellen

Um einen Webbenutzer zu erstellen, wird per `POST Request` folgenden Route angefragt mit folgenden Daten.

```
POST: http://localhost:4200/dev/create/user  
  
{"username": "Hansi123",
  "password": "Hansi123",
  "firstname":"Hans" ,
  "lastname":"Peter" ,
  "gender":"M" ,
  "address":"Baslerstrasse 2",
  "city":"Basel" ,
  "job":"Unbekannt" ,
  "admin":0}
```

Der Admin Wert kann optional auf `1` gesetzt werden.

Man kann sich dann mit dem Benutzer auf `http://localhost:4200` einloggen.
