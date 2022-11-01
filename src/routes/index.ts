import { Application } from 'express';


export const initializeRoutes = (app: Application): void => {
  app.get(`/`, async (_, res) => res.status(200).send({ msg: 'Hello World!' }));
};
