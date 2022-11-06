import { Agenda } from 'agenda';
import  config from '../config';
import jobs from './jobs';
import { connect } from 'mongoose';

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
    console.log("Agenda started!")
  })
  .on('error', () => console.log("Agenda connection error!"));

jobs.forEach(job => job(scheduler));

console.log({ jobs: scheduler._definitions });
