import axios from "axios";
import getIPLocation from "../scripts/IPLocator";
import { describe, it, expect, vi } from "vitest";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getIPLocation", () => {
  it("should fetch IP location data", async () => {
    // Define a mock response from the API
    const mockResponse = {
      data: {
        ip: "192.168.0.1",
        isp: "OpenAI",
        location: {
          city: "New York",
          country: "US",
          lat: 40.7128,
          lng: -74.006,
          timezone: "-4",
        },
      },
    };

    // Set up the Axios mock to return the mock response
    const mockAxiosGet = vi.mocked(axios.get);
    mockAxiosGet.mockResolvedValue(mockResponse);

    // Call the function with a mock IP address
    const result = await getIPLocation("192.168.0.1");

    // Assert that the function returned the expected data
    expect(result).toEqual({
      ip: "192.168.0.1",
      isp: "OpenAI",
      city: "New York",
      country: "US",
      latitude: 40.7128,
      longitude: -74.006,
      timezone: "UTC -4",
    });

    // Assert that the Axios mock was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      "https://geo.ipify.org/api/v2/country,city?apiKey=at_9PoZZnW2sLUxOH1mPvOgtmTzs9Ziu&ipAddress=192.168.0.1"
    );
  });

  it("should handle missing IP address", async () => {
    // Define a mock response from the API
    const mockResponse = {
      data: {
        ip: "192.168.0.1",
        isp: "OpenAI",
        location: {
          city: "New York",
          country: "US",
          lat: 40.7128,
          lng: -74.006,
          timezone: "-4",
        },
      },
    };

    // Set up the Axios mock to return the mock response
    const mockAxiosGet = vi.mocked(axios.get);
    mockAxiosGet.mockResolvedValue(mockResponse);

    // Call the function with no IP address
    const result = await getIPLocation();

    // Assert that the function returned the expected data
    expect(result).toEqual({
      ip: "192.168.0.1",
      isp: "OpenAI",
      city: "New York",
      country: "US",
      latitude: 40.7128,
      longitude: -74.006,
      timezone: "UTC -4",
    });

    // Assert that the Axios mock was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      "https://geo.ipify.org/api/v2/country,city?apiKey=at_9PoZZnW2sLUxOH1mPvOgtmTzs9Ziu&ipAddress="
    );
  });
});
