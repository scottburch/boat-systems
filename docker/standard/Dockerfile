FROM arm32v7/node:14.2.0

RUN apt update
RUN apt install net-tools

RUN yarn global add pm2

ENV APP_DIR /opt/boat-systems

WORKDIR /opt
RUN git clone https://github.com/scottburch/boat-systems.git

WORKDIR $APP_DIR/utils
RUN yarn

WORKDIR $APP_DIR/network/networkBus
RUN yarn

WORKDIR $APP_DIR/network
RUN yarn
WORKDIR $APP_DIR/network/networkBridge
RUN yarn
WORKDIR $APP_DIR/network/httpBridge
RUN yarn
#WORKDIR $APP_DIR/network/nemaBridge
#RUN yarn


WORKDIR $AP_DIR/autopilot
RUN yarn

WORKDIR $APP_DIR/client
RUN yarn
RUN yarn build

WORKDIR $APP_DIR/hardware/adc/ads1256
RUN yarn
#WORKDIR $APP_DIR/hardware/aisInterface
#RUN yarn
WORKDIR $APP_DIR/hardware/compass
RUN yarn
WORKDIR $APP_DIR/hardware/rudderInterface
RUN yarn

WORKDIR /opt
COPY ecosystem.config.js .
ENTRYPOINT ['pm2', 'start', 'ecosystem.config.js']



