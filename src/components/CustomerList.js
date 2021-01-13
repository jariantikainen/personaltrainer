import React, { useState, useEffect } from 'react';
import '../App.css';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import { Typography } from '@material-ui/core';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [opensnack, setOpenSnack] = React.useState(false);

  useEffect(() => {
    getCustomers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleErrors(response) {
    if(!response.ok) {
      throw new Error(response.status);
     }
    return response;
  }

  const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(handleErrors)
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  }

  const deleteCustomer = (params) => {
    if(window.confirm("Are you sure you want to delete customer?")) {
      fetch(params.value, {
        method: 'DELETE'
      })
      .then(_ => getCustomers())
      .then(_ => handleOpenSnack())
      .catch(err => console.error(err))
    }
  }

  const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(newCustomer)
    })
    .then(response => {
      if(response.ok)
        getCustomers()
    })
    .catch(err => console.error(err))  
  }

  const updateCustomer = (link, customer) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(_ => getCustomers())
    .catch(err => console.error(err))  
  }

  const addTraining = (newTraining) => {
    //console.log(newTraining)
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(newTraining)
    })
    .then(response => {
      if(response.ok)
        getCustomers()
    })
    .catch(err => console.error(err))  
  }

  const handleOpenSnack = () => {
    setOpenSnack(true);
  }

  const handleCloseSnack = () => {
    setOpenSnack(false);
  }

  const columns = [
    {headerName: 'First Name', field: 'firstname', sortable: true, filter: true, floatingFilter: true, resizable: true},
    {headerName: 'Last Name', field: 'lastname', sortable: true, filter: true, floatingFilter: true, resizable: true},
    {headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true, floatingFilter: true, resizable: true},
    {headerName: 'Postal Code', field: 'postcode', sortable: true, filter: true, floatingFilter: true, resizable: true},
    {headerName: 'City', field: 'city', sortable: true, filter: true, floatingFilter: true, resizable: true},
    {headerName: 'Email Address', field: 'email', sortable: true, filter: true, floatingFilter: true, resizable: true},
    {headerName: 'Phone Number', field: 'phone', sortable: true, filter: true, floatingFilter: true, resizable: true},
    {
      headerName: 'Add Training',
      field: 'links.0.href',
      width: 130,
      cellRendererFramework: params => 
        <AddTraining addTraining={addTraining} params={params} />
    },
    {
      headerName: 'Edit',
      field: 'links.0.href',
      width: 80,
      cellRendererFramework: params => 
        <EditCustomer updateCustomer={updateCustomer} params={params} />
    },
    {
      headerName: 'Delete',
      field: 'links.0.href',
      width: 90,
      cellRendererFramework: params => 
        <Tooltip title="Delete Customer" placement="bottom">
          <IconButton aria-label="delete" color="secondary" onClick={() => deleteCustomer(params)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
    }
  ]
    
  return(
      <div>
        <div className="ag-theme-material" style={{ height: 700, width: '80%', margin: 'auto' }}>
          <Typography color="primary">
          <h1>Customers</h1>
          </Typography>
        <AddCustomer addCustomer={addCustomer}/>
          <AgGridReact
            rowData={customers}
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
            message="✔ Customer deleted successfully!"
          />
      </div>
    )
  }
  
  export default CustomerList;