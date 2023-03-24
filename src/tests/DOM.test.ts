import { describe, it, expect } from "vitest";
import { populateFields } from "../scripts/DOM";
import IPData from "../interface/IPData";
import Fields from "../interface/Fields";

// Define a mock IPData object for testing
const mockData: IPData = {
  ip: "192.168.0.1",
  city: "New York",
  timezone: "UTC-5",
  isp: "OpenAI",
  country: "US",
  latitude: 20,
  longitude: 20,
};

describe("populateFields", () => {
  it("should populate all fields correctly", () => {
    // Create the required elements in the document
    document.body.innerHTML = `
       <div>
         <span id="ip"></span>
         <span id="location"></span>
         <span id="timezone"></span>
         <span id="isp"></span>
       </div>
     `;

    const fields: Fields = {
      ipField: document.querySelector("#ip")! as HTMLParagraphElement,
      locationField: document.querySelector(
        "#location"
      )! as HTMLParagraphElement,
      timezoneField: document.querySelector(
        "#timezone"
      )! as HTMLParagraphElement,
      ispField: document.querySelector("#isp")! as HTMLParagraphElement,
    };

    // Call the function with the mock data
    populateFields(fields, mockData);

    const countryName = new Intl.DisplayNames(["en"], { type: "region" });
    // Assert that the fields have been populated with the correct values
    expect(fields.ipField.textContent).toBe(mockData.ip);
    expect(fields.locationField.textContent).toBe(
      mockData.city + ", " + countryName.of(mockData.country)
    );
    expect(fields.timezoneField.textContent).toBe(mockData.timezone);
    expect(fields.ispField.textContent).toBe(mockData.isp);
  });
});
