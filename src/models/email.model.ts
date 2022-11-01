import { Schema, model } from 'mongoose';

import {
  isEmail,
} from 'class-validator';
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
    validate: [isEmail, 'Please fill a valid email address'],
  },
  schedule: {
    type: String,
    required: true,
  },
});

export const Email = model<EmailData>('Email', emailSchema);
