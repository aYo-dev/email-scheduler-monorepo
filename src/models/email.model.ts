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
    default: 'now',
    enum: ['schedule', 'every', 'now']
  },
  sendingTypeOptions: {
    when: Date,
    occurences : {
      type: Number,
    },
    end: Date,
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'scheduled', 'completed']
  }
});

export const Email = model<EmailData>('Email', emailSchema, 'emails');
