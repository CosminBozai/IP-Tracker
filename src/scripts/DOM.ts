import IPData from "../interface/IPData";

const ipField = document.querySelector("#ip")!;
const location = document.querySelector("#location")!;
const timezoneField = document.querySelector("#timezone")!;
const ispField = document.querySelector("#isp")!;

// Convert country code to full name
let countryName = new Intl.DisplayNames(["en"], { type: "region" });

const populateFields = (data: IPData) => {
  ipField.textContent = data.ip;
  location.textContent = data.city + ", " + countryName.of(data.country);
  timezoneField.textContent = data.timezone;
  ispField.textContent = data.isp;
};

const error = document.querySelector(".error")! as HTMLParagraphElement;

const isError = (display: boolean) => {
  display ? (error.style.display = "block") : (error.style.display = "none");
};

export { populateFields, isError };
