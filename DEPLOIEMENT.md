# Déploiement — OMYA CAPITAL

Le site est une application **Laravel 13 + PHP 8.3 + PostgreSQL**, pas un site
statique. Il lui faut un hébergeur capable d'exécuter du PHP et de parler à une
base de données.

Le `Dockerfile` à la racine produit une image qui tourne telle quelle sur
**Railway, Render, Fly.io, Scaleway, ou n'importe quel serveur** sachant lancer
un conteneur. Aucun hébergeur n'est imposé et changer d'avis ne demande aucune
réécriture.

---

## Pourquoi pas Vercel

Vercel n'a pas de runtime PHP officiel — seulement un portage communautaire.
S'ajoutent trois contraintes : la base de données doit être externe, Redis
n'existe pas, et le système de fichiers est en lecture seule alors que Laravel
a besoin d'écrire dans `storage/`. C'est faisable, mais on construirait une
installation fragile pour faire des tests.

**Recommandation : Railway.** Il détecte le `Dockerfile`, fournit un PostgreSQL
managé, et donne une URL en quelques minutes.

---

## Mise en ligne, pas à pas

### 1. Créer le service

Sur Railway : *New Project* → *Deploy from GitHub repo* → `FortibCode/omya-capital`.
Il repère le `Dockerfile` tout seul.

Puis *New* → *Database* → *Add PostgreSQL*. Railway renseigne alors `PGHOST`,
`PGPORT`, `PGDATABASE`, `PGUSER` et `PGPASSWORD`, à reporter ci-dessous.

### 2. Générer la clé d'application

En local :

```bash
php artisan key:generate --show
```

Elle sert à chiffrer les sessions et les cookies. **Ne la commitez jamais**,
collez-la directement dans les variables de l'hébergeur.

### 3. Les variables d'environnement

| Variable | Valeur | Pourquoi |
|---|---|---|
| `APP_NAME` | `OMYA CAPITAL` | |
| `APP_ENV` | `production` | |
| `APP_KEY` | *(celle de l'étape 2)* | |
| `APP_DEBUG` | `false` | Sinon une erreur affiche le code source et les identifiants de la base |
| `APP_URL` | l'URL fournie par l'hébergeur | Sert à construire les liens absolus |
| `APP_LOCALE` | `fr` | |
| `APP_FALLBACK_LOCALE` | `en` | **Si vous mettez `fr`, les erreurs de formulaire s'afficheront en clés brutes** (`validation.required`) pour toute règle non traduite |
| `DB_CONNECTION` | `pgsql` | |
| `DB_HOST` | `${{Postgres.PGHOST}}` | |
| `DB_PORT` | `${{Postgres.PGPORT}}` | |
| `DB_DATABASE` | `${{Postgres.PGDATABASE}}` | |
| `DB_USERNAME` | `${{Postgres.PGUSER}}` | |
| `DB_PASSWORD` | `${{Postgres.PGPASSWORD}}` | |
| `SESSION_DRIVER` | `database` | Évite d'avoir à payer un Redis |
| `CACHE_STORE` | `database` | idem |
| `QUEUE_CONNECTION` | `sync` | Aucune file d'attente n'est utilisée aujourd'hui |
| `SESSION_SECURE_COOKIE` | `true` | Le cookie de session ne part qu'en HTTPS |
| `FILESYSTEM_DISK` | `public` | |

En local la configuration utilise Redis pour les sessions, le cache et les
files. Les trois sont remplacés ici par la base de données : les tables
existent déjà (`sessions`, `cache`, `jobs`) et cela supprime un service à
héberger. Pour un site de cette taille, la différence de performance n'est pas
perceptible.

### 4. Remplir la base — une seule fois

Après le premier déploiement, dans la console de l'hébergeur :

```bash
php artisan db:seed --force
```

Les migrations tournent automatiquement à chaque démarrage, mais **pas** le
seeder. C'est volontaire : il commence par vider les tables `services`,
`team_members` et `partners` avant de les réécrire. Lancé après coup, il
effacerait toute modification faite depuis l'administration.

---

## Avant d'ouvrir au public

- [ ] **Les e-mails ne partent pas.** `MAIL_MAILER=log` : les messages du
      formulaire de contact sont enregistrés en base et écrits dans les
      journaux, mais personne ne reçoit rien. Il faut un vrai SMTP
      (`MAIL_MAILER=smtp` + hôte, port, identifiants) et remplacer l'expéditeur
      `hello@example.com` dans `MAIL_FROM_ADDRESS`.
- [ ] **Les réseaux sociaux pointent dans le vide.** `SOCIAL_LINKS` dans
      `resources/js/Components/SocialLinks.jsx` mène à `linkedin.com`,
      `facebook.com` et `x.com` — les pages d'accueil de ces sites, pas les
      comptes d'OMYA. À remplacer ou à retirer.
- [ ] **Aucun article ni document publié.** Les tables `posts` et `documents`
      sont vides : les pages Actualités et Documents afficheront leur message
      « aucun contenu pour le moment ».

---

## Notes

**Les images de l'équipe et des partenaires sont dans le dépôt.** Elles vivent
dans `storage/app/public`, que Laravel exclut par défaut du versionnement
puisque ce dossier est prévu pour les fichiers téléversés. Les sept fichiers y
ont été ajoutés de force : sans cela, les pages Équipe et Partenaires
s'afficheraient avec des images cassées sur tout hébergeur au système de
fichiers éphémère. Si un jour l'administration sert à téléverser des images,
il faudra un volume persistant ou un stockage objet (S3), et ces sept fichiers
pourront ressortir du dépôt.

**Le `Dockerfile` n'a pas pu être construit ni testé localement** — Docker
n'est pas installé sur la machine de développement. Il suit les pratiques
courantes pour Laravel + FrankenPHP, mais la première construction se fera
chez l'hébergeur.
