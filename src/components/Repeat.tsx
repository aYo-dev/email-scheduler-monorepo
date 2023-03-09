import { Box, TextField, Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useMemo, useState } from 'react';
import { isEmpty } from 'ramda';
import dayjs, { Dayjs } from 'dayjs';
import { RepeatProps } from '../interfaces';
import { timeFormat } from '../constants';

export default function Repeat(props: RepeatProps) {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [days, setDays] = useState<string[]>([]);
  const showTimePicker = useMemo(() => !isEmpty(days),[days]);
  
  const onTimeChange = (time: Dayjs | null) => {
    const formated = dayjs(time).format(timeFormat);
    props.handleTimeChange(formated);
    setValue(time);
  }

  const onDaysChanged = (_: React.MouseEvent, value: string[]) => {
    setDays(value);
    props.handleDaysChange(value)
  }

  return (
    <Box>
      <Box>
        <ToggleButtonGroup size="small" 
          value={days}
          onChange={onDaysChanged}
        >
          <ToggleButton value="0" key="Sunday">S</ToggleButton>,
          <ToggleButton value="1" key="Monday">M</ToggleButton>,
          <ToggleButton value="2" key="Tuesday">T</ToggleButton>,
          <ToggleButton value="3" key="Wednesday">W</ToggleButton>,
          <ToggleButton value="4" key="Thursday">T</ToggleButton>,
          <ToggleButton value="5" key="Friday">F</ToggleButton>,
          <ToggleButton value="6" key="Saturday">S</ToggleButton>,
        </ToggleButtonGroup>
      </Box>
      {showTimePicker && <Box>
        <Typography>At:</Typography>
        <TimePicker
          value={value}
          onChange={onTimeChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>}
    </Box>
  );
}

