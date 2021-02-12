
Install using Docker
-----------------------

1. Install docker
2. `docker build -t verification.empatkali.co.id:dev .`
3. `docker run -v ${PWD}:/app -v /app/node_modules -p 8081:8080 --rm verification.empatkali.co.id:dev`
4. Run `localhost:8081`
