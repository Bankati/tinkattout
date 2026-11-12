# École Tinka-Tout

Site vitrine et pré-inscription en ligne pour une école primaire, avec back-office d'administration.

## À propos

École Tinka-Tout présente l'établissement aux parents (programmes, classes, vie scolaire, actualités), leur permet de **pré-inscrire un enfant en ligne** en quelques minutes, et donne à l'administration un espace pour **suivre et traiter les demandes**.

### Fonctionnalités

**Site public**
- Accueil, présentation de l'école et des classes (Maternelle (PS) → CM2)
- Pré-inscription en ligne avec page de confirmation
- Actualités / annonces (liste + page de détail)
- Galerie photo de la vie scolaire
- Page contact, mentions légales et politique de confidentialité

**Espace admin** (accès protégé)
- Tableau de bord
- Gestion des inscriptions (suivi de statut : en attente / approuvée / refusée)
- Gestion des messages de contact
- Paramètres

### Stack technique

- **Framework** : Next.js 16 (App Router), React 19, TypeScript
- **Style** : Tailwind CSS v4, Framer Motion
- **Base de données** : PostgreSQL, via Prisma ORM
- **Authentification admin** : sessions signées (JWT via `jose`), mots de passe hashés avec `bcryptjs`
- **Validation** : Zod
- **Hébergement** : Vercel

## Installation

```bash
git clone https://github.com/Bankati/tinkattout.git
cd tinkattout
npm install

# Variables d'environnement obligatoires (modèle commenté dans .env.example) :
# DATABASE_URL, DIRECT_URL, AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
cp .env.example .env   # puis remplacer toutes les valeurs (base locale ou de dev, jamais la production)

npm run db:deploy     # applique les migrations de prisma/migrations
npm run db:seed       # crée le compte admin (ADMIN_EMAIL / ADMIN_PASSWORD)
npm run dev           # http://localhost:3000
```

| Variable | Rôle |
|---|---|
| `DATABASE_URL` | Connexion de l'application : pooler Supabase en mode transaction (port 6543), avec `?pgbouncer=true&connection_limit=1` |
| `DIRECT_URL` | Connexion de Prisma Migrate : pooler Supabase en mode session (port 5432) |
| `AUTH_SECRET` | Clé de signature des sessions admin, générée avec `openssl rand -base64 32` ; une valeur différente par environnement |
| `ADMIN_EMAIL` | Email du compte admin créé par le seed (enregistré en minuscules) |
| `ADMIN_PASSWORD` | Mot de passe du compte admin créé par le seed (12 caractères minimum). Un compte existant n'est pas modifié, sauf avec `RESET_ADMIN_PASSWORD=1` |

## Base de données : migrations Prisma

Le schéma de la base évolue uniquement par des **migrations versionnées** (`prisma/migrations`).
`prisma db push` n'est plus utilisé sur la production ni sur une base partagée.

- **Nouvelle base vide** : `npm run db:deploy` crée toutes les tables.
- **Changer le schéma** : modifier `prisma/schema.prisma`, puis `npm run db:migrate -- --name description_courte`
  sur une base **locale** (jamais la production). Si Prisma propose de réinitialiser la base, répondre **non** et chercher l'écart.
  Committer le dossier de migration créé avec le changement de code.
- **Production** : le build Vercel lance `prisma migrate deploy` seulement quand `VERCEL_ENV=production`
  (script `prisma/vercel-migrate.js`). Si une migration échoue, le build échoue et l'ancienne version reste en ligne.
