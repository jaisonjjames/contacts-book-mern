import React, { useState, useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  AddCircle,
  EditOutlined,
  DeleteOutline,
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import { ThemeProvider, createTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteContact, deleteContacts } from "../actions/contact";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
  card: {
    margin: "10px",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "1.96em",
  },
}));

const ContactTable = ({ handleOpen, setCurrentId }) => {
  const defaultMaterialTheme = createTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const contacts = useSelector((state) => state.contacts);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const handleRemoveAll = (e, rowData) => {
    e.preventDefault();
    const ids = rowData.map((row) => row._id);

    dispatch(deleteContacts(ids));
  };

  const handleEdit = (id) => {
    setCurrentId(id);
    handleOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => handleOpen(true)}
        >
          <AddCircle />
          &nbsp;&nbsp;Add Contact
        </Button>
      </div>
      <Card>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            title="Contact Details"
            icons={tableIcons}
            isLoading={loading}
            columns={[
              {
                title: "",
                field: "selectedImage",
                render: (rowData) =>
                  rowData && (
                    <img
                      alt={"UserImage"}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                      }}
                      src={rowData.selectedImage}
                    />
                  ),
              },
              {
                title: "Name",
                field: "name",
              },
              {
                title: "Email",
                field: "email",
              },
              {
                title: "Phone",
                field: "phone",
              },
              {
                title: "Address",
                field: "address",
              },
              {
                title: "Actions",
                field: "actions",
                render: (rowData) =>
                  rowData && (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(rowData._id)}
                      >
                        <EditOutlined />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(rowData._id)}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </>
                  ),
              },
            ]}
            data={contacts}
            actions={[
              (rowData) => ({
                icon: () => <DeleteOutline />,
                tooltip: "Remove all selected contacts",
                onClick: (e, rowData) => handleRemoveAll(e, rowData),
              }),
            ]}
            options={{
              actionsColumnIndex: -1,
              exportButton: true,
              selection: true,
            }}
          />
        </ThemeProvider>
      </Card>
    </>
  );
};

export default ContactTable;
