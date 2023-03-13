import {
  IsString,
  validate,
  IsEmail,
} from 'class-validator';
import { EmailData } from '@scheduler/common';

export class EmailValidator {
  constructor(emailData: EmailData) {
    this.content = emailData.content;
    this.receiver = emailData.receiver;
    this.sendingType = emailData.sendingType;
  }

  @IsString()
  content: string;

  @IsEmail()
  receiver: string;

  @IsString()
  sendingType: string;

  validate() {
    return validate(this);
  }
}