- Ne jamais modifier une migration déjà appliquée. Ne jamais supprimer ni renommer une colonne dans la même version qu'un changement de code
  (d'abord ajouter, puis migrer le code, puis supprimer dans une version suivante).

### Passage de `db push` à `migrate` (une seule fois)

La production a été créée avec `db push` : elle contient déjà les tables, mais pas l'historique des migrations.
La migration `0_init` décrit exactement ce schéma de départ. Il faut la déclarer « déjà appliquée », **une seule fois par base**, **avant** le premier déploiement
qui contient `prisma/migrations` (sinon `migrate deploy` refuse de tourner sur une base non vide, erreur P3005, et le build échoue sans dégât).

À faire **par Mabibè uniquement**, depuis son poste, avec `DIRECT_URL` pointant sur la production :

1. Faire une sauvegarde (section suivante) et vérifier qu'elle se déchiffre.
2. Vérifier que la production correspond au schéma (lecture seule) :
   `npx prisma migrate diff --from-url "$DIRECT_URL" --to-schema-datamodel prisma/schema.prisma --script`
   Le résultat doit être `-- This is an empty migration.` Sinon, **s'arrêter** et signaler l'écart.
3. Déclarer la migration de départ :
   `npx prisma migrate resolve --applied 0_init`
   (crée la table `_prisma_migrations` et y inscrit `0_init`, sans toucher aux autres tables).
4. Contrôler : `npx prisma migrate status` doit afficher `Database schema is up to date!`
5. Refaire les étapes 2 à 4 sur la base de développement partagée, si elle a aussi été créée avec `db push`.

## Sauvegarde et restauration

**Sauvegarde automatique** : le workflow `.github/workflows/db-backup.yml` lance chaque dimanche à 02:00 UTC (et à la demande, onglet Actions >
« Sauvegarde base de données » > Run workflow) un `pg_dump` (client PostgreSQL 17, compatible avec un serveur 15 ou 17) du schéma `public`.
Le fichier est chiffré avec gpg (AES-256) puis gardé **30 jours** comme artefact GitHub.

Secrets GitHub à créer : `DATABASE_BACKUP_URL` (pooler Supabase en mode session, port 5432, avec `?sslmode=require`) et `BACKUP_PASSPHRASE`
(phrase longue et aléatoire, **rangée aussi hors de GitHub** : sans elle, les sauvegardes sont illisibles). Sans ces secrets, le workflow échoue volontairement.

> L'artefact GitHub est une **première étape** : si le compte ou le dépôt GitHub devient inaccessible, les sauvegardes aussi.
> Un stockage hors GitHub reste à décider.

**Restauration sur une base locale** (outils PostgreSQL 17 installés, ou `docker run -d -p 5433:5432 -e POSTGRES_PASSWORD=postgres postgres:17`) :

```bash
# 1. Télécharger l'artefact (Actions > exécution > Artifacts), le dézipper, contrôler l'empreinte
sha256sum -c tinkattout-*.dump.gpg.sha256
# 2. Déchiffrer (demande BACKUP_PASSPHRASE)
gpg --output tinkattout.dump --decrypt tinkattout-*.dump.gpg
# 3. Restaurer dans une base locale vide
createdb -h localhost -p 5433 -U postgres tinkattout_restore
pg_restore --no-owner --no-privileges -h localhost -p 5433 -U postgres -d tinkattout_restore tinkattout.dump
#    Variante psql : convertir en SQL lisible, puis l'exécuter
#    pg_restore --no-owner --no-privileges -f tinkattout.sql tinkattout.dump
#    psql -h localhost -p 5433 -U postgres -d tinkattout_restore -f tinkattout.sql
# 4. Contrôler les comptes de lignes
psql -h localhost -p 5433 -U postgres -d tinkattout_restore -c 'SELECT (SELECT count(*) FROM "Contact") AS contacts, (SELECT count(*) FROM "Registration") AS inscriptions, (SELECT count(*) FROM "News") AS actualites, (SELECT count(*) FROM "Admin") AS admins;'
```

Des messages d'erreur sur `schema "public" already exists` ou sur les rôles Supabase (`anon`, `authenticated`) sont sans conséquence sur une base locale.
Supprimer le fichier déchiffré et la base locale après le test : ils contiennent des données personnelles.

**Test de restauration chaque trimestre** (janvier, avril, juillet, octobre) : restaurer la dernière sauvegarde en local, comparer les comptes de lignes
avec ceux attendus, noter la date, le fichier testé et le résultat. Une sauvegarde jamais restaurée n'est pas une sauvegarde vérifiée.

Restaurer **sur la production** est une décision de la direction : faire d'abord une nouvelle sauvegarde de l'état actuel.

## Supabase : à vérifier

- **URL du pooler** : `DATABASE_URL` sur le port 6543 (mode transaction) avec `?pgbouncer=true&connection_limit=1`,
  `DIRECT_URL` sur le port 5432 (mode session), dans Vercel comme en local. L'hôte direct `db.<ref>.supabase.co` est en IPv6 seulement.
- **API REST** : Supabase expose le schéma `public` par son API (clé `anon`). Les tables créées par Prisma n'ont pas de RLS.
  Soit activer RLS sur les 4 tables (`Contact`, `Registration`, `Admin`, `News`) et sur `_prisma_migrations` (créée par l'étape `migrate resolve`),
  sans politique (Prisma, propriétaire des tables, n'est pas bloqué) ; soit couper l'API (Settings > Data API : retirer `public` des schémas exposés).
- **Plan et sauvegardes** : vérifier le plan du projet, la fréquence et la durée de rétention des sauvegardes Supabase, et si la restauration
  à un instant donné (PITR) est disponible. Ces sauvegardes ne remplacent pas celles du workflow : elles disparaissent avec le projet.
- **Version de PostgreSQL** du projet (15 ou 17) : le client 17 du workflow couvre les deux.

## Auteur

Développé par [Mabibè Bankati](https://github.com/Bankati) pour l'école Tinka-Tout.
