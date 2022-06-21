export const get_timeslots_for_the_date = (
  doctor_id,
  selected_day,
  doctors_data
) => {
  const selected_doctor_opening_information = doctors_data
    .filter((doctor) => doctor.id === doctor_id)[0]
    .opening_hours.filter((opening) => opening.day === selected_day);

  const clinic_starting_time = parseFloat(
    selected_doctor_opening_information[0].start
  );
  const clinic_closing_time = parseFloat(
    selected_doctor_opening_information[0].end
  );
  let doctor_available_timeslots = [];
  for (let i = clinic_starting_time; i < clinic_closing_time; i++) {
    let each_timeslot = {};
    each_timeslot[i] =
      i - Math.floor(i) === 0.5
        ? Math.floor(i).toString() + ":30"
        : Math.floor(i).toString() + ":00";
    doctor_available_timeslots.push(each_timeslot);
  }
  return doctor_available_timeslots;
};
