import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tooltip,
  Modal,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector, useDispatch } from "react-redux";
import { get_opening_days } from "../utils/get_opening_days";
import SelectTimeSlot from "./SelectTimeSlot";

export default function SelectDoctor() {
  const doctor_data = useSelector((state) => state.doctorData.doctors);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography
                fontWeight={"bold"}
                variant={"subtitle"}
                color={"#e52a5c"}
              >
                Doctor Name
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                fontWeight={"bold"}
                variant={"subtitle"}
                color={"#e52a5c"}
              >
                Clinic Area
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                fontWeight={"bold"}
                variant={"subtitle"}
                color={"#e52a5c"}
              >
                Weekly Opening
              </Typography>
            </TableCell>
            <TableCell align="right">
              {" "}
              <Typography
                fontWeight={"bold"}
                variant={"subtitle"}
                color={"#e52a5c"}
              >
                Appointment
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctor_data
            .sort((prev_doc, next_doc) => {
              if (prev_doc.name < next_doc.name) {
                return -1;
              }
            })
            .map((doctor) => (
              <Row key={doctor.name} doctor={doctor} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row(props) {
  const { doctor } = props;
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedDoctorID, setSelectedDoctorID] = React.useState("");
  const handleModalOpen = (doctor_id) => {
    setOpenModal(true)
    setSelectedDoctorID(doctor_id)
  }
  const handleModalClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <Tooltip title="See Doctor Profile">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell component="th" scope="row">
            {doctor.name.toUpperCase()}
          </TableCell>
          <TableCell align="right">
            {doctor.address.district.toUpperCase()}
          </TableCell>
          <TableCell align="right">
            {get_opening_days(doctor.opening_hours)}
          </TableCell>
          <TableCell align="right">
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleModalOpen(doctor.id)}
            >
              Booking
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card sx={{ width: "100%" }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="110"
                    image="../doctor.jpg"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="overline"
                      component="div"
                      color={"#e52a5c"}
                    >
                      Dr. {doctor.name.toUpperCase()}
                    </Typography>
                    <Typography variant="overline" color="#191258">
                      General Practitioner
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Address: {doctor.address.line_1}, {doctor.address.line_2},{" "}
                      {doctor.address.district}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "2px  #000",
            boxShadow: 24,
            p: 4,
            pt: 8
          }}
        >
          <SelectTimeSlot doctor_id={selectedDoctorID} handleModalClose={handleModalClose} />
          <Button onClick={() => handleModalClose()} variant={"outlined"} sx={{mt: 2}}>Back</Button>
        </Box>
      </Modal>
    </>
  );
}
