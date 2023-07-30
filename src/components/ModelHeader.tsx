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
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        <Typography variant="h6">{numberOfModels}</Typography>
        {/* TODO: Switch to Autocomplete after backend is setup: */}
        <TextField></TextField>
      </Box>
      <Box>
        <Select
          value={filterMode}
          onChange={(e: SelectChangeEvent) => {
            setFilterMode(e.target.value);
          }}
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
