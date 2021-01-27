FROM tykio/tyk-gateway:v3.0.3

WORKDIR /opt/tyk-gateway

RUN rm tyk.conf

COPY ./tyk.conf ./