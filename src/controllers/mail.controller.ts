import { Request, Response } from 'express';

export const create = async (req: Request, res: Response): Promise<Response> => {
  return res.sendStatus(200);
};
