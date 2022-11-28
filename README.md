## Inbetriebnahme

* Packages Installieren `npm i`
* Datenbank per Docker starten
  * in den db-docker Ordner navigieren; `docker-compose up -d`
* Datenbank erstellen
  * Auf `http://localhost:8080/` navigieren
    * Login: root
    * Password: docker
  * Datenbank Names `bill` erstellen
* Server per SSR starten `npm run dev:ssr`
  * Tabellen werden generiert beim start
  * Benutzer muss erstellt bsw.
```
POST: http://localhost:4200/api/create/user  
  
{"username": "Hans",
  "password": "Hansi123",
  "firstname":"Hans" ,
  "lastname":"Peter" ,
  "gender":"M" ,
  "address":"Baslerstrasse",
  "city":"Basel" ,
  "job":"-" ,
  "admin":0}
```
