import { Agenda } from 'agenda';
import { SEND_EMAIL } from '../constants';
import logger from '../logger';
import { updateStatus } from '../services/email.service';

/**
 * Send Email definition - send an email and update it's status if the campaign is completed 
 * @param agenda - agenda instance
 */
export const sendEmailDefinition = (agenda: Agenda) => {
  agenda.define(SEND_EMAIL, {priority: 20}, async (job) => {
    // TODO: send email
    const sentEmail = await updateStatus(job.attrs.data._id, 'completed');

    logger.info('email campaign completed', sentEmail);
  });
};