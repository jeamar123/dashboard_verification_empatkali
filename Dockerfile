FROM node:14.15.3-alpine3.12
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install @vue/cli@3.7.0 -g
CMD ["npm", "run", "serve"]