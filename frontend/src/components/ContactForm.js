import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  TextField,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FileBase64 from "react-file-base64";
import { createContact, updateContact } from "../actions/contact";

const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: "10px",
  },
}));

export const initialContactData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  selectedImage: "",
};

const ContactForm = ({ open, handleClose, currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  console.log("currentId ------> ", currentId);

  const [contactData, setContactData] = useState(initialContactData);

  const currentContactDetails = useSelector((state) =>
    currentId
      ? state.contacts.find((contact) => contact._id === currentId)
      : null
  );

  console.log("currentContactDetails ->>>> ", currentContactDetails);

  useEffect(() => {
    console.log("currentContactDetails -> ", currentContactDetails);
    if (currentContactDetails) {
      setContactData(currentContactDetails);
    } else {
      setContactData(initialContactData);
    }
  }, [currentContactDetails]);

  const handleClear = () => {
    setContactData(initialContactData);
    setCurrentId(null);
    handleClose(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateContact(currentId, contactData));
    } else {
      dispatch(createContact(contactData));
    }

    setContactData(initialContactData);

    handleClear();
  };

  const handleCancel = () => {
    handleClear();
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Contact Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`To ${currentId ? "update" : "add"} your contact form details here:`}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={contactData.name}
          onChange={(e) =>
            setContactData({ ...contactData, name: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          value={contactData.email}
          onChange={(e) =>
            setContactData({ ...contactData, email: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="phone"
          label="Phone Number"
          type="number"
          fullWidth
          value={contactData.phone}
          onChange={(e) =>
            setContactData({ ...contactData, phone: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="address"
          label="Address"
          type="text"
          fullWidth
          value={contactData.address}
          onChange={(e) =>
            setContactData({ ...contactData, address: e.target.value })
          }
        />
        <div className={classes.file}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setContactData({ ...contactData, selectedImage: base64 })
            }
          />
        </div>
        <DialogActions>
          <Button color="secondary" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            {`${currentId ? "Update" : "Submit"}`}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
