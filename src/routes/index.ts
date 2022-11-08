import { Application } from 'express';
import * as mailController from '../controllers/mail.controller';


export const initializeRoutes = (app: Application): void => {
  app.get(`/`, async (_, res) => res.status(200).send({ msg: 'Hello World!' }));
  app.post(`/email`, mailController.create);
};
