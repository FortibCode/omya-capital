#!/bin/sh
set -e

# Les caches figent les variables d'environnement, qui ne sont connues qu'ici —
# pas au moment de construire l'image. On les reconstruit donc à chaque
# démarrage, après avoir vidé ceux qu'une image précédente aurait laissés.
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Les migrations tournent au démarrage pour que la base suive le code sans
# intervention manuelle. --force parce qu'en production Laravel demande
# confirmation, et qu'il n'y a personne pour répondre.
php artisan migrate --force

# L'hébergeur impose son port ; 8080 sert de valeur par défaut en local.
exec frankenphp run --config /etc/caddy/Caddyfile --adapter caddyfile \
    2>/dev/null || exec frankenphp php-server --listen ":${PORT:-8080}" --root public
