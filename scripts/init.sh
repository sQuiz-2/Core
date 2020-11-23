yarn &&
docker-compose up -d &&
yarn shared build &&
cp ./packages/backend/.env.example ./packages/backend/.env &&
yarn backend cmd migration:run &&
yarn backend cmd db:seed &&
yarn start