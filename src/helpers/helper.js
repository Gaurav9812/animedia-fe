export const days = Array(31).fill(" ");

export const months = {
  1: "January",
  2: "Febrary",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const startYear = 1950;

export const endYear = new Date().getFullYear() - 1;

export const years = Array(endYear - startYear).fill("");
