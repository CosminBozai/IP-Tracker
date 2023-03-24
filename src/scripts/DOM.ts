import IPData from "../interface/IPData";

const ipField = document.querySelector("#ip")!;
const cityField = document.querySelector("#city")!;
const timezoneField = document.querySelector("#timezone")!;
const ispField = document.querySelector("#isp")!;

const populateFields = (data: IPData) => {
  ipField.textContent = data.ip;
  cityField.textContent = data.city;
  timezoneField.textContent = data.timezone;
  ispField.textContent = data.isp;
};

const error = document.querySelector(".error")! as HTMLParagraphElement;

const isError = (display: boolean) => {
  display ? (error.style.display = "block") : (error.style.display = "none");
};

export { populateFields, isError };
