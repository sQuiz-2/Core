yarn &&
docker-compose up -d &&
yarn shared build &&
cp ./packages/backend/.env.example ./packages/backend/.env &&
cp ./packages/client-admin/.env.example ./packages/client-admin/.env &&
yarn backend cmd migration:run &&
yarn backend cmd db:seed &&
yarn start