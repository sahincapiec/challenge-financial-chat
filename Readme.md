# Challenge Financial Chat

This application allow several users to talk in a chatroom and also to get stock quotes from https://stooq.com/ using a specific command.

# Requeriments
This project run over node: 12.14.1+ and compatibles.

# Installation
For install dependencies in the project directory run:
```sh
$ npm install
```

# Set up
Before start serving the project, must set the environment variables in *src\application\config\environment.js*:
- **amqConnectionString**: connection string for RabbitMQ.
- **dbUrl**: mongoDB URL.
- **defaultPort**: port where the projecte must be serve.
- **queueStockQuote**: name of the queue for stock quotes messages in RabbitMQ.
- **tokenExpiration**: time of token expiration. Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. 
- **tokenSign**: secret string to sign the token.

# Execution
To execute the project run:
```sh
$ npm run start
```

# Development
There is a command to refresh the server after any change over .js files, using:
```sh
$ npm run dev
```

# Test
For run tests, execute:
```sh
$ npm run test
```
