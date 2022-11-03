import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { equals } from "ramda";
import { useMemo, useState } from "react";
import { useApi } from "../hooks/useApi";
import EndSelect from "./EndOptions";
import Repeat from "./Repeat";

type EndOptions = 'never' | 'on' | 'after';

export const EmailScheduleForm = () => {
  const [selectedDays, selectDays] = useState(['']);
  const [end, setEnd] = useState('never');
  const [receiver, setReceiver] = useState('');
  const [content, setContent] = useState('');
  const [sendingType, setSendingType] = useState('once');

  const handleDayChange = (selectedDays: string[]) => {
    selectDays(selectedDays);
  };

  const isRecurrently = useMemo(() => equals(sendingType, 'recurrently'), [sendingType]);

  return (
    <>
      <Stack spacing={2} padding={2} sx={{maxWidth: '400px'}}>
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
      <Box>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Send it</FormLabel>
          <RadioGroup
            row
            defaultValue="once"
            name="send-it"
            onChange={(v) => setSendingType(v.target.value)}
          >
            <FormControlLabel value="once" control={<Radio />} label="Once" />
            <FormControlLabel value="recurrently" control={<Radio />} label="Recurrently" />
          </RadioGroup>
        </FormControl>
      </Box>
      {isRecurrently && <Box>
        <Typography>Repeat on:</Typography>
        <Repeat handleChange={handleDayChange} values={selectedDays}/>
        <EndSelect onEndTypeChange={setEnd}/>
      </Box>}
    </>
  );
}