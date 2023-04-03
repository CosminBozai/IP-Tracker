import "./style.scss";
import getIPLocation from "./scripts/IPLocator";
import { populateFields, isError } from "./scripts/DOM";
import setMarker from "./scripts/Map";

const input = document.querySelector(
  "input[name='ip-input']"
) as HTMLInputElement;

const fields = {
  ipField: document.querySelector("#ip")! as HTMLParagraphElement,
  locationField: document.querySelector("#location")! as HTMLParagraphElement,
  timezoneField: document.querySelector("#timezone")! as HTMLParagraphElement,
  ispField: document.querySelector("#isp")! as HTMLParagraphElement,
};

const submit = document.querySelector("#submit")!;

window.addEventListener("load", async () => {
  const data = await getIPLocation();
  populateFields(fields, data);
  setMarker(data.latitude, data.longitude);
});

submit.addEventListener("click", async () => {
  isError(false);

  const IPRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

  if (IPRegex.test(input.value.trim())) {
    const data = await getIPLocation(input.value);
    populateFields(fields, data);
    setMarker(data.latitude, data.longitude);
  } else isError(true);
});
