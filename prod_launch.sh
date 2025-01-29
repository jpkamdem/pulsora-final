#!/bin/sh
docker compose down -v
docker rmi pulsora-api:latest pulsora-web:latest
docker compose up --build -d && docker compose restart api
