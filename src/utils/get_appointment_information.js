export const format_timeslot = (start) => {
  return start - Math.floor(start) === 0.5
    ? Math.floor(start).toString() + ":30"
    : Math.floor(start).toString() + ":00";
};

export const get_appointment_information = (booking_id, bookings) => {
  const date = bookings.filter((booking) => booking.id === booking_id)[0].date;
  const timeslot = format_timeslot(
    bookings.filter((booking) => booking.id === booking_id)[0].start
  );
  return {
    date,
    timeslot,
  };
};
