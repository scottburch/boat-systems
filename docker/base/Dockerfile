FROM arm32v7/node:14.2.0

RUN apt-get -y update
RUN apt-get -y install net-tools vim tcpdump

WORKDIR /app
RUN git clone https://github.com/scottburch/boat-systems.git

WORKDIR /app/boat-systems/utils
RUN yarn

WORKDIR /app/boat-systems/network/networkBus
RUN yarn

WORKDIR /app/boat-systems/network
RUN yarn

WORKDIR /app/boat-systems
