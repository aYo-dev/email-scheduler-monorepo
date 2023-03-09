import { Actions } from "../enums";

export type Action = {
  type: Actions;
  payload?: Record<string, string | string[] | null | number>
}

export interface EndSelectProps {
  onEndTypeChange: (v: string) => void;
  handleEndDateChange: (v: string | null) => void;
  handleOccurncesChange: (v: number) => void;
}

export interface RepeatProps {
  handleDaysChange: (selectedDays: string[]) => void,
  handleTimeChange: (time:  string | null) => void;
}

export type FormErrors = Record<string, Record<string, string>>;