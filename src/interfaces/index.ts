import { Types } from "mongoose";

export interface EmailData {
  _id: Types.ObjectId,
  content: string;
  receiver: string;
  sendingType: string;
  sendingTypeOptions: {
    when: string;
    interval: string;
    occurrances: number;
    end: Date;
  };
}