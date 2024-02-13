## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Illustrations](#illustrations)

## General info
Site which offers various tools related to quizzes. User can make account, create quizzes and manage them.

## Technologies
Backend is created with:
* NestJS version: 10.0.0
* Prisma version: 5.7.1
* Argon2 library version: 0.31.2
* cookie-parser version: 1.4.6

Frontend is created with:
* React library version: 18.2.0
* React Router framework version: 6.21.1
* Mantine library version: 7.3.2
* Universal cookies version: 7.0.0

## Setup
To run this project firstly you need to update backend environment variables located in .env file:
```
MONGO_URL=
JWT_KEY=
MYSQL_URL=
```

Then to run backend of this project, install it locally using npm:

```
$ cd quiz-back
$ npm install
$ npm run prisma:generate
$ npx prisma migrate dev --schema .\prisma\schemaMysql.prisma
$ npm start
```

Next you need to run frontend of the project:
```
$ cd Quiz-front
$ npm install
$ npm start
```

## Illustrations

Main page of site:
<img src="https://github.com/bindasp/Quiz-page/assets/57799873/959d6ba9-7400-44d4-89ea-53c02b416c19">

Quiz creation page:
<img src="https://github.com/bindasp/Quiz-page/assets/57799873/2eb786cc-8598-442d-99b4-2b46ef018ca7">

Admin panel page:
<img src="https://github.com/bindasp/Quiz-page/assets/57799873/790a4096-beaf-4f4e-be15-4ffee6b92121">

Login page:
<img src="https://github.com/bindasp/Quiz-page/assets/57799873/656ddac4-c961-4ab5-9fbe-c6cf5992853c">
