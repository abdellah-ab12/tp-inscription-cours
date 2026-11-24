# TP Inscription aux cours (Firebase, BaaS + FaaS)

Application d'inscription aux cours :

- Firebase Auth + Firestore (BaaS)
- Cloud Function déclenchée à la création d'une inscription (FaaS)

Tout tourne en local avec l'émulateur Firebase (plan Spark, sans carte bancaire).

## Lancer

1. Installer les dépendances :

        cd functions
        npm install
        cd ..

2. Démarrer les émulateurs :

        firebase emulators:start

3. Créer 2 utilisateurs dans http://127.0.0.1:4000/auth et une collection `courses`
   dans http://127.0.0.1:4000/firestore (champs : `titre` string, `capacite` number,
   `inscrits` number).
4. Ouvrir http://127.0.0.1:5000

## Fonctionnement

Inscription créée (`pending`), événement Firestore, fonction `onEnrollmentCreated`,
vérification de la capacité, `confirmed` ou `refused`, trace de l'e-mail dans les logs.
