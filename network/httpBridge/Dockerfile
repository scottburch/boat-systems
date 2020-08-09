FROM boat-systems-base

WORKDIR /app/boat-systems/client
RUN yarn
RUN yarn build

WORKDIR /app/boat-systems/network/httpBridge
RUN yarn

ENTRYPOINT yarn start