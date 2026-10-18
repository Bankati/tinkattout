# École Tinka-Tout

Site vitrine et pré-inscription en ligne pour une école primaire, avec back-office d'administration.

## À propos

École Tinka-Tout présente l'établissement aux parents (programmes, classes, vie scolaire, actualités), leur permet de **pré-inscrire un enfant en ligne** en quelques minutes, et donne à l'administration un espace pour **suivre et traiter les demandes**.

### Fonctionnalités

**Site public**
- Accueil, présentation de l'école et des classes (CP → CM2)
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

# Variables d'environnement requises (base de données) :
# DATABASE_URL, DIRECT_URL — voir prisma/schema.prisma

npx prisma db push   # synchronise le schéma avec la base
npm run dev           # http://localhost:3000
```

## Auteur

Développé par [Mabibè Bankati](https://github.com/Bankati) pour l'école Tinka-Tout.
