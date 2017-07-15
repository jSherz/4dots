FROM node:6.11

WORKDIR /app

ADD . /app

EXPOSE 8080

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    yarn install

CMD ["/bin/sh", "docker-start.sh"]
