docker compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
docker compose up -d
npm ci
npm run hasura:init
npm run build
