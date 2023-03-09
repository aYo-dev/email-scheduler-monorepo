export enum Actions {
  update = 'UPDATE',
  reset = 'RESET',
};

export enum EndTypes {
  never = 'never',
  on = 'on',
  after = 'after',
}

export enum SendingTypes {
  now = 'now',
  schedule = 'schedule',
  recurrently = 'recurrently',
}