import { useEffect, useMemo, useReducer, useState } from "react";
import { equals } from "ramda";
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
import Fade from '@mui/material/Fade';
import { ValidationError } from "class-validator";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useApi } from "../hooks/useApi";
import EndSelect from "./EndOptions";
import Repeat from "./Repeat";
import { formInitialState, formReducer } from "../reducers";
import { Action, FormErrors } from "../interfaces";
import { Actions, SendingTypes } from "../enums";
import { MailValidator } from '../services';
import { SuccessSnackBar } from "./SuccessSnackBar";

const mapFormErrors = (feedback: ValidationError[]) => feedback.reduce((acc, el) => {
    return {
      ...acc, 
      [el.property]: el.constraints,
    }
  }, {});

export const EmailScheduleForm = () => {
  const [state, dispatch] = useReducer(formReducer, formInitialState);
  const [errors, setErrors] = useState<null | FormErrors>(null);
  const [showSuccessMsg, toggleSuccessMsg] = useState(false);

  const {
    isLoading,
    isError, // show message on error
    sendRequest,
    responseData,
  } = useApi(null);

  const onSubmit = async() => {
    const { content, receiver, sendingType } = state;

    const feedback = await new MailValidator({
      content,
      receiver,
    }).validate();

    if(feedback.length > 0) {
      const errors = mapFormErrors(feedback);

      setErrors(errors);
      return;
    }

    setErrors(null);
    sendRequest({
      url: `${process.env.REACT_APP_API_URL}/email`,
      method: 'post',
      data: state,
    });
  }

  useEffect(() => {
    if(isError || !responseData) return;

    toggleSuccessMsg(true);
    reset();
  }, [responseData, isError, responseData]);

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
        <SuccessSnackBar open={showSuccessMsg} handleClose={toggleSuccessMsg}/>
        <TextField
          label="Receiver"
          value={state.receiver}
          onChange={(e) => setState({receiver: e.target.value})}
          variant="outlined"
          type="email"
        />
        { errors?.receiver?.isEmail &&<Typography color="error" variant="body2">{errors?.receiver?.isEmail}</Typography> }
        { errors?.receiver?.isNotEmpty &&<Typography color="error" variant="body2">{errors?.receiver?.isNotEmpty}</Typography> }
        <TextField
          label="Email content"
          value={state.content}
          onChange={(e) => setState({content: e.target.value})}
          multiline
          rows={6}
        />
        { errors?.content?.isNotEmpty &&<Typography color="error" variant="body2">{errors?.content?.isNotEmpty}</Typography> }
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
            <FormControlLabel value={SendingTypes.now} control={<Radio />} label="Now" />
            <FormControlLabel value={SendingTypes.schedule} control={<Radio />} label="Schedule" />
            <FormControlLabel value={SendingTypes.recurrently} control={<Radio />} label="Recurrently" />
          </RadioGroup>
        </FormControl>
      </Box>
      {isRecurrently && <Fade in={isRecurrently}>
        <Box>
          <Typography>Repeat on:</Typography>
          <Repeat 
            handleDaysChange={handleDaysChange}
            handleTimeChange={(v) => setState({repeatAt: v})}/>
          <EndSelect
            handleOccurncesChange={((occurrences) => setState({occurrences}))}
            onEndTypeChange={(endType) => setState({endType})}
            handleEndDateChange={(endDate) => setState({endDate})}
          />
        </Box>
      </Fade>}
      {isSchedule && <Fade in={isSchedule}>
        <Box>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={state.when}
            onChange={(newValue) => {
              setState({when: newValue});
            }}
          />
        </Box>
      </Fade>}
      <Box marginTop={2}>
        <Button 
          variant="outlined"
          disabled={isLoading}
          onClick={onSubmit}>Create</Button>
      </Box>
    </>
  );
}