import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2024-01-01';
const token = import.meta.env.VITE_SANITY_TOKEN;

if (!projectId || !dataset) {
  console.warn('Sanity: VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET must be set in .env');
}

export const sanityClient = createClient({
  projectId: projectId ?? '',
  dataset: dataset ?? 'production',
  useCdn: true,
  apiVersion,
  ...(token ? { token } : {}),
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
