import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useStudent } from "./studentContext";
import { Autocomplete, Grid, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const countryOptions = [
  "India",
  "USA",
  "England",
  "Nepal",
  "Bhutan",
  "China",
  "Bangladesh",
];

export default function UpdateUserModal({ ViewComponent, student }) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(
    student ?? {
      name: "",
      class: "",
      age: "",
      country: "",
    }
  );
  const { addOrUpdateStudent, formState } = useStudent();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateStudent = async (e) => {
    e.preventDefault();
    await addOrUpdateStudent(state);
    handleClose();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((state) => ({ ...state, [id]: value }));
  };

  return (
    <>
      <span onClick={handleOpen}>{ViewComponent}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {student ? (
              <b>
                Update <i>{student.name}</i>
              </b>
            ) : (
              "Add new student"
            )}
          </Typography>
          <form onSubmit={updateStudent}>
            <Grid container spacing={2} sx={{ marginTop: 5, marginBottom: 5 }}>
              <Grid item xs={6}>
                <TextField
                  id="name"
                  label="Name"
                  variant="filled"
                  onChange={handleChange}
                  value={state.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="age"
                  label="Age"
                  variant="filled"
                  onChange={handleChange}
                  value={state.age}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="class"
                  label="Class"
                  variant="filled"
                  onChange={handleChange}
                  value={state.class}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  value={state.country}
                  onChange={(_, newValue) => {
                    setState((state) => ({ ...state, country: newValue }));
                  }}
                  id="controllable-states"
                  options={countryOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" />
                  )}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "end",
                justifyContent: "end",
                bgcolor: "background.default",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={formState.loading}
              >
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}
