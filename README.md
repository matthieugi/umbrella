# demo-dev-velocity

## Prérequis

**Prérequis VS Dev On Container**
 - Visual Studio Code
 - Docker Desktop
 - Remote Extension
 - Windows 10 2004
 - WSL 2

**Prérequis CodeSpaces**
- Internet
- Navigateur
- Github Access
- Request CodeSpace Preview Access

## Démo

![Demo worlkflow](/presentation_overview.png)

#### Introduction

* Présentation de l'organisation du projet
* Histoire utilisation de git en interne
* Présentation des devContainers 

* Intération avec ses utilisateurs finaux via outil de ticketing (Service now), et création d'une issue lorsque une modification doit être apportée au produit

#### Arrivée d'un nouveau développeur

* StandUp Meeting
* Connexion via navigateur à GitHub Workspaces
* Nouvelle branche avec #issue
* Proposition de correction de code, création et soumission d'un PR
* Démo vérification automatisée de code avec des bots

#### Validation et intégration du code

* Présentation de devcontainer dans VSCode
* Review du PR avec commentaire #TODO
    * Voir ce qu'il est possible à faire ou validation
    * Action à faire (et à trouver) côté ND
* LD autorise le merge de la pull request
* Vérification du board Kamabn TODO | IN PROGRESS | DONE 

#### Déploiement

* Déclenchement et démonstration de la création d'un workflow
* Build de l'image et push dans un container registry
* Notification au Lead Dev
* Confirmation avant passage en production

## TODO

* [ ] Trouver les actions possibles à faire avec les commentaires dans un PR
* [x] Push du code umbrella en mode serverless
* [ ] Création des workflow de validation de code 
* [ ] Création des workflow de déploiement