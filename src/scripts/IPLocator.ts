import axios from "axios";
import IPData from "../interface/IPData";

const getIPLocation = async (userIP?: string): Promise<IPData | undefined> => {
  userIP == null ? (userIP = "") : userIP;

  try {
    const res = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_9PoZZnW2sLUxOH1mPvOgtmTzs9Ziu&ipAddress=${userIP}`
    );

    let { ip, isp } = res.data;
    let {
      city,
      country,
      lat: latitude,
      lng: longitude,
      timezone,
    } = res.data.location;
    timezone = "UTC " + timezone;
    return { ip, isp, city, country, latitude, longitude, timezone };
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
};

export default getIPLocation;
