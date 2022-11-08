import { Agenda } from 'agenda';
import { SEND_EMAIL } from '../constants';
import logger from '../logger';
import { updateStatus } from '../services/mail.service';
import { sendEmail } from '../services/mailgun.service';

/**
 * Send Email definition - send an email and update it's status if the campaign is completed 
 * @param agenda - agenda instance
 */
export const sendEmailDefinition = (agenda: Agenda) => {
  agenda.define(SEND_EMAIL, {priority: 20}, async (job) => {
    // TODO: send email
    await sendEmail({
      receiver: 'ayovcheff@gmail.com',
      content: job.attrs.data.content,
    })
    const sentEmail = await updateStatus(job.attrs.data._id, 'completed');

    logger.info('email campaign completed', sentEmail);
  });
};