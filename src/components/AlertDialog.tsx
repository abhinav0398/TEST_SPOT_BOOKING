import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface proptype {
  open: boolean;
  title: string;
  desc: string;
  onClose: any;
}

export default function AlertDialog(props: proptype) {
  const { open, title, desc, onClose } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        // aria-labelledby='alert-dialog-title'
        // aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Dismiss</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
