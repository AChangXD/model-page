'use client';
import * as React from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import CategoryIcon from '@mui/icons-material/Category';
import theme from './ThemeRegistry/theme';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { breakdownTime } from './helper/time-helper';

export default function ModelCard({
  heading,
  category,
  uploadDate,
  downloads,
  likes,
}: {
  heading: string;
  category: string;
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
        backgroundColor: grey[50],
        borderRadius: 2,
        padding: 2,
        '&:hover': {
          backgroundColor: grey[100],
          cursor: 'pointer',
          '& .heading': {
            color: theme.palette.primary.light,
          },
        },
      }}
    >
      <Typography
        gutterBottom
        variant="h5"
        className="heading"
      >
        {heading}
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
      </Box>
    </Box>
  );
}
