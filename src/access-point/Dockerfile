FROM balenalib/raspberrypi4-64-node:14-sid-run

RUN install_packages wget unzip git

WORKDIR /tmp

ARG OS_ARCH=arm64
ENV DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

#ARG WIFI_REPEATER_VERSION=master
#
# RUN wget -qO wifi-repeater.zip https://github.com/balenalabs-incubator/wifi-repeater/archive/${WIFI_REPEATER_VERSION}.zip \
#     && unzip wifi-repeater.zip && mv wifi-repeater-${WIFI_REPEATER_VERSION} /app

ARG WIFI_REPEATER_VERSION=add-passwordless-accesspoint
RUN git clone https://github.com/gueux/wifi-repeater.git \
    && mv wifi-repeater /app

WORKDIR /app
RUN git checkout ${WIFI_REPEATER_VERSION}
RUN npm install blinking
RUN npm install && npm run build

CMD [ "node", "/app/build/index.js" ]