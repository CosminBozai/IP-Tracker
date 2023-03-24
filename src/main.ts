import "./style.scss";
import getIPLocation from "./scripts/IPLocator";
import { populateFields, isError } from "./scripts/DOM";
import setMarker from "./scripts/Map";

const input = document.querySelector(
  "input[name='ip-input']"
) as HTMLInputElement;

const submit = document.querySelector("#submit")!;

window.addEventListener("load", async () => {
  const data = await getIPLocation();
  populateFields(data);
  setMarker(data.latitude, data.longitude);
});

submit.addEventListener("click", async () => {
  isError(false);

  const IPRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

  if (IPRegex.test(input.value)) {
    const data = await getIPLocation(input.value);
    populateFields(data);
    setMarker(data.latitude, data.longitude);
  } else isError(true);
});
