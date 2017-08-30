# Styku Challenge - Database Connect

- A simple node app that connects to a Heroku Postgres Database.
Deployed at:  https://polar-badlands-41418.herokuapp.com/

To add to database:
Sample Request: https://polar-badlands-41418.herokuapp.com/api/users?email=1234@test.com&apples=Apples&oranges=Oranges&mixed=Mixed&result=Wrong

To view the database:
https://polar-badlands-41418.herokuapp.com/api/users

### Pre-requisite

    - Node ~v6.9.4
    - NPM

### Setup project

    $ npm install

### Development & Deployment

    ## Start a local server and serve @ port 8080 (http://localhost:8080/)
    $ node server.js

    ## Watch for file changes as well
    $ npm run dev
