import React from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers';
import { EmailScheduleForm } from './components/EmailScheduleForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <EmailScheduleForm />
      </LocalizationProvider>
    </div>
  );
}

export default App;
