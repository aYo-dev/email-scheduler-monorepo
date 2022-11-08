import { Agenda } from 'agenda';
import { SEND_EMAIL_RECURRENTLY } from '../constants';
import dayjs from 'dayjs';
import logger from '../logger';
import { updateStatus } from '../services/mail.service';
import { sendEmail } from '../services/mailgun.service';

const isExpired = (date: string) => dayjs().isAfter(date);

/**
 * Send Email Recurrently definition - send an email and update it's status if the campaign is completed 
 * @param agenda - agenda instance
 */
export const sendEmailRecurrentlyDefinition = (agenda: Agenda) => {
  agenda.define(SEND_EMAIL_RECURRENTLY, {priority: 20}, async (job) => {
    // if endDate is before now the campaign is expired and the job must be canceled 
    // and the status of the email must be updated to 'complete'
    if(isExpired(job.attrs.data.sendingTypeOptions.endDate)){
      Promise.all([
        updateStatus(job.attrs.data._id, 'completed'),
        agenda.cancel({ _id:  job.attrs._id}),
      ]).then(() => logger.info(`campaign with id ${job.attrs._id} expired`, job.attrs.data.receiver))
    }

    // TODO: send email
    await sendEmail({
      receiver: job.attrs.data.receiver,
      content: job.attrs.data.content,
    })
    logger.info(`email from campaign ${job.attrs._id} was send`, job.attrs.data.receiver);
  });
};