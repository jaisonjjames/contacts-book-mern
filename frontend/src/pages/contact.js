import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import ContactTable from "../components/ContactTable";
import { fetchContacts } from "../actions/contact";
import { useDispatch, useSelector } from "react-redux";

const Contact = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <Header userInfo={userInfo} />
      <ContactTable handleOpen={setOpen} setCurrentId={setCurrentId} />
      <ContactForm
        open={open}
        handleClose={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
    </div>
  );
};

export default Contact;
