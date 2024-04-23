FROM node:18

ENV UID=${UID}
ENV GID=${GID}

ENV NVM_DIR=/usr/local/nvm

## clean up
RUN rm -vrf /var/cache/apk/*

## set timezone
RUN echo "${TZ}" >  /etc/timezone

## Start the application
CMD ["npm", "start"]