import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Modal } from "@mui/material";
import {
  format_timeslot,
  get_appointment_information,
} from "../utils/get_appointment_information";
import { get_doctor_name, get_doctor_id } from "../utils/get_doctor_name_by_id";
import { cancel_booking } from "../redux/booking/action";
import moment from "moment";

export default function AppointmentRecord() {
  const bookings = useSelector((state) => state.bookingData.bookings);
  const clientName = useSelector((state) => state.clientName.clientName);
  const doctors = useSelector((state) => state.doctorData.doctors);
  const [selectedBookingID, setSelectedBookingID] = useState("");
  const [clientBookings, setClientBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setClientBookings(
      bookings
        .filter(
          (booking) =>
            booking.name === clientName && booking.status === "confirmed"
        )
        .sort((prev_booking, next_booking) => {
          if (prev_booking.date < next_booking.date) {
            return -1;
          }
        })
    );
  }, [bookings, clientName]);
  const handleSubmitCancellation = () => {
    dispatch(cancel_booking(selectedBookingID));
    setClientBookings("");
    setModalOpen(false);
  };
  const handleClick = (event) => {
    event.preventDefault();
    setSelectedBookingID(event.target.value);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 220,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "start",
      headerName: "Time",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (row) => {
        return format_timeslot(row.row.start);
      },
    },
    {
      field: "doctorId",
      headerName: "Doctor Name",
      width: 280,
      headerAlign: "center",
      align: "center",
      renderCell: (row) => {
        return "Dr. " + get_doctor_name(row.row.doctorId, doctors);
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 220,
      headerAlign: "center",
      align: "center",
      renderCell: (row) => {
        return (
          row.row.status.substring(0, 1).toUpperCase() +
          row.row.status.substring(1, row.row.status.length)
        );
      },
    },
    {
      field: "action",
      headerAlign: "center",
      align: "center",
      type: <button />,
      headerName: "Cancel Booking",
      sortable: false,
      width: 220,
      renderCell: (row) => {
        return (
          <Button
            variant="outlined"
            value={row.row.id}
            color="error"
            onClick={(e) => handleClick(e)}
          >
            Cancel
          </Button>
        );
      },
    },
  ];
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ height: 420, width: "100%" }}>
      {clientBookings.length > 0 && (
        <DataGrid
          rows={clientBookings}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{ height: "100%" }}
          VerticalContentAlignment={"Center"}
          HorizontalContentAlignment={"Center"}
        />
      )}
      {clientBookings.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle">
            Checking Records. You may make new appointments first.
          </Typography>
        </Box>
      )}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            component="h2"
            fontWeight={"bold"}
            color={"#e52a5c"}
            align={"center"}
          >
            Booking Cancellation
          </Typography>
          <Typography sx={{ mt: 2 }} align={"center"}>
            Cancel Appointment
          </Typography>
          {selectedBookingID.length > 0 && (
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              align={"center"}
            >
              On {get_appointment_information(selectedBookingID, bookings).date}{" "}
              [
              {
                get_appointment_information(selectedBookingID, bookings)
                  .timeslot
              }
              ]{" "}
            </Typography>
          )}
          {selectedBookingID.length > 0 && (
            <Typography
              variant="subtitle2"
              fontWeight={"bold"}
              align={"center"}
            >
              With Dr.{" "}
              {get_doctor_name(
                get_doctor_id(selectedBookingID, bookings),
                doctors
              )}
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
            <Button
              onClick={() => handleSubmitCancellation()}
              variant="outlined"
              color="error"
              size="medium"
            >
              Yes
            </Button>
            <Button
              onClick={() => handleModalClose()}
              variant="outlined"
              color="info"
              size="medium"
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
