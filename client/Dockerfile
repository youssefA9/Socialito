FROM node:15.13-alpine 
WORKDIR /client
ENV PATH="./node_modules/.bin:$PATH"
COPY --chown=node:node . ./
RUN npm install
CMD ["npm", "start"]
