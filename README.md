
# Email Scheduler

Email Scheduler is a simple demo platform for scheduling and sending emails. It consists of three main components:

-  Client application built on React.js and TypeScript

- REST API built on Node.js, TypeScript, and MongoDB for the database.

- A scheduler microservice built on Node.js and TypeScript, using Agendajs for scheduling the email campaigns and the Mailgun API

## Tech Stack

### Client App

* [React][react], [Typescript][typescript], [Yarn][yarn]

### REST API:

* [Node.js][node], [Express][express], [Yarn][yarn], [Typescript][typescript] - core platform and dev tools

* [MongoDB][mongodb], [Mongoose][mongoose] — DB and db tools

* [Supertest][supertest], [Jest][jest] - test frameworks and libraries

### Scheduler microservice

* [Node.js][node], [Agenda.js][agenda], [Typescript][typescript], [Mailgun][mailgun] - core platform and dev tools

* [MongoDB][mongodb], [Mongoose][mongoose] — DB and db tools

## Prerequisites

  -  [Node](https://nodejs.org/)  v18 or higher
  -  Mailgun API Key (it could be setup free account)
  -  Before starting the Scheduler in the .env file of the package (mail-scheduler) should be added `MAILGUN_API_KEY` and `MAILGUN_DOMAIN` 

## Getting Started

Clone the repository

  

```
git@github.com:aYo-dev/email-scheduler-monorepo.git
```

  

then install node packages

  

```
yarn install
```

  

and you can run the project

  

```
yarn workspace {package-name} start
```

  for example:

```
yarn workspace @scheduler/mail-scheduler start
```

  

[yarn]: https://yarnpkg.com/

[typescript]: https://github.com/kriasoft/react-starter-kit

[node]: https://nodejs.org

[express]: http://expressjs.com/

[mongoose]: https://mongoosejs.com

[mongodb]: https://www.mongodb.com

[supertest]: https://www.npmjs.com/package/supertest

[jest]: https://jestjs.io

[ecosystem]: https://gist.github.com/aYo-dev/2ee718fe2fda660d7562413437076efd

[react]: https://reactjs.org

[typescript]: https://github.com/kriasoft/

[agenda]: https://github.com/agenda/agenda

[mailgun]: https://www.mailgun.com