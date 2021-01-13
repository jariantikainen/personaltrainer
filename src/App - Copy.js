import React, { useState } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import CalendarView from './components/CalendarView';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

function App() {
  const [value, setValue] = useState('1');

  const handleTabChange= (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Box display="flex">
          <Toolbar>
            <Typography variant="h6">
              Personal Trainer
            </Typography>
          </Toolbar>
          <Tabs value={value} onChange={handleTabChange}>
            <Tab value="1" label={<><GroupIcon /> Customers</>} />
            <Tab value="2" label={<><DirectionsRunIcon /> Trainings</>} />
            <Tab value="3" label={<><CalendarTodayIcon /> Calendar</>} />
          </Tabs>
        </Box>
      </AppBar>
      { value === '1' && <CustomerList /> }
      { value === '2' && <TrainingList /> }
      { value === '3' && <CalendarView /> }
    </div>
  );
}

export default App;