'use client';
import * as React from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import theme from './ThemeRegistry/theme';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function ModelCard({
  heading,
  text,
}: {
  heading: string;
  text: string;
}) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        backgroundColor: grey[50],
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
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {text}
      </Typography>
    </Box>
  );
}
