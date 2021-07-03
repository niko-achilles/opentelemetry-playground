FROM node:lts-alpine

WORKDIR "/api"

COPY ./package.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]

# build command: docker build -f Dockerfile .
# run command : docker run -it imageID