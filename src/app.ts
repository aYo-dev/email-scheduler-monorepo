import { Agenda } from 'agenda';
import  config from '../config';
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
    scheduler.start();
    console.log("Agenda started!")
  })
  .on('error', () => console.log("Agenda connection error!"));

console.log({ jobs: scheduler._definitions });
