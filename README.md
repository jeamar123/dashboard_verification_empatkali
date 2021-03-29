
Install using Docker
-----------------------

1. Install docker
2. `docker build -t verification.empatkali.co.id:dev .`
3. `docker run -v ${PWD}:/app -v /app/node_modules -p 8081:8080 --rm verification.empatkali.co.id:dev`
4. Run `localhost:8081`



Deploy to Prod
------------------------

1. Change .env api to https://api.empatkali.co.id/admin
2. npm run build in local
3. push updates




Deploy to Staging/Sandbox
------------------------

1. Change .env api to https://sb-api.empatkali.co.id/admin
2. npm run build in local
3. push updates
