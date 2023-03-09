import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`)});

const config = {
  what: process.env.WHAT || '',
  db: process.env.DB_STRING || '',
  port: parseInt(process.env.PORT as string, 10) || 3000,
  protocol: process.env.PROTOCOL || '',
  host: process.env.HOST || '',
};

export default config;
