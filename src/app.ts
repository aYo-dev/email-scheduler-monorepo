import { Agenda } from 'agenda';
import  config from '../config';
import jobs from './jobs';
import { connect } from 'mongoose';
import logger from './logger';

connect(config.db);

const scheduler = new Agenda({
  db: { 
    address: config.db,
    collection: 'agendaJobs',
  },
  processEvery: "30 seconds",
});

scheduler
  .on('ready', () => {
    scheduler.every('5 seconds', 'schedule new email campaign');
    scheduler.start();
    logger.info('Agenda started!');
  })
  .on('error', () =>logger.error("Agenda connection error!"))
  .on('success:send email', (job) => {
    logger.info(`Sent Email Successfully to ${job.attrs.data.receiver}`);
  });

jobs.forEach(job => job(scheduler));

console.log({ jobs: scheduler._definitions });
