import formData from 'form-data';
import Mailgun from 'mailgun.js';
import logger from '../logger';

const domain = process.env.MAILGUN_DOMAIN;

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

interface Data {
  receiver: string;
  content: string;
}

console.log('key', process.env.MAILGUN_API_KEY);

export const sendEmail = (data: Data) => {
  return mg.
    messages.
    create(domain, {
      from: `info@${domain}.com`,
      to: data.receiver,
      subject: 'Hello from Email Scheduler',
      text: data.content,
    }).
    then(res => logger.info('email was send successfuly', res)).
    catch(err => logger.error('mailgun error:', err));
}