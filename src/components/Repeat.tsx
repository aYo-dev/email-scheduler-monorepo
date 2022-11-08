import { Box, TextField, Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useMemo, useState } from 'react';
import { isEmpty } from 'ramda';
import dayjs, { Dayjs } from 'dayjs';


type RepeatProps = {
  handleDaysChange: (selectedDays: string[]) => void,
  handleTimeChange: (time:  string | null) => void;
  values: string[],

}

export default function Repeat(props: RepeatProps) {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const showTimePicker = useMemo(() => !isEmpty(props.values),[props.values]);
  const onTimeChange = (time: Dayjs | null) => {
    const formated = dayjs(time).format('HH:mm');
    props.handleTimeChange(formated);
    setValue(time);
  }

  return (
    <Box>
      <Box>
        <ToggleButtonGroup size="small" 
          value={props.values}
          onChange={(_, value) => props.handleDaysChange(value)}
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

