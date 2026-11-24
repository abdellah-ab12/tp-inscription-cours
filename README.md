\# TP Inscription aux cours (Firebase, BaaS + FaaS)



Application d'inscription aux cours : Firebase Auth + Firestore (BaaS),

Cloud Function déclenchée à la création d'une inscription (FaaS).

Tout tourne en local avec l'émulateur Firebase (plan Spark, sans carte bancaire).



\## Lancer

1\. `cd functions \&\& npm install \&\& cd ..`

2\. `firebase emulators:start`

3\. Créer 2 utilisateurs dans http://127.0.0.1:4000/auth et des cours dans

&#x20;  `courses` (champs : titre, capacite, inscrits).

4\. Ouvrir http://127.0.0.1:5000



Aucune clé secrète dans ce dépôt.

