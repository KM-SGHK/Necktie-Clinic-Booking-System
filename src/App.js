import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Client from "./components/Client";
import Booking from "./components/Booking";
import { clearClientName } from "./redux/client_information/action";
import { get_doctor_information, clearDoctorData } from "./redux/doctor_information/action";
import { get_booking } from "./redux/booking/action"

function App() {
  const [changeSection, setChangeSection] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([
      dispatch(clearClientName()),
      dispatch(get_doctor_information()),
      dispatch(get_booking())
    ]);
  }, [dispatch]);
  const storedClientName = useSelector((state) => state.clientName.clientName);
  useEffect(() => {
    if (storedClientName.length > 0) {
      setChangeSection(true);
    }
    if (storedClientName.length === 0) {
      setChangeSection(false);
    }
  }, [storedClientName]);
  return (
    <>
      {!changeSection && <Client />}
      {changeSection && <Booking />}
    </>
  );
}

export default App;
