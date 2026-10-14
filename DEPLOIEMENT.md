# Déploiement — OMYA CAPITAL

Le site est une application **Laravel 13 + PHP 8.3 + PostgreSQL**, pas un site
statique. Il lui faut un hébergeur capable d'exécuter du PHP et de parler à une
base de données.

Le `Dockerfile` à la racine produit une image qui tourne telle quelle sur
**Railway, Render, Fly.io, Scaleway, ou n'importe quel serveur** sachant lancer
un conteneur. Aucun hébergeur n'est imposé et changer d'avis ne demande aucune
réécriture.

---

## Où déployer

| | Coût | Remarque |
|---|---|---|
| **Render + Neon** | gratuit, sans carte | **Recommandé pour les tests.** Le service s'endort après 15 min d'inactivité et met ~40 s à se réveiller |
| Railway | payant | Le plus simple techniquement, mais l'essai gratuit a été supprimé |
| Vercel | — | **Ne convient pas** : aucun runtime PHP officiel, système de fichiers en lecture seule |

La base est chez **Neon** plutôt que chez Render parce que l'offre PostgreSQL
gratuite de Render expire au bout de quelques semaines, alors que celle de Neon
n'a pas d'échéance.

---

## Mise en ligne sur Render, pas à pas

### 1. La base de données

Sur [neon.tech](https://neon.tech) : créer un compte, puis un projet. Copier la
**connection string**, de la forme :

```
postgresql://utilisateur:motdepasse@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### 2. La clé d'application

En local :

```bash
php artisan key:generate --show
```

Elle chiffre les sessions et les cookies. **Ne la commitez jamais.**

### 3. Le service

Sur [render.com](https://render.com) : *New* → *Blueprint* → connecter le dépôt
**`FortibCode/omya-capital`**.

> Attention : vous avez un autre dépôt nommé `FortibCode/OmyaCapital`, sans
> tiret. Ce n'est pas celui-ci.

Render lit `render.yaml` et crée le service seul. Il demandera les trois
valeurs laissées vides, à coller dans son interface :

| Variable | Valeur |
|---|---|
| `APP_KEY` | la clé de l'étape 2 |
| `DB_URL` | la chaîne de connexion de l'étape 1 |
| `SEED_ON_BOOT` | `true` |

### 4. Après le premier déploiement

**Retirer `SEED_ON_BOOT`** dans les variables du service.

Elle sert à remplir services, équipe et partenaires au premier démarrage,
puisque l'offre gratuite de Render ne donne pas d'accès console. Mais le
seeder vide ces trois tables avant de les réécrire : laissée en place, elle
effacerait à chaque redémarrage tout ce qui aurait été modifié depuis.

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
