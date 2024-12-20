# REST API

Projet étudiant d'application de gestion d'un club sportif

### Stack

#### Front

- React
- TailwindCSS

#### Back

- Docker
- PostgreSQL 16
- Express.js
- Prisma

Tout le projet est réalisé avec TypeScript

## Déploiement

#### Prérequis

- Docker
- Node

Créer 2 fichiers .env identiques, l'un à la racine prisma/, l'autre à l'emplacement prisma/api/ et collez ceci à l'intérieur :

```env
POSTGRES_DB=mydb
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
dev=localhost
prod=db

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${prod}:5432/${POSTGRES_DB}?schema=public
```

Selon la méthode de déploiement que vous choisirez, veuillez modifier la variable dev ou prod dans l'URL de la base de donnée dans les 2 fichiers.

#### Développement

```bash
cd prisma/api/
npm i
docker compose up -d
npx prisma db push
npm run dev
```

#### Production

```bash
cd prisma/
docker compose up --wait
```

Assurez-vous d'avoir bel et bien modifié les valeurs précisées ci-dessus <b>avant la construction des images</b>.
Si les données ne sont pas chargées convenablement, veuillez écrire la commande suivante :

```bash
docker compose restart api
```

La base de donnée a besoin de quelques secondes avant de pouvoir être disponible, il est possible que l'API démarre trop rapidement. Ce cas de figure peut arriver si vous privilégiez de construire et de lancer les images séparément. Il est vivement recommandé de se tenir aux commandes présentées ci-dessus.
