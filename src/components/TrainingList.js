import React, { useState, useEffect } from 'react';
import '../App.css';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import EditTraining from './EditTraining';
import moment from 'moment';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [opensnack, setOpenSnack] = React.useState(false);

  useEffect(() => {
    getTrainings();
  }, [])

  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  const deleteTraining = (params) => {
    if(window.confirm("Are you sure you want to delete this training?")) {
      fetch('https://customerrest.herokuapp.com/api/trainings/' + params.value, {
        method: 'DELETE'
      })
      .then(_ => getTrainings())
      .then(_ => handleOpenSnack())
      .catch(err => console.error(err))
    }
  }

  const updateTraining = (id, training) => {
    //console.log(id, training);
    fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(training)
    })
    .then(_ => getTrainings())
    .catch(err => console.error(err))  
  }

  const handleOpenSnack = () => {
    setOpenSnack(true);
  }

  const handleCloseSnack = () => {
    setOpenSnack(false);
  }

  function dateFormatter(params) {
    return moment(params.value).format('DD/MM/YYYY HH:mm');
  }

  const columns = [
    {headerName: 'Date', field: 'date', valueFormatter: dateFormatter, sortable: true, filter: true, floatingFilter: true},
    {headerName: 'Activity', field: 'activity', sortable: true, filter: true, floatingFilter: true},
    {headerName: 'Duration (minutes)', field: 'duration', sortable: true, filter: true, floatingFilter: true},
    {headerName: 'Customer Last Name', field: 'customer.lastname', sortable: true, filter: true, floatingFilter: true}, 
    {headerName: 'Customer First Name', field: 'customer.firstname', sortable: true, filter: true, floatingFilter: true},
    {
      headerName: 'Edit',
      field: 'id',
      width: 80,
      cellRendererFramework: params => 
        <EditTraining updateTraining={updateTraining} params={params} />
    },
    {
      headerName: 'Delete',
      field: 'id',
      width: 100,
      cellRendererFramework: params => 
        <Tooltip title="Delete Training" placement="bottom">
          <IconButton aria-label="delete" color="secondary" onClick={() => deleteTraining(params)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
    }
  ]
    
  return(
    <div>
        <div className="ag-theme-material" style={{ height: 650, width: '80%', margin: 'auto' }}>
          <Typography color="primary">
          <h1>Trainings</h1>
          </Typography>
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        animateRows="true"
        pagination="true"
        paginationPageSize="10"
      >
      </AgGridReact>
    </div>
      <Snackbar 
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={opensnack}
        onClose={handleCloseSnack}
        autoHideDuration={3000}
        message="✔ Training deleted successfully!"
      />
  </div>
    )
  }
  
  export default TrainingList;
