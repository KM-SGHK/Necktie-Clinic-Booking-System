export const get_doctor_id = (booking_id, bookings) => {
  return bookings.filter((booking) => booking.id === booking_id)[0].doctorId;
};

export const get_doctor_name = (doctor_id, doctors) => {
  return doctors.filter((doctor) => doctor.id === doctor_id)[0].name.toUpperCase();
};
