import IPData from "../interface/IPData";
import Fields from "../interface/Fields";

const populateFields = (fields: Fields, data: IPData) => {
  // Convert country code to full name
  const countryName = new Intl.DisplayNames(["en"], { type: "region" });

  const { ipField, locationField, timezoneField, ispField } = fields;

  ipField.textContent = data.ip;
  locationField.textContent = data.city + ", " + countryName.of(data.country);
  timezoneField.textContent = data.timezone;
  ispField.textContent = data.isp;
};

const error = document.querySelector(".error")! as HTMLParagraphElement;

const isError = (display: boolean) => {
  display ? (error.style.display = "block") : (error.style.display = "none");
};

export { populateFields, isError };
