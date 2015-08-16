# Dockerfile
FROM node:0.12.7
MAINTAINER Jon Dotsoy <hi@jon.soy> (http://jon.soy/)

RUN apt-get update
RUN echo "Install build-essential" && apt-get install build-essential -y

RUN mkdir /ajenjo

WORKDIR /ajenjo

ADD / .

RUN echo "Install Dependences" && npm install ---no-frontend

ENV PORT 80
ENV AJENJO_VERSION develop
ENV NODE_ENV development

EXPOSE 80

CMD ["node", "app"]
