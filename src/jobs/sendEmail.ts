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
    try {
      await sendEmail({
        receiver: job.attrs.data.receiver,
        content: job.attrs.data.content,
      })

    } catch(e) {
      console.log(e);
    }
    
    await updateStatus(job.attrs.data._id, 'completed');
  });
};