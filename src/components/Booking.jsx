import React from "react";
import {
  Container,
  Box,
  Typography,
  Toolbar,
  AppBar,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { clearClientName } from "../redux/client_information/action";
import {
  get_doctor_information,
  clearDoctorData,
} from "../redux/doctor_information/action";
import AppointmentRecord from "./AppointmentRecord";
import SelectDoctor from "./SelectDoctor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment"

export default function Booking() {
  const dispatch = useDispatch();
  const clientName = useSelector((state) => state.clientName.clientName);
  const handleLogout = () => {
    dispatch(clearClientName());
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#191357" }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Necktie
            </Typography>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <ToastContainer />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "white",
            height: "100vh",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 15,
            }}
          >
            <img
              src="https://res.cloudinary.com/dpaehurgb/image/upload/v1655442363/tie_ewdoen.png"
              alt="tie"
              style={{ height: "150px", width: "150px", position: "static" }}
            />
            <Typography
              align="center"
              variant="h3"
              color="#191357"
              sx={{ position: "static" }}
            >
              Manage Booking
            </Typography>
            <Typography
              align="center"
              variant="subtitle"
              fontWeight="light"
              mt={2}
              sx={{ position: "static" }}
            >
              Greetings, {clientName}. Consult Our Doctors at Anytime, Anywhere.
            </Typography>
            <Typography variant="overline">
              Today: {moment(Date.now()).format("YYYY-MM-DD (ddd)")}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 9,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              //   alignItems: "center",
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Scheduled Bookings
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AppointmentRecord />
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ width: "100" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  New Appointment
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SelectDoctor />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Container>
    </>
  );
}
