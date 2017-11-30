FROM node:9.1.0

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#install dependencies
COPY package.json /usr/src/app
RUN npm install
RUN npm install --global nodemon

#this was done to make sure are saved correctly in docker
RUN mkdir -p /dist/node_modules
RUN cp -r node_modules/* /dist/node_modules/
ENV NODE_PATH /dist/node_modules

# bundle source
COPY . /usr/src/app

CMD ["npm", "start"]
CMD ["nodemon", "-L", "/usr/src/app"]
