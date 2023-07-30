import { ModelData } from '@/app/api/types';
import ModelCard from '@/components/ModelCard';
import ModelDetails from '@/components/ModelDetails';
import { Box, Tabs, Typography } from '@mui/material';
import { headers } from 'next/headers';

/**
 * @author Mark Chang
 * @description React Server Component, responsible for displaying information on all of the models.
 */

export default async function ModelView({
  params,
}: {
  params: { name: string };
}) {
  const modelName = params.name;

  /*------------------------------------------------------------------------- */
  /*                               RSC Fetch Data                               */
  /* -------------------------------------------------------------------------- */
  // Fetch all model information on the server:
  const headersData = headers();
  const protocol = headersData.get('x-forwarded-proto');
  const host = headersData.get('host');
  const res = await fetch(`${protocol}://${host}/api/model?name=${modelName}`, {
    method: 'GET',
    cache: 'no-store',
  });
  const resBody = await res.json();

  const model: ModelData = resBody.model;

  if (!model) {
    return (
      <Box>
        <Typography>No Model Of Name {modelName} Found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <ModelCard
        name={model.name}
        category={model.category}
        description={model.description}
        version={model.version}
        uploadDate={model.uploadDate}
        downloads={model.downloads}
        likes={model.likes}
        key={model.name}
      />
      <ModelDetails model={model} />
    </Box>
  );
}
