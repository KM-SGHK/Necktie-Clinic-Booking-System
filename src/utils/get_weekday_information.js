export const get_weekday_information = (weekday_text) => {
  const weekday_map = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
  };
  return weekday_map[weekday_text];
};
