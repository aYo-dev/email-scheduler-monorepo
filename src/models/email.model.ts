import { Schema, model } from 'mongoose';
import { EmailData } from '../interfaces';

export const emailSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  sendingType: {
    type: String,
    default: 'once',
    enum: ['once', 'recurrently']
  },
  when: {
    type: String,
    default: '48 10 * * 3,5',
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'scheduled', 'completed']
  }
});

export const Email = model<EmailData>('Email', emailSchema);
