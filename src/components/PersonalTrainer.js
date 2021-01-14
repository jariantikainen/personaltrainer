import React from "react";
import '../App.css';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import CustomerList from "./CustomerList";
import TrainingList from "./TrainingList";
import CalendarView from './CalendarView';
import GroupIcon from '@material-ui/icons/Group';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const PersonalTrainer = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "customers",
    1: "trainings",
    2: "calendar"
  };

  const indexToTabName = {
    customers: 0,
    trainings: 1,
    calendar: 2
  };

  const handleTabChange = (event, newValue) => {
    history.push(`/personaltrainer/${tabNameToIndex[newValue]}`);
  };

  const selectedTab = indexToTabName[page];

  return (
    <div className="App">
      <AppBar position="static">
        <Box display="flex">
          <Toolbar>
            <Typography variant="h6">
              Personal Trainer
            </Typography>
          </Toolbar>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label={<><GroupIcon /> Customers</>} />
            <Tab label={<><DirectionsRunIcon /> Trainings</>} />
            <Tab label={<><CalendarTodayIcon /> Calendar</>} />
          </Tabs>
        </Box>
      </AppBar>
      {selectedTab === 0 && <CustomerList />}
      {selectedTab === 1 && <TrainingList />}
      {selectedTab === 2 && <CalendarView />}
    </div>
  );
};

export default PersonalTrainer;