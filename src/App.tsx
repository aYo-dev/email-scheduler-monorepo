import {LocalizationProvider} from '@mui/x-date-pickers';
import { EmailScheduleForm } from './components/EmailScheduleForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from './components/Header';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6} sx={{margin: 4}}>
                <EmailScheduleForm />
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </div>
  );
}

export default App;
