import React, { useState } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

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
          </Tabs>
        </Box>
      </AppBar>
      { value === '1' && <CustomerList /> }
      { value === '2' && <TrainingList /> }
    </div>
  );
}

export default App;