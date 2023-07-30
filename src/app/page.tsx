import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ModelCard from '@/components/ModelCard';
import { Button } from '@mui/material';
import AddButton from '@/components/SearchBar';
import { headers } from 'next/headers';

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

  // const res = await fetch('/api/model-info', { method: 'GET' });
  console.log(resBody);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box>
        <Typography>Test</Typography>
      </Box>
      <Grid
        container
        spacing={2}
      >
        <Grid
          xs={12}
          md={6}
          lg={4}
          sx={{ width: '100%' }}
        >
          <ModelCard
            heading="test"
            text="abcd"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
