import { Email } from "../models/email.model";
import { Agenda } from 'agenda';
import { equals } from "ramda";

export const scheduleEmailCampaign = (agenda: Agenda) => {
  agenda.define('schedule new email campaign', {priority: 20},  async (job) => {
    try {
      // get all new emails which still are not scheduled 
      const newEmailsForDefinition = await Email.find({status: 'new'});

      // and scheduled them
      const scheduled = newEmailsForDefinition.map(async ({_id, receiver, content, when}) => {
        await agenda.schedule(when, `send-mail`, { _id, receiver, content});

        console.log('new email was scheduled', receiver);
        return _id;
      });

      // if there is any scheduled emails
      if(equals(scheduled.length, 0)) {
        console.log('no email for scheduling....');
        return;
      }

      await Promise.all(scheduled).then(ids => {
        // when they are successfully scheduled their status must be changed to `scheduled`
        Email.updateMany(
          { _id: { $in: ids } },
          { $set: { status : 'scheduled' } },
          { multi: true }
        ).then(result => {
          console.log('status updated to schedule', result.modifiedCount);
        })
      });
    } catch(e) {
      console.log('error', e);
    }
  });
}