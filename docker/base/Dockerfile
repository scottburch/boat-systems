FROM arm32v7/node:14.2.0

RUN apt-get update
RUN apt-get install net-tools

WORKDIR /app
RUN git clone https://github.com/scottburch/boat-systems.git

WORKDIR /app/boat-systems/network/networkBus
RUN yarn

WORKDIR /app/boat-systems/network
RUN yarn

WORKDIR /app/boat-systems
