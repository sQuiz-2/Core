FROM node:14 as builder
WORKDIR /app
COPY ./packages/backend/ ./packages/backend/
COPY yarn.lock .
COPY package.json .
RUN yarn install --frozen-lockfile --non-interactive
WORKDIR /app/packages/backend/
RUN node ace build --production --client=yarn
RUN cp ../../yarn.lock ./build

FROM node:14
WORKDIR /app
COPY --from=builder /app/packages/backend/build ./
RUN yarn install --prod --frozen-lockfile --non-interactive
EXPOSE 3333
CMD [ "node", "server.js" ]