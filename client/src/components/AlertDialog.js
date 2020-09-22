import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog = ({ openDialog, title, message, onAccept }) => {
  const [open, setOpen] = React.useState(true);

  function acceptedByUser() {
    if (onAccept) {
      onAccept();
    }

    if (openDialog) {
      openDialog(false);
    }

    setOpen(!open);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(!open);
              openDialog(false);
            }}
            color="secondary"
          >
            Cancelar
          </Button>
          <Button onClick={acceptedByUser} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
