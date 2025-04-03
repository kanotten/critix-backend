import sanityClient from '@sanity/client';
import dotenv from "dotenv";
dotenv.config();

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-03-25',
  token: process.env.SANITY_WRITE_TOKEN || '',
});

export default client;
