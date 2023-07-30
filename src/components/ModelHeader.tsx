'use client';

import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const FILTER_OPTIONS = ['Ascending', 'Descending', 'Likes'];

export default function ModelHeader({
  numberOfModels,
}: {
  numberOfModels: number;
}) {
  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */
  const [filterMode, setFilterMode] = useState(FILTER_OPTIONS[0]);

  /* -------------------------------------------------------------------------- */
  /*                                 JSX Return                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        gap: 2,
        mt: 1,
        mb: 2,
      }}
    >
      <Box
        sx={{
          wxidth: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Models
        </Typography>
        <Typography
          variant="h6"
          color={'text.secondary'}
        >
          {numberOfModels}
        </Typography>
      </Box>
      {/* Filter the list of available cards: */}
      <TextField placeholder="Filter By Name"></TextField>
      <Box>
        <Select
          value={filterMode}
          onChange={(e: SelectChangeEvent) => {
            setFilterMode(e.target.value);
          }}
          sx={{ width: '100%' }}
        >
          {FILTER_OPTIONS.map((option: string, index: number) => {
            return (
              <MenuItem
                value={option}
                key={index + 'option'}
              >
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
    </Box>
  );
}
