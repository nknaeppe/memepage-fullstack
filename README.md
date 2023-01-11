# memepage-fullstack
Build the docker images from the Dockerfiles for the frontend and the backend
```
cd frontend 
docker build -t meme-frontend .
```
```
cd rest-backend 
./gradlew clean build docker
```
start the docker-compose file from the root folder
```
docker-compose up -d 
```
