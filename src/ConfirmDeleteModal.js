import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useStudent } from "./studentContext";

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

export default function ConfirmDeleteModal({ ViewComponent, student }) {
  const [open, setOpen] = React.useState(false);
  const { deleteStudent, formState } = useStudent();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    await deleteStudent(student._id);
    handleClose();
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
            Are you sure? <b>{student.name}</b> will be removed permanently!
          </Typography>
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
              color="error"
              onClick={handleDelete}
              disabled={formState.loading}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
