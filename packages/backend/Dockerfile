FROM node:12.16.3-alpine as builder
RUN apk add git --no-cache
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY packages/backend ./packages/backend
RUN yarn install --pure-lockfile --non-interactive
WORKDIR /app/packages/backend
RUN node ace build --production
WORKDIR /app/packages/backend/build
RUN yarn install

FROM node:12.16.3-alpine
WORKDIR /app
COPY --from=builder /app/packages/backend/build .
EXPOSE 3333
CMD ["node", "server.js"]
