#!/bin/sh
set -e

# L'hébergeur impose son port via $PORT et il change d'un déploiement à
# l'autre. Le Caddyfile de FrankenPHP lit $SERVER_NAME, donc c'est ici qu'on
# fait le lien — sinon le conteneur écoute sur 8080 pendant que l'hébergeur
# interroge un autre port, et le service est déclaré en échec.
export SERVER_NAME=":${PORT:-8080}"

# Les caches figent les variables d'environnement, qui ne sont connues qu'ici —
# pas au moment de construire l'image. On les reconstruit donc à chaque
# démarrage, après avoir vidé ceux qu'une image précédente aurait laissés.
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Les migrations tournent à chaque démarrage pour que la base suive le code.
# --force parce qu'en production Laravel demande confirmation et qu'il n'y a
# personne pour répondre.
php artisan migrate --force

# Le remplissage initial, lui, ne doit tourner qu'une fois : le seeder vide
# les tables services, team_members et partners avant de les réécrire, donc à
# chaque redémarrage il effacerait ce qui aurait été modifié depuis.
#
# Sur un hébergement sans accès console (l'offre gratuite de Render, par
# exemple), c'est le seul moyen de peupler la base. On met SEED_ON_BOOT=true
# pour le premier déploiement, puis on retire la variable.
if [ "${SEED_ON_BOOT}" = "true" ]; then
    echo "SEED_ON_BOOT=true — remplissage initial de la base"
    php artisan db:seed --force
fi

exec frankenphp run --config /etc/caddy/Caddyfile --adapter caddyfile
