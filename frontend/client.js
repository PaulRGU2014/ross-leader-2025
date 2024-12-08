import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'hvv30l4k',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-03-25', // Update to the latest API version
  useCdn: true, // Enable CDN caching
});

export default client;