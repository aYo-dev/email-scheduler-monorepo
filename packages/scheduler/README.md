# Email Sender

Email Sender is microservice written on Node.js and Typescript, which use Agenda.js for mail campaigns scheduling. 

Here could be find useful information about the whole [ecosystem][ecosystem] and related applications


## Tech Stack 

* [Node.js][node], [Agenda.js][agenda], [Typescript][typescript], [Mailgun][mailgun] - core platform and dev tools
* [MongoDB][mongodb], [Mongoose][mongoose] — DB and db tools

## Getting Started

Clone the repository

```
git@github.com:aYo-dev/email-sender.git
```

then install node packages

```
yarn install
```

in `.env.production` must be added mailgun `domain` and `api key` values

and then  you can run the project 

```
yarn start
```

[typescript]: https://github.com/kriasoft/react-starter-kit
[node]: https://nodejs.org
[agenda]: https://github.com/agenda/agenda
[mongoose]: https://mongoosejs.com
[mongodb]: https://www.mongodb.com
[mailgun]: https://www.mailgun.com
[ecosystem]: https://gist.github.com/aYo-dev/2ee718fe2fda660d7562413437076efd
