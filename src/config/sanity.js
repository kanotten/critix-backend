import sanityClient from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2023-03-25",
});

export default client;
