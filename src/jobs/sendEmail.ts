import { Email } from "../models/email.model";
import { Agenda } from 'agenda';
import { SEND_EMAIL } from '../constants';

/**
 * Send Email definition - send an email and update it's status if the campaign is completed 
 * @param agenda - agenda instance
 */
export const sendEmailDefinition = (agenda: Agenda) => {
  console.log('sendEmailDefinition defined');
  agenda.define(SEND_EMAIL, {priority: 20}, async (job) => {
    console.log(`send email to ${job.attrs.data.receiver}`);
    const sentEmail = await Email.updateOne(
      {_id: job.attrs.data._id},
      { $set: { status : 'completed' } },
    );

    console.log('completed', sentEmail);
  });
};