import { Agenda } from 'agenda';
import { equals, groupBy, pathOr } from 'ramda';
import { EmailData } from "../interfaces";
import { SEND_EMAIL, SEND_EMAIL_RECURRENTLY } from '../constants';
import logger from '../logger';
import * as mailSevice from '../services/mail.service';

// when we need to schedule email for later
const scheduleEmail = async ({_id, receiver, content, sendingTypeOptions}: EmailData, agenda: Agenda) =>
  agenda.schedule(sendingTypeOptions.when, SEND_EMAIL, { _id, receiver, content});

// when want to send it immediately
const sendNow = async ({_id, receiver, content}: EmailData, agenda: Agenda) => 
  agenda.now(SEND_EMAIL, { _id, receiver, content});

const sendRecurrently = async (data: EmailData, agenda: Agenda) => {
  const job = agenda.create(SEND_EMAIL_RECURRENTLY, data);
  job.repeatEvery(data.sendingTypeOptions.interval, {skipImmediate: true});
    
  await job.save();
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
      const newEmails = await mailSevice.findNewEmails();

      // with higher priority are emails which should be send immediately
      // also their workflow is different, their status must not be updated 
      // to `scheduled` because they are send immediately and in this case 
      // we don't need to do two db queries 
      const result = groupBy<EmailData>(extractEmailWithEndingTypeNow, newEmails);  

      // we need fallback variant because some of the groups could be empty
      const forNow = pathOr<EmailData[]>([], ['forNow'], result);
      const forLater = pathOr<EmailData[]>([], ['forLater'], result);

      forNow.forEach(async (el) => {
        await createJob(el.sendingType)(el, agenda);
      });

      // notify if there isn't any emails for scheduling
      if(equals(forLater.length, 0)) {
        logger.info('no email for scheduling....');
        return;
      }

      const scheduled = forLater.map(async (el: EmailData) => {
        await createJob(el.sendingType)(el, agenda);
    
        logger.info('new email was scheduled for:', el.receiver);
        return el._id;
      });

      await Promise.all(scheduled).then(ids => {
        // when emails are successfully scheduled their status must be changed to `scheduled`
        mailSevice.bulkStatusUpdate(ids, 'scheduled').then(result => {
          logger.info('status updated to schedule', result.modifiedCount);
        });
      });
    } catch(e) {
      logger.error('scheduling an email campaign error', e);
    }
  });
}