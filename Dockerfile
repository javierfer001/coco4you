# docker build -f Dockerfile -t coco4you:1.0 .
# Development
# docker run -it -d -p 8080:3000 --name api2 coco4you:1.0 npm start
# production
# docker run -it -d -p 8080:3000 -v "$(pwd)"/web:/coco4you/web --name coco4you coco4you:1.0 /bin/bash -c "npm start"

# docker network connect proxy mongoex
# docker exec -it coco4you bash (Exit  ctl+p+q)
# docker stop $(docker ps -aq) // stop all container
# docker rm $(docker ps -aq) // remove all container
# docker rmi $(docker images -q) // remove all images

# docker-compose build
# docker-compose up


FROM node:8.11.1

LABEL company=JVLsoft
LABEL traefik.backend=coco4you
LABEL traefik.frontend.rule=Host:coco4youusa.com
LABEL traefik.port=3000

RUN mkdir -p coco4you
# Create app directory
WORKDIR /coco4you

COPY . .

RUN npm install

VOLUME ["/coco4you/web"]

EXPOSE 3000

CMD [ "npm", "start"]
