import { Email } from "../models/email.model";
import { Agenda } from 'agenda';
import { equals, groupBy, pathOr } from "ramda";
import { EmailData } from "../interfaces";
import { SEND_EMAIL } from "../constants";

const scheduleEmail = async ({_id, receiver, content, sendingTypeOptions}: EmailData, agenda: Agenda) =>
  agenda.schedule(sendingTypeOptions.when, SEND_EMAIL, { _id, receiver, content});

const sendNow = async ({_id, receiver, content}: EmailData, agenda: Agenda) => 
  agenda.now(SEND_EMAIL, { _id, receiver, content});

const sendRecurrently = async ({_id, receiver, content, sendingTypeOptions}: EmailData, agenda: Agenda) => {
  agenda.every(
    sendingTypeOptions.interval,
    SEND_EMAIL,
    { _id, receiver, content},
    {endDate: sendingTypeOptions.end});
}

const jobsMap = {
  schedule: scheduleEmail,
  now: sendNow,
  recurrently: sendRecurrently,
};

const createJob = (sendingType) => 
  jobsMap[sendingType];

const extractEmailWithEndingTypeNow = (email: EmailData) => {
  const sendingType = email.sendingType;
  return equals(sendingType, 'now') ? 'forNow' : 'forLater';
}

export const scheduleEmailCampaign = (agenda: Agenda) => {
  agenda.define('schedule new email campaign', {priority: 20},  async (job) => {
    try {
      // get all new emails which still are not scheduled 
      const newEmails = await Email.find({status: 'new'});

      // with higher priority are emails which should be send immediately
      // also their workflow is different, their status must not be updated 
      // to `scheduled` because they are send immediately and in this case 
      // we don't need to do two db queries 
      const result = groupBy(extractEmailWithEndingTypeNow, newEmails);  

      // we need fallback variant because some of the groups could be empty
      const forNow = pathOr([], ['forNow'], result);
      const forLater = pathOr([], ['forLater'], result);

      forNow.forEach(async (el: EmailData) => {
        await createJob(el.sendingType)(el, agenda);
      });

      const scheduled = forLater.map(async (el: EmailData) => {
        await createJob(el.sendingType)(el, agenda);
    
        console.log('new email was scheduled', el.receiver);
        return el._id;
      });

      // if there is any scheduled emails
      if(equals(scheduled.length, 0)) {
        console.log('no email for scheduling....');
        return;
      }

      await Promise.all(scheduled).then(ids => {
        // when emails are successfully scheduled their status must be changed to `scheduled`
        Email.updateMany(
          { _id: { $in: ids } },
          { $set: { status : 'scheduled' } },
          { multi: true }
        ).then(result => {
          console.log('status updated to schedule', result.modifiedCount);
        });
      });
    } catch(e) {
      console.log('error', e);
    }
  });
}