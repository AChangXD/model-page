'use client';
import * as React from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import CategoryIcon from '@mui/icons-material/Category';
import theme from './ThemeRegistry/theme';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { breakdownTime } from './helper/time-helper';
import { useRouter } from 'next/navigation';

export default function ModelCard({
  name,
  category,
  description,
  version,
  uploadDate,
  downloads,
  likes,
}: {
  name: string;
  category: string;
  description: string;
  version: string;
  uploadDate: Date | string;
  downloads: number;
  likes: number;
}) {
  /* -------------------------------------------------------------------------- */
  /*                               Calculate time                               */
  /* -------------------------------------------------------------------------- */
  const timeLeft = breakdownTime(
    new Date().getTime() - new Date(uploadDate).getTime()
  );

  /* -------------------------------------------------------------------------- */
  /*                                 JSX Return                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      <Typography
        gutterBottom
        variant="h5"
        className="name"
      >
        {name}
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ mb: 1 }}
      >
        {description}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ display: { xs: 'block', md: 'none' }, mb: { xs: 1, md: 0 } }}
      >
        Version: {version}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          overflow: 'auto',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <CategoryIcon sx={{ color: 'text.secondary', fontSize: '120%' }} />

          <Typography color="text.secondary">{category}</Typography>
        </Box>

        <Typography color="text.secondary">
          Uploaded {timeLeft.days} days ago
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <DownloadIcon sx={{ color: 'text.secondary', fontSize: '120%' }} />
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {downloads}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <FavoriteBorderIcon
            sx={{ color: 'text.secondary', fontSize: '120%' }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {likes}
          </Typography>
        </Box>

        <Typography
          color="text.secondary"
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          Version: {version}
        </Typography>
      </Box>
    </Box>
  );
}
