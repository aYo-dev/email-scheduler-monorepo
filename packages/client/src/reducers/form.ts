import dayjs from 'dayjs';
import { timeFormat } from '../constants';
import { Actions, EndTypes, SendingTypes } from '../enums';
import { Action } from '../interfaces';

export const formInitialState = {
  selectedDays: [],
  endType: EndTypes.never,
  end: '',
  receiver: '',
  content: '',
  sendingType: SendingTypes.now,
  when: null,
  endDate: null,
  repeatAt: dayjs().format(timeFormat),
  occurrences: 1,
};

export const formReducer = (state: typeof formInitialState, action: Action) => {
  switch (action.type) {
    case Actions.update:
      return ({
        ...state,
        ...action.payload,
      });
    case Actions.reset:
      return formInitialState;
    default:
      throw new Error('Invalid action');
  }
}