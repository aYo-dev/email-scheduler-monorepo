import { Request, Response } from 'express';
import { Email } from '../models/email.model';
import { EmailValidator } from '../services/email.validator';

export const create = async (req: Request, res: Response): Promise<Response> => {
  const emailData = req.body;
  const feedback =  await new EmailValidator(emailData).validate();

  if(feedback.length > 0) {
    return res.status(400).send({data: feedback});
  }

  try {
    const result = await Email.create(emailData);
    return res.status(200).send({data: result});
  } catch(e) {
    return res.status(500).send(e);
  }
};
