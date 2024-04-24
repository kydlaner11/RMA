FROM node:18

#setting user
ARG UID
ARG GID
ARG UNAME
RUN groupadd -g ${GID} -o ${UNAME}
RUN useradd -m -u ${UID} -g ${GID} -o -s /bin/sh ${UNAME}

ENV NVM_DIR=/usr/local/nvm

## clean up
RUN rm -vrf /var/cache/apk/*

## set timezone
RUN echo "${TZ}" >  /etc/timezone

## Start the application
CMD ["npm", "start"]