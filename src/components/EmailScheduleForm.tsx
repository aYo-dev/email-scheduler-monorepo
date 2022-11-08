import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { equals } from "ramda";
import { useEffect, useMemo, useReducer } from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useApi } from "../hooks/useApi";
import EndSelect from "./EndOptions";
import Repeat from "./Repeat";
import { formInitialState, formReducer } from "../reducers";
import { Action } from "../interfaces";
import { Actions } from "../enums";

export const EmailScheduleForm = () => {
  const [state, dispatch] = useReducer(formReducer, formInitialState);

  const {
    isLoading,
    isError, // show message on error
    sendRequest,
    responseData,
  } = useApi(null);

  const onSubmit = () => {

    // TODO: validate requestData first
    sendRequest({
      url: `http://localhost:3006/email`,
      method: 'post',
      data: state,
    });
  }

  useEffect(() => {
    // TODO: show proper message
    console.log('response', responseData);
    reset();
  }, [responseData]);

  const reset = () => {
    dispatch({type: Actions.reset});
  }

  const setState = (payload: Action['payload']) => {
    dispatch({type: Actions.update, payload });
  }

  const handleDaysChange = (selectedDays: string[]) => {
    setState({selectedDays});
  };

  const isRecurrently = useMemo(() => equals(state.sendingType, 'recurrently'), [state.sendingType]);
  const isSchedule = useMemo(() => equals(state.sendingType, 'schedule'), [state.sendingType]);

  return (
    <>
      <Stack spacing={2}>
        <TextField
          label="Receiver"
          value={state.receiver}
          onChange={(e) => setState({receiver: e.target.value})}
          variant="outlined"
          type="email"
        />
        <TextField
          label="Email content"
          value={state.content}
          onChange={(e) => setState({content: e.target.value})}
          multiline
          rows={6}
        />
      </Stack>
      <Box marginTop={2}>
        <FormControl>
          <FormLabel>Send it</FormLabel>
          <RadioGroup
            row
            defaultValue="now"
            value={state.sendingType}
            name="send-it"
            onChange={(e) => setState({sendingType: e.target.value})}
          >
            <FormControlLabel value="now" control={<Radio />} label="Now" />
            <FormControlLabel value="schedule" control={<Radio />} label="Schedule" />
            <FormControlLabel value="recurrently" control={<Radio />} label="Recurrently" />
          </RadioGroup>
        </FormControl>
      </Box>
      {isRecurrently && <Box>
        <Typography>Repeat on:</Typography>
        <Repeat 
          handleDaysChange={handleDaysChange}
          handleTimeChange={(v) => setState({repeatAt: v})}
          values={state.selectedDays}/>
        <EndSelect 
          onEndTypeChange={(endType) => setState({endType})}
          handleEndDateChange={(endDate) => setState({endDate})}
        />
      </Box>}
      {isSchedule && <Box>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="DateTimePicker"
          value={state.when}
          onChange={(newValue) => {
            setState({when: newValue});
          }}
        />
      </Box>}
      <Box marginTop={2}>
        <Button variant="outlined" onClick={onSubmit}>Create</Button>
      </Box>
    </>
  );
}