import { Typography } from "@mui/material";
import { useState } from "react";
import Repeat from "./Repeat";

export const EmailScheduleForm = () => {
  const [selectedDays, selectDays] = useState(['']);

  const handleDayChange = (selectedDays: string[]) => {
    selectDays(selectedDays);
  };

  return (
    <> 
      <Typography>Repeat on:</Typography>
      <Repeat handleChange={handleDayChange} values={selectedDays}/>
    </>
  );
}