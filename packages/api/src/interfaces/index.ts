export interface EmailData {
  content: string;
  receiver: string;
  schedule: string;
  sendingType: string;
  sendingTypeOptions: {
    when: string;
    interval: string;
    occurrances: number;
    end: string;
  };
}