import express from 'express';
import { json, urlencoded } from 'body-parser';
import { connect } from "mongoose";
import { ifElse, equals } from 'ramda';
import  cors from 'cors';
import { TryCatch } from 'lambda-ts';

import { initializeRoutes } from './routes';
import { Enviroments } from './enums';
import  config from '../config';


const errorhandler = require('errorhandler');

const onError = errorhandler((err, str, req) => {
  const title = `Error in ' + ${req.method} ${req.url}`;

  console.log(title, str);
});

const baseSetup = TryCatch(() => express())
  .map((app) => app.use(cors()))
  .map((app) => app.use(json()))
  .map((app) => app.use(urlencoded({ extended: false })));

const envSetup: (v: any) => any = ifElse(
  equals(Enviroments.development) as any,
  () => baseSetup.map((app) => app.use(onError)),
  () => baseSetup,
);

const mongoSetup = (connectionString: string): void => {
  connect(connectionString);
}

const app = envSetup(process.env.NODE_ENV).get();

mongoSetup(config.db);
initializeRoutes(app);

app.listen(
  config.port || 3006,
  () => console.log(`Server is running at: ${config.protocol}://${config.host}:${config.port}`),
);

export const server = app;
