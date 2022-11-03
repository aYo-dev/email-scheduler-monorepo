import { useMemo, useState } from 'react';
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { equals } from 'ramda';

interface EndSelectProps {
  onEndTypeChange: (v: string) => void;
}

export const dateFormat = 'YYYY/MM/DD';


const isEndTypeAfter = equals('after');

export default function EndOptions({onEndTypeChange}: EndSelectProps) {
  const [endType, setEndType] = useState('never');
  const [occurrences, setOccurrences] = useState(1);
  const [date, setDate] = useState<string | null>(null);

  const handleEndChange = (event: SelectChangeEvent) => {
    onEndTypeChange(event.target.value);
    setEndType(event.target.value);
  };

  const showOccurrencesInput = useMemo(() => equals('after', endType), [endType])
  const showDatePicker = useMemo(() => equals('on', endType), [endType])

  return (
    <Stack direction='row' spacing={2} padding={2}>
      <FormControl>
        <InputLabel></InputLabel>
        <Select
          value={endType}
          label='Ends'
          onChange={handleEndChange}
        >
          <MenuItem value='never'>Never</MenuItem>
          <MenuItem value='on'>On</MenuItem>
          <MenuItem value='after'>After</MenuItem>
        </Select>
      </FormControl>
      {showDatePicker && <Box>
        <DatePicker
          disablePast
          value={date}
          openTo="year"
          inputFormat={dateFormat}
          onChange={setDate}
          renderInput={(params) => <TextField {...params} sx={{width: '100%', minWidth: '190px'}} />}
          views={['year', 'month', 'day']}
        />
      </Box>}
      {showOccurrencesInput && <TextField
        label="Occurrences"
        name="occurrences"
        value={occurrences}
        onChange={(e) => setOccurrences(parseInt(e.target.value))}
      />}
    </Stack>
  );
}