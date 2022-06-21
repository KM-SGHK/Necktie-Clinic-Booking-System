import { get_weekday_information } from "./get_weekday_information";

export const get_opening_days = (opening_data) => {
  return opening_data
    .map((item) => item.day)
    .sort((prev_day, next_day) => {
      if (
        get_weekday_information(prev_day) < get_weekday_information(next_day)
      ) {
        return -1;
      }
    })
    .join(" ,");
};
