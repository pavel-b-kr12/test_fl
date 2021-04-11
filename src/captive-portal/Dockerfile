FROM balenalib/raspberrypi4-64-debian:build as builder

#ARG DEBIAN_FRONTEND=noninteractive
RUN install_packages unzip dh-systemd debhelper devscripts iptables nftables
RUN update-alternatives --set iptables /usr/sbin/iptables-legacy

WORKDIR /libmicrohttpd

ARG LIBMICROHTTPD_VERSION=0.9.71
RUN wget https://ftp.gnu.org/gnu/libmicrohttpd/libmicrohttpd-${LIBMICROHTTPD_VERSION}.tar.gz \
    && tar -xf libmicrohttpd-${LIBMICROHTTPD_VERSION}.tar.gz \
    && cd libmicrohttpd-${LIBMICROHTTPD_VERSION} \
    && ./configure --disable-https \
    && make \
    && make install \
    && rm /etc/ld.so.cache \
    && ldconfig -v

WORKDIR /openNDS

ARG OPEN_NDS_VERSION=8.1.1

RUN wget -O /tmp/openNDS.zip https://github.com/openNDS/openNDS/archive/v${OPEN_NDS_VERSION}.zip \
    && unzip /tmp/openNDS.zip -d /tmp && rm -f /tmp/openNDS.zip \
    && mv /tmp/openNDS-${OPEN_NDS_VERSION}/* /openNDS

RUN make && make install

COPY opennds.conf /etc/opennds/

ENV LOG_LEVEL=7

CMD [ "/usr/bin/opennds", "-f", "-w", "/tmp/opennds/ndsctl.sock" ]