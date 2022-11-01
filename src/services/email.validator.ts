import {
  IsString,
  validate,
  IsEmail,
} from 'class-validator';
import { EmailData } from '../interfaces';

export class EmailValidator {
  constructor(emailData: EmailData) {
    this.content = emailData.content;
    this.receiver = emailData.receiver;
    this.schedule = emailData.receiver;
  }

  @IsString()
  content: string;

  @IsEmail()
  receiver: string;

  @IsString()
  schedule: string;

  validate() {
    return validate(this);
  }
}