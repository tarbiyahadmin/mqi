import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId || !dataset) {
  console.warn("Sanity: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set");
}

export const sanityClient = createClient({
  projectId: projectId ?? "xqhurz2n",
  dataset: dataset ?? "production",
  useCdn: true,
  apiVersion,
  ...(token ? { token } : {}),
});
