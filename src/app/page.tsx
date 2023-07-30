import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import ModelCard from '@/components/ModelCard';

import AddButton from '@/components/SearchBar';
import { headers } from 'next/headers';
import ModelHeader from '@/components/ModelHeader';
import { ModelData } from './api/types';

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

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <ModelHeader numberOfModels={255555} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* List of models */}
        {modelData.map((model: ModelData, index: number) => {
          return (
            <ModelCard
              heading={model.name}
              category={model.category}
              uploadDate={model.uploadDate}
              downloads={model.downloads}
              likes={model.likes}
              key={index + 'modelCard'}
            />
          );
        })}
      </Box>
    </Box>
  );
}
