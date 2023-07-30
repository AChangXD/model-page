import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import ModelCard from '@/components/ModelCard';

import AddButton from '@/components/SearchBar';
import { headers } from 'next/headers';
import ModelHeader from '@/components/ModelHeader';

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

  console.log(resBody.data);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <ModelHeader numberOfModels={255555} />

      {/* List of models */}

      <ModelCard
        heading="test"
        text="abcd"
      />
    </Box>
  );
}
