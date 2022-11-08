import { equals, last, times } from "ramda";
import { parseExpression } from 'cron-parser';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * 
 * @param selectedDays - Array of stringified numbers - each number is index for a day of the week
 * @param repeatAt - Date is string format, we need to get hours and minutes when the mail should be send 
 * @returns 
 */
export const createCron = (selectedDays: string[], repeatAt: string) => {
  const date = new Date(repeatAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const weekDays = selectedDays.join(',');
  return `${minutes} ${hours} * * ${weekDays}`;
}

/**
 * calculate the end Date depending on cron and how many occurrences mail should have
 * @param cron - cron string
 * @param occurences - number of times mail should be send
 * @returns endDate in string format
 */
export const calculateEndDate = (cron: string, occurences: number) => {
  const interval = parseExpression(cron);
  
  const dates = times(() => interval.next().toString(), occurences);

  const nextDate = last(dates);
  const endDate = dayjs(nextDate).add(10, 'minutes').utc(true).format();

  return endDate;
}