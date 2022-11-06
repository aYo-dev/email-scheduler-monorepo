import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { equals } from "ramda";
import { useEffect, useMemo, useState } from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useApi } from "../hooks/useApi";
import EndSelect from "./EndOptions";
import Repeat from "./Repeat";


type EndOptions = 'never' | 'on' | 'after';

export const EmailScheduleForm = () => {
  const [selectedDays, selectDays] = useState(['']);
  const [end, setEnd] = useState('never');
  const [receiver, setReceiver] = useState('');
  const [content, setContent] = useState('');
  const [sendingType, setSendingType] = useState('now');
  const [when, setWhen] = useState(null);

  const {
    isLoading,
    isError, // show message on error
    sendRequest,
    responseData,
  } = useApi(null);

  const onSubmit = () => {
    const requestData = {
      receiver,
      content,
      sendingType,
      when,
    };
    // TODO: validate requestData first
    sendRequest({
      url: `http://localhost:3006/email`,
      method: 'post',
      data: requestData,
    });
  }

  useEffect(() => {
    // TODO: show proper message
    console.log('response', responseData);
    // TODO: reset the form
  }, [responseData]);

  const reset = () => {

  }

  const handleDayChange = (selectedDays: string[]) => {
    selectDays(selectedDays);
  };

  const isRecurrently = useMemo(() => equals(sendingType, 'recurrently'), [sendingType]);
  const isSchedule = useMemo(() => equals(sendingType, 'schedule'), [sendingType]);

  return (
    <>
      <Stack spacing={2}>
        <TextField
          label="Receiver"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          variant="outlined"
          sx={{width: '100%'}}
          type="email"
        />
        <TextField
          label="Email content"
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={6}
        />
      </Stack>
      <Box marginTop={2}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Send it</FormLabel>
          <RadioGroup
            row
            defaultValue="now"
            name="send-it"
            onChange={(v) => setSendingType(v.target.value)}
          >

            <FormControlLabel value="now" control={<Radio />} label="Now" />
            <FormControlLabel value="schedule" control={<Radio />} label="Schedule" />
            <FormControlLabel value="recurrently" control={<Radio />} label="Recurrently" />
          </RadioGroup>
        </FormControl>
      </Box>
      {isRecurrently && <Box>
        <Typography>Repeat on:</Typography>
        <Repeat handleChange={handleDayChange} values={selectedDays}/>
        <EndSelect onEndTypeChange={setEnd}/>
      </Box>}
      {isSchedule && <Box>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="DateTimePicker"
          value={when}
          onChange={(newValue) => {
            setWhen(newValue);
          }}
        />
      </Box>}
      <Box marginTop={2}>
        <Button variant="outlined" onClick={onSubmit}>Create</Button>
      </Box>
    </>
  );
}