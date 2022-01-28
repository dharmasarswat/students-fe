import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import StudentsTable from "./StudentsTable";
import { StudentProvider, useStudent } from "./studentContext";
import { Button, CssBaseline, Divider } from "@mui/material";
import UpdateUserModal from "./UpdateStudentModal";
import Statics from "./Statics";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function ToggleDarkMode() {
  const { formState } = useStudent();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "end",
        justifyContent: "end",
        bgcolor: "background.default",
        color: "text.primary",
        paddingBottom: "20px",
      }}
    >
      <UpdateUserModal
        ViewComponent={
          <Button
            variant="contained"
            color="primary"
            disabled={formState.loading}
          >
            Add Student
          </Button>
        }
      />
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <StudentProvider>
            <ToggleDarkMode />
            <Divider />
            <Statics />
            <Divider />
            <StudentsTable />
          </StudentProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.Fragment>
  );
}
