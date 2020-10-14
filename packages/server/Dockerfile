FROM node:12.16.3-alpine as build
RUN apk add --no-cache git
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY packages/api ./packages/api
COPY packages/server ./packages/server
RUN yarn install --pure-lockfile --non-interactive
WORKDIR /app/packages/api
RUN yarn build
WORKDIR /app/packages/server
RUN yarn build

FROM node:12.16.3-alpine
RUN apk add --no-cache git
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY --from=build /app/packages/server/package.json /app/packages/server/package.json
COPY --from=build /app/packages/server/dist /app/packages/server/dist
COPY --from=build /app/packages/api/package.json /app/packages/api/package.json
COPY --from=build /app/packages/api/build /app/packages/api/build
RUN yarn install --pure-lockfile --non-interactive --production
WORKDIR /app/packages/server
EXPOSE 4240
CMD ["node", "dist/index.js"]