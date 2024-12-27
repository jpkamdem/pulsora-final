#!/bin/bash

# Lancer le serveur web dans un nouveau terminal
docker compose down -v

docker rmi pulsora-api:latest pulsora-web:latest

gnome-terminal -- bash -c "cd ./web && npm i && npm run dev; exec bash"

# Lancer le serveur API dans un autre terminal
gnome-terminal -- bash -c "cd ./api && npm i && docker compose up --wait db && npx prisma db push && npm run dev; exec bash"

echo "Les serveurs Web et API ont été démarrés dans des terminaux séparés."
