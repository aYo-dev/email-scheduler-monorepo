import { Email } from "../models/email.model";
import { Agenda } from 'agenda';
import { SEND_EMAIL_RECURRENTLY } from '../constants';
import dayjs from 'dayjs';

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
        Email.updateOne(
          {_id: job.attrs.data._id},
          { $set: { status : 'completed' } },
        ),
        agenda.cancel({ _id:  job.attrs._id}),
      ]).then(() => console.log(`campaign with id ${job.attrs._id} expired`, job.attrs.data.receiver))
    }

    // TODO: send email
    console.log(`email from campaign ${job.attrs._id} was send`, job.attrs.data.receiver);
  });
};