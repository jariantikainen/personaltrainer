import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';

function EditTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = useState({
    date: '',
    activity: '',
    duration: '',
    customer: ''
  })

  const handleClickOpen = () => {
    console.log(props);
    setTraining({
      date: props.params.data.date,
      activity: props.params.data.activity,
      duration: props.params.data.duration,
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateTraining(props.params.value, training);
    handleClose();
  };

  const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  }

  return(
    <div>
      <Tooltip title="Edit Training" placement="bottom">
	      <IconButton aria-label="edit" color="primary" onClick={handleClickOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            type="datetime-local"
            label="Date"
            name="date"
            value={moment(training.date).format('YYYY-MM-DDTHH:mm')}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Activity"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Duration (min)"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditTraining;