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
import { equals } from 'ramda';
import { dateFormat } from '../constants';
import { EndSelectProps } from '../interfaces';

export default function EndOptions({onEndTypeChange, handleEndDateChange}: EndSelectProps) {
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
    <Stack direction='row' spacing={2} marginTop={2}>
      <Box flexGrow={1}>
        <FormControl sx={{width: '100%'}}>
          <InputLabel>Ends</InputLabel>
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
      </Box>
      {showDatePicker && <Box flexGrow={1}>
        <DatePicker
          disablePast
          value={date}
          openTo="year"
          inputFormat={dateFormat}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} sx={{width: '100%', minWidth: '190px'}} />}
          views={['month', 'day']}
        />
      </Box>}
      {showOccurrencesInput && <Box flexGrow={1}>
        <TextField
          fullWidth
          type="number"
          InputProps={{ inputProps: { min: 1, max: 31 } }}
          label="Occurrences"
          name="occurrences"
          value={occurrences}
          onChange={(e) => setOccurrences(parseInt(e.target.value))}
        />
      </Box>
      }
    </Stack>
  );
}