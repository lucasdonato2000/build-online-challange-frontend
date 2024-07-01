import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  if (!address || typeof address !== "string") {
    res.status(400).json({ error: "Address is required" });
    return;
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );
    if (response.data.status !== "OK") {
      res.status(500).json({ error: "Failed to fetch map data" });
      return;
    }

    const location = response.data.results[0].geometry.location;
    res.status(200).json({ location });
  } catch (error) {
    console.error("Error fetching map data:", error);
    res.status(500).json({ error: "Failed to fetch map data" });
  }
};

export default handler;
