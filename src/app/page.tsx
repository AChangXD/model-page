import * as React from 'react';
import Box from '@mui/material/Box';

import { headers } from 'next/headers';
import { ModelData } from './api/types';
import ModelOverview from '@/components/ModelOverview';

export default async function HomePage() {
  // Fetch all model information on the server:
  const headersData = headers();
  const protocol = headersData.get('x-forwarded-proto');
  const host = headersData.get('host');
  const res = await fetch(`${protocol}://${host}/api/model`, {
    method: 'GET',
    cache: 'no-store',
  });
  const resBody = await res.json();

  const modelData = resBody.data;

  return <ModelOverview modelData={modelData} />;
}
