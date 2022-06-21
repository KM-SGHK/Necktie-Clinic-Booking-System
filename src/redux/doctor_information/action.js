export const saveDoctorData = (doctor_data) => {
  return {
    type: "SAVE_DOCTOR_DATA",
    payload: doctor_data,
  };
};

export const clearDoctorData = () => {
    return {
      type: "CLEAR_DOCTOR_DATA"
    };
  };

export function get_doctor_information() {
  return async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_NECKTIE_API_DOMAIN}/doctor`,
        {
          method: "GET",
          headers: {
            "x-api-key": process.env.REACT_APP_NECKTIE_API_KEY,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const doctor_data = await res.json();
      if (res.status === 200) {
        dispatch(saveDoctorData(doctor_data));
      }
    } catch (e) {
      console.log("error, ", e);
    }
  };
}
