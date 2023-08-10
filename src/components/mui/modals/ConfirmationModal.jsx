import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ConfirmationModal({ isOpen, closeModal }) {
  return (
    <div style={{ zIndex: 99 }}>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        maxWidth='md'
        onClose={closeModal}
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle>{'Confirmation?'}</DialogTitle>

        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>Are You sure to do this action?</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal}>Disagree</Button>
          <Button onClick={closeModal}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
