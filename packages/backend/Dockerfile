FROM node:14 as builder
WORKDIR /app
COPY ./packages/backend/ ./packages/backend
COPY ./packages/shared/ ./packages/shared
COPY yarn.lock package.json ./
RUN yarn install --frozen-lockfile --non-interactive
WORKDIR /app/packages/shared/
RUN yarn build
WORKDIR /app/packages/backend/
RUN node ace build --production --client=yarn

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app/packages/backend/build/ ./packages/backend/
COPY --from=builder /app/packages/shared/dist/  ./packages/shared/dist/
COPY --from=builder /app/packages/shared/package.json  ./packages/shared/
COPY yarn.lock package.json ./
RUN yarn install --prod --frozen-lockfile --non-interactive
EXPOSE 3333
WORKDIR /app/packages/backend
CMD node ace migration:run --force && node server.js | ../../node_modules/.bin/pino-datadog --key $DD_API_KEY --ddsource $DD_SOURCE