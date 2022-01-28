import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useStudent } from "./studentContext";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import UpdateUserModal from "./UpdateStudentModal";

export default function StudentsTable() {
  const { students } = useStudent();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student name</TableCell>
            <TableCell align="right">Standerd</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.name}
              </TableCell>
              <TableCell align="right">{student.class}</TableCell>
              <TableCell align="right">{student.age}</TableCell>
              <TableCell align="right">{student.country}</TableCell>
              <TableCell align="right">
                <UpdateUserModal
                  ViewComponent={
                    <IconButton
                      sx={{ ml: 1 }}
                      onClick={() => {}}
                      color="inherit"
                    >
                      <EditIcon />
                    </IconButton>
                  }
                  student={student}
                />
                <ConfirmDeleteModal
                  ViewComponent={
                    <IconButton sx={{ ml: 1 }} color="inherit">
                      <DeleteIcon />
                    </IconButton>
                  }
                  student={student}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
