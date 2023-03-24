import * as leaflet from "leaflet";
import { describe, it, expect, vi, beforeEach } from "vitest";
import setMarker from "../scripts/Map";

vi.mock("leaflet", () => ({
  map: vi.fn().mockReturnValue({
    removeLayer: vi.fn(),
    setView: vi.fn(),
  }),
  tileLayer: vi.fn().mockReturnValue({
    addTo: vi.fn(),
  }),
  icon: vi.fn().mockReturnValue({}),
  marker: vi.fn().mockReturnValue({
    addTo: vi.fn(),
  }),
}));

describe("setMarker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a new map if no previous marker exists", async () => {
    const latitude = 37.7749;
    const longitude = -122.4194;

    leaflet.map("map", { zoomControl: false });

    await setMarker(latitude, longitude);

    expect(leaflet.map).toHaveBeenCalledWith("map", { zoomControl: false });
    expect(leaflet.tileLayer).toHaveBeenCalledWith(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    expect(leaflet.marker).toHaveBeenCalledWith([latitude, longitude], {
      icon: expect.anything(),
    });
  });
});
