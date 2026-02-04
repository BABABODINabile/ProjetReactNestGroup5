<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# ProjetGroupe5 - API NestJS

## Description

API backend développée avec NestJS pour le projet de groupe 5. Ce dépôt contient l'implémentation des modules principaux suivants :

- Auth (JWT)
- Users
- Roles
- Categories
- Transactions
- Attachements

Le projet utilise TypeORM avec MySQL et bcrypt pour le hachage des mots de passe.

## Tech stack

- Node.js + TypeScript
- NestJS
- TypeORM
- MySQL (via mysql2)
- JWT (via @nestjs/jwt)

## Prérequis

- Node.js 18+ (ou version recommandée compatible avec les dépendances)
- npm
- Une base de données MySQL accessible

## Installation

1. Cloner le dépôt

   git clone <repo-url>

2. Installer les dépendances

   npm install

3. Créer un fichier d'environnement (ex : `.env`) à la racine et définir les variables nécessaires (exemples ci-dessous).

### Variables d'environnement recommandées

- DATABASE_HOST=localhost
- DATABASE_PORT=3306
- DATABASE_USER=root
- DATABASE_PASS=changeme
- DATABASE_NAME=projetgroupe5
- JWT_SECRET=une_clef_secrete
- JWT_EXPIRES_IN=3600s

## Configuration et base de données

Le projet utilise TypeORM. Assurez-vous que la base de données existe et que les informations de connexion dans les variables d'environnement sont correctes. Si vous avez des migrations dans le projet, exécutez-les ; sinon TypeORM peut synchroniser le schéma si configuré (attention en production).

## Commandes utiles (npm scripts)

- `npm install`           # installer les dépendances
- `npm run start`         # lancer en production (ou via `node dist/main` après build)
- `npm run start:dev`     # lancer en mode développement (watch)
- `npm run build`         # compiler TypeScript dans /dist
- `npm run lint`          # lancer ESLint et corriger
- `npm run test`          # lancer les tests unitaires
- `npm run test:e2e`      # exécuter les tests end-to-end
- `npm run test:cov`      # coverage

## Structure du projet

Les dossiers principaux sont dans `src/` :

- `auth/` — login, jwt strategy, guards
- `users/` — gestion des utilisateurs
- `roles/` — gestion des rôles
- `categories/` — catégories et leur type
- `transactions/` — création et gestion des transactions
- `attachements/` — fichiers/attachements

## Endpoints principaux (exemples)

Les routes peuvent dépendre du préfixe configuré dans `main.ts`. Voici des endpoints courants (adapter selon le contrôleur) :

- `POST /auth/login` — authentification (retourne JWT)
- `GET /users` — lister les utilisateurs (auth + rôle)
- `POST /users` — créer utilisateur
- `PATCH /users/:id` — mettre à jour
- `GET /roles` — gérer les rôles
- `GET /categories` — lister catégories
- `POST /transactions` — créer transaction (auth)
- `POST /attachements` — uploader un fichier

## Authentification

L'API utilise JWT. Exemple d'usage avec curl :

1) Obtenir le token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

2) Appeler un endpoint protégé

```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:3000/users
```

## Tests

Les tests sont gérés par Jest. Commandes :

- `npm run test`        # tests unitaires
- `npm run test:e2e`    # tests end-to-end (configuration dans `test/jest-e2e.json`)

## Bonnes pratiques

- Ne jamais mettre `JWT_SECRET` en clair dans le repo. Utiliser `.env` ou un secret manager.
- Configurer la production pour ne pas utiliser `synchronize: true` dans TypeORM.
- Ajouter une CI (GitHub Actions / GitLab CI) pour lancer lint et tests.

## Contribution

1. Fork & clone
2. Créer une branche feature/fix : `git checkout -b feat/ma-fonctionnalite`
3. Commits clairs et tests
4. PR vers `main` avec description et screenshots si nécessaire


## Licence

Le champ `license` dans `package.json` est `UNLICENSED`. Si vous souhaitez ouvrir le code, choisissez une licence (MIT, Apache-2.0, etc.) et mettez à jour `package.json` et ce fichier.

## Contact

Pour toute question, ouvrez une issue dans ce dépôt ou contactez l'auteur du projet.

---

Fait le: 04 février 2026
