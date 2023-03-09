import { Agenda } from 'agenda';
import  config from '../config';
import jobs from './jobs';
import { connect } from 'mongoose';
import logger from './logger';

connect(config.db);

const scheduler = new Agenda({
  lockLimit: 1,
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
    logger.info(`Email campign completed ${job.attrs.data.receiver}`);
  });

jobs.forEach(job => job(scheduler));

async function graceful() {
  console.log("Shutting down gracefully...");
  await scheduler.stop();
  process.exit(0);
}

process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);
