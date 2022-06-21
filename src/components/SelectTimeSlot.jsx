import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import Calendar from "react-calendar";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { get_timeslots_for_the_date } from "../utils/get_timeslots_for_the_date";
import styled from "styled-components";
import { create_booking } from "../redux/booking/action";
import { check_booked_timeslot } from "../utils/check_booked_timeslot";
import { toast } from "react-toastify";

export default function SelectTimeSlot(prop) {
  const { doctor_id } = prop;
  const doctors_data = useSelector((state) => state.doctorData.doctors);
  const clientName = useSelector((state) => state.clientName.clientName);
  const bookings = useSelector((state) => state.bookingData.bookings);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeslot, setSelectedTimeslot] = useState(0);
  const [timeSlotsForTheDate, setTimeSlotsForTheDate] = useState([]);
  const dispatch = useDispatch();
  const onHandleSelectedDate = (date) => {
    if (
      moment(date).format("YYYY-MM-DD") < moment(Date.now()).format("YYYY-MM-DD")
    ) {
      toast.error("Past Dates Can't be Selected", {
        position: "top-center",
        autoClose: 10000,
        closeOnClick: true,
        theme: "colored",
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setSelectedDate(date);
    }
  };
  const onHandleSelectedTimeslot = (e) => {
    setSelectedTimeslot(e.target.value);
  };
  const onHandleBookingSubmit = () => {
    dispatch(
      create_booking({
        "name": clientName,
        "start": parseFloat(selectedTimeslot),
        "date": moment(selectedDate).format("YYYY-MM-DD"),
        "doctorId": doctor_id,
        "status": "confirmed",
      })
    );
    setSelectedDate(new Date());
    setSelectedTimeslot(0);
    setTimeSlotsForTheDate([]);
    prop.handleModalClose();
  };
  useEffect(() => {
    setTimeSlotsForTheDate(
      get_timeslots_for_the_date(
        doctor_id,
        moment(selectedDate).format("ddd").toUpperCase(),
        doctors_data
      )
    );
  }, [selectedDate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          flex: 2,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginLeft: 1, fontWeight: "bold", color: "#191258" }}
        >
          Appointment with Dr.{" "}
          {doctors_data
            .filter((doctor) => doctor.id == doctor_id)[0]
            .name.toUpperCase()}
        </Typography>
        <CalendarContainer>
          <Calendar
            onChange={(date) => onHandleSelectedDate(date)}
            value={selectedDate}
          />
        </CalendarContainer>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          {selectedTimeslot === 0 ? (
            <Typography
              variant="caption"
              sx={{ paddingLeft: 3, fontWeight: "bold" }}
            >
              Select Timeslot for{" "}
              {moment(selectedDate).format("YYYY-MM-DD (ddd)")}
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  flex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ paddingLeft: 5 }}>
                  <Typography
                    variant="caption"
                    fontWeight={"bold"}
                    color="#ff569b"
                    sx={{ paddingLeft: 5 }}
                  >
                    Your Booking:
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 0.2,
                  }}
                >
                  <Typography
                    variant="caption"
                    color="#ff569b"
                    fontWeight={"bold"}
                  >
                    {moment(selectedDate).format("YYYY-MM-DD (ddd)")}-[
                  </Typography>
                  <Typography
                    variant="caption"
                    color="#ff569b"
                    fontWeight={"bold"}
                  >
                    {selectedTimeslot - Math.floor(selectedTimeslot) === 0.5
                      ? Math.floor(selectedTimeslot).toString() + ":30"
                      : Math.floor(selectedTimeslot).toString() + ":00"}
                    ]
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 1.5,
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "92%",
                    backgroundColor: "#ff569b",
                    color: "black",
                  }}
                  onClick={() => onHandleBookingSubmit()}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            flex: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            spacing={0.5}
            columns={3}
            direction="row"
            sx={{ maxWidth: "400px", minWidth: "250px" }}
          >
            {timeSlotsForTheDate.map((timeslot, i) => (
              <Grid
                item
                key={i}
                xs={1}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  value={parseFloat(Object.keys(timeslot))}
                  disabled={check_booked_timeslot(
                    parseFloat(Object.keys(timeslot)),
                    moment(selectedDate).format("YYYY-MM-DD"),
                    doctor_id,
                    bookings
                  )}
                  onClick={(e) => onHandleSelectedTimeslot(e)}
                  sx={{
                    width: 10,
                    color: "#191258",
                    "&:hover": {
                      backgroundColor: "#ff569b",
                      color: "white",
                      boxShadow: 3,
                    },
                  }}
                >
                  {Object.values(timeslot)[0]}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

// styling for calendar
const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  max-width: 600px;
  margin: auto;
  margin-top: 20px;
  background-color: white;
  border-radius: 3px;
  /* ~~~ navigation styles ~~~ */
  .react-calendar__navigation {
    display: flex;
    .react-calendar__navigation__label {
      font-weight: bold;
    }
    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }
  /* ~~~ label styles ~~~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
  }
  /* ~~~ button styles ~~~ */
  button {
    margin: 3px;
    background-color: #ff569b;
    border: 0;
    border-radius: 3px;
    color: white;
    padding: 5px 0;
    &:hover {
      background-color: #556b55;
    }
    &:active {
      background-color: #a5c1a5;
    }
  }
  /* ~~~ day grid styles ~~~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    .react-calendar__tile {
      max-width: initial !important;
    }
    .react-calendar__tile--range {
      box-shadow: 0 0 6px 2px black;
    }
  }
  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.7;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
  }
  /* ~~~ other view styles ~~~ */
  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;
    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`;
