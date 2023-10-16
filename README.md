<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

1. Clone repository 
2. Make a CD to the directory where the repository was cloned.
3. Build the application image
```
docker-compose -f docker-compose.yml up --build
```
4. Once the Docker container is up and running, the application will be running on port 3000. You can access it through the following endpoints
```
localhost:3000/receipts/process - {POST}
localhost:3000/receipts/:id/points - {GET}
localhost:3000/receipts/ - {GET}
```
  - The first two endpoints are the ones requested for the test, while the third one is useful to retrieve all the stored receipt IDs.
