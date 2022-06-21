const zip_doctor_booked_timeslots_infomration = (...booking_lists) => {
  return [...booking_lists[0]].map((_, c) =>
    booking_lists.map((booking_list) => booking_list[c])
  );
};

export const check_booked_timeslot = (date, timeslot, doctor_id, bookings) => {
  const doctor_booked_dates = bookings
    .filter(
      (booking) =>
        booking.doctorId === doctor_id && booking.status === "confirmed"
    )
    .map((booking) => booking.date);
  if (doctor_booked_dates.length === 0) {
    return false;
  }
  const doctor_booked_timeslots = bookings
    .filter((booking) => booking.doctorId === doctor_id)
    .map((booking) => booking.start);
  const grouped_doctor_booking_schedule_list =
    zip_doctor_booked_timeslots_infomration(
      doctor_booked_dates,
      doctor_booked_timeslots
    );
  return grouped_doctor_booking_schedule_list.some(
    (schedule_details) =>
      schedule_details.includes(date) && schedule_details.includes(timeslot)
  );
};

// console.log(zip( ['row0col0', 'row0col1', 'row0col2'] ,['row1col0', 'row1col1', 'row1col2'], ['row1col0', 'row1col1', 'row1col2'] ))//
// output
// [["row0col0", "row1col0", "row1col0"], ["row0col1", "row1col1", "row1col1"], ["row0col2", "row1col2", "row1col2"]]
