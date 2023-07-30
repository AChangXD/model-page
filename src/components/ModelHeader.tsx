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
import React, { useState } from 'react';
import { SORT_OPTIONS } from './ModelOverview';

export default function ModelHeader({
  numberOfModels,
  sortMode,
  setSortMode,
  searchInput,
  setSearchInput,
}: {
  numberOfModels: number;
  sortMode: string;
  setSortMode: (mode: string) => void;
  searchInput: string;
  setSearchInput: (mode: string) => void;
}) {
  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */

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
      <TextField
        placeholder="Filter By Name"
        value={searchInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchInput(e.target.value);
        }}
      ></TextField>
      <Box>
        <Select
          value={sortMode}
          onChange={(e: SelectChangeEvent) => {
            setSortMode(e.target.value);
          }}
          sx={{ width: '100%' }}
        >
          {SORT_OPTIONS.map((option: string, index: number) => {
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
