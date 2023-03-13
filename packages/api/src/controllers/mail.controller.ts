import { Request, Response } from 'express';
import { equals, ifElse } from 'ramda';
import { EndTypes, SendingTypes } from '../enums';
import { Email } from '@scheduler/common';
import { EmailValidator } from '../services/email.validator';
import { createCron, calculateEndDate } from '../util';

/**
 * @param endType 
 * @param sendingType 
 * @returns boolean
 */
const shouldCalculateEndDate = (endType: EndTypes, sendingType: SendingTypes) =>
  equals(endType, EndTypes.after) && equals(sendingType, SendingTypes.recurrently);

/**
 * decides if is necessary to create cron
 * @param sendingType 
 * @param selectedDays 
 * @param repeatAt 
 * @returns return empty string or cron string
 */
const getInterval = (sendingType: SendingTypes, selectedDays: string[], repeatAt: string) =>
  ifElse(
    equals(SendingTypes.recurrently),
    () => createCron(selectedDays, repeatAt),
    () => '',
  )(sendingType);

/**
 * Calculate end date if sendting type is `recurrently` and edning type is `after` (i.e. campaign will end after n occurrences)
 * otherwise return default date
 * @param defaultDate 
 * @param interval 
 * @param occurrences 
 * @returns 
 */
const getEndDate = (defaultDate: string, interval: string, occurrences: number) => ifElse(
  shouldCalculateEndDate,
  () => calculateEndDate(interval, occurrences),
  () => defaultDate,
);

export const create = async (req: Request, res: Response): Promise<Response> => {
  const requestData = req.body;
  const feedback =  await new EmailValidator(requestData).validate();

  if(feedback.length > 0) {
    return res.status(400).send({data: feedback});
  }
  
  const interval = getInterval(
    requestData.sendingType,
    requestData.selectedDays,
    requestData.repeatAt
  );

  const getEndDateCb = getEndDate(requestData.endDate, requestData.interval, requestData.occurrances)

  const emailData = {
    receiver: requestData.receiver,
    content: requestData.content,
    sendingType: requestData.sendingType,
    sendingTypeOptions: {
      when: requestData.when,
      end: getEndDateCb(requestData.endType ,requestData.sendingType),
      occurences: requestData.occurences,
      interval,
    },
  };

  try {
    const result = await Email.create(emailData);
    return res.status(200).send({data: result});
  } catch(e) {
    return res.status(500).send(e);
  }
};
