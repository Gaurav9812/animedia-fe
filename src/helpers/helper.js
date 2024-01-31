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

export const tokenKey = "_identity";

export const SIDE_BAR_IMG = 'https://geektrust.sgp1.digitaloceanspaces.com/assets/svg/meditating_girl.svg';

export const addOnLocalStorage=(key,value)=>{
  localStorage.setItem(key,value);
}

export const deleteFromLocalStorage=(key)=>{
  localStorage.removeItem(key);
}

export const getFromLocalStorage=(key)=>{
  return localStorage.getItem(key);
}


export const removeFromLocalStorage=(key)=>{
  return localStorage.removeItem(key);
}


export const resolveFields = (field)=>{
    return allFields()[field];
}

export const CHAR_LIMT_IN_BIO = 100;

const allFields = ()=>{
  return {
    cover_photo:"Cover Photo",
    profile_photo:"Profile Photo"
  }
}


