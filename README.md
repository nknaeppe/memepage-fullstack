# memepage-fullstack
Build the docker images from the Dockerfiles for the frontend and the backend
```
cd frontend 
docker build -t meme-frontend .
```
```
cd rest-backend 
docker build -t meme-backend .
```
start the docker-compose file from the root folder
```
docker-compose up -d 
```
