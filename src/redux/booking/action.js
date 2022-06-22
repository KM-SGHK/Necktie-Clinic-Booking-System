import { toast } from "react-toastify";

export const getBooking = (booking_payload) => {
  return {
    type: "GET_BOOKING",
    payload: booking_payload,
  };
};

export const createBooking = (booking_payload) => {
  return {
    type: "CREATE_BOOKING",
    payload: booking_payload,
  };
};

export const cancelBooking = (booking_payload_after_cancellation) => {
  return {
    type: "CANCEL_BOOKING",
    payload: booking_payload_after_cancellation,
  };
};

export function create_booking(booking_payload) {
  return async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_NECKTIE_API_DOMAIN}/booking`,
        {
          method: "POST",
          headers: {
            "x-api-key": process.env.REACT_APP_NECKTIE_API_KEY,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(booking_payload),
        }
      );
      const confirmed_booking_data = await res.json();
      if (res.status !== 200) {
        toast.error("Please select another date.", {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (res.status === 200) {
        dispatch(createBooking(confirmed_booking_data));
        toast.success("Booking Confirmed!", {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      console.log("error, ", e);
      toast.error(e, {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
}

export function get_booking() {
  return async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_NECKTIE_API_DOMAIN}/booking`,
        {
          method: "GET",
          headers: {
            "x-api-key": process.env.REACT_APP_NECKTIE_API_KEY,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const bookings_data = await res.json();
      if (res.status === 200) {
        dispatch(
          getBooking(
            bookings_data.filter((booking) => Object.keys(booking).length === 6)
          )
        );
      }
    } catch (e) {
      console.log("error, ", e);
      toast.error(e, {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
}

export function cancel_booking(booking_id) {
  return async (dispatch, getState) => {
    try {
      const cancellation_payload = {
        "status": "cancelled",
      };
      const res = await fetch(
        `${process.env.REACT_APP_NECKTIE_API_DOMAIN}/booking/${booking_id}`,
        {
          method: "PATCH",
          headers: {
            "x-api-key": process.env.REACT_APP_NECKTIE_API_KEY,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(cancellation_payload),
        }
      );
      const new_booking_data = await res.json();
      if (res.status === 200) {
        dispatch(cancelBooking(new_booking_data));
        toast.success("Booking Cancelled!", {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      console.log("error, ", e);
      toast.error(e, {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
}
