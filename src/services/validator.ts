import {
  IsString,
  validate,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

interface MailData {
  content: string;
  receiver: string;
}

export class MailValidator {
  constructor(emailData: MailData) {
    this.content = emailData.content;
    this.receiver = emailData.receiver;
  }

  @IsString()
  @IsNotEmpty({
    message: 'Email content cannot be empty',
  })
  content: string;

  @IsNotEmpty({
    message: 'Receiver cannot be empty',
  })
  @IsEmail({message: 'Receiver must be an email'})
  receiver: string;

  validate() {
    return validate(this);
  }
}