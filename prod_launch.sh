#!/bin/sh
docker compose down -v
docker rmi pulsora-api:latest pulsora-web:latest
docker compose up --wait && docker compose restart api
