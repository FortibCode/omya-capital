# OMYA CAPITAL — image de déploiement
#
# Une seule image, un seul processus : FrankenPHP sert directement public/.
# Elle tourne telle quelle sur Railway, Render, Fly.io, ou n'importe quel
# serveur capable de lancer un conteneur — donc aucun hébergeur n'est imposé,
# et passer de l'un à l'autre ne demande aucune réécriture.
#
# Ce qu'il faut fournir à l'exécution : voir DEPLOIEMENT.md

# ─── 1. Les assets du front ───────────────────────────────────────────────
FROM node:22-alpine AS assets

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Vite lit la configuration, les sources et le CSS ; il a aussi besoin des
# vues Blade, que Tailwind scanne pour savoir quelles classes garder.
COPY vite.config.js tailwind.config.js postcss.config.js ./
COPY resources ./resources
RUN npm run build


# ─── 2. L'application ─────────────────────────────────────────────────────
FROM dunglas/frankenphp:1-php8.3-alpine AS app

# pdo_pgsql pour Postgres ; intl pour les dates et les nombres en français ;
# gd pour les images ; zip et opcache pour Composer et les performances.
RUN install-php-extensions pdo_pgsql intl gd zip opcache

WORKDIR /app

# Composer d'abord et seul : tant que ces deux fichiers ne changent pas, cette
# couche est réutilisée et l'installation des dépendances est sautée.
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction

COPY . .
COPY --from=assets /app/public/build ./public/build

RUN composer dump-autoload --optimize --no-dev --classmap-authoritative

# storage/ et bootstrap/cache/ doivent rester inscriptibles : Laravel y écrit
# les vues compilées, les journaux et les fichiers de session.
RUN chmod -R 775 storage bootstrap/cache

# Le lien public/storage → storage/app/public, qui sert les portraits de
# l'équipe et les logos des partenaires. Il est dans .gitignore, donc il
# n'existe pas dans le dépôt et doit être recréé ici.
RUN php artisan storage:link --force || true

# FrankenPHP écoute sur le port que l'hébergeur impose via $PORT.
ENV SERVER_NAME=:8080
EXPOSE 8080

# Les caches de configuration et de routes sont construits au démarrage, pas
# à la construction de l'image : ils figent les variables d'environnement, qui
# ne sont connues qu'à l'exécution.
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
