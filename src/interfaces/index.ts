import { Actions } from "../enums";

export type Action = {
  type: Actions;
  payload?: Record<string, string | string[] | null>
}

export interface EndSelectProps {
  onEndTypeChange: (v: string) => void;
  handleEndDateChange: (v: string | null) => void;
}

export interface RepeatProps {
  handleDaysChange: (selectedDays: string[]) => void,
  handleTimeChange: (time:  string | null) => void;
  values: string[],
}