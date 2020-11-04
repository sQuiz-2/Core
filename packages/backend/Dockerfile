FROM node:12.16.3-alpine as builder
RUN apk add git --no-cache
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY packages/api ./packages/api
RUN yarn install --pure-lockfile --non-interactive
WORKDIR /app/packages/api
RUN node ace build --production
WORKDIR /app/packages/api/build
RUN yarn install

FROM node:12.16.3-alpine
WORKDIR /app
COPY --from=builder /app/packages/api/build .
EXPOSE 3333
CMD ["node", "server.js"]
