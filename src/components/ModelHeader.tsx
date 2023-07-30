'use client';

import React, { SetStateAction, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ClearIcon from '@mui/icons-material/Clear';
import { SORT_OPTIONS } from './ModelOverview';

export default function ModelHeader({
  numberOfModels,
  sortMode,
  setSortMode,
  searchInput,
  setSearchInput,
  leftFilterPermanentMode,
  setDisplayFilterDrawer,
}: {
  numberOfModels: number;
  sortMode: string;
  setSortMode: React.Dispatch<SetStateAction<string>>;
  searchInput: string;
  setSearchInput: React.Dispatch<SetStateAction<string>>;
  leftFilterPermanentMode: boolean;
  setDisplayFilterDrawer: React.Dispatch<SetStateAction<boolean>>;
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
        sx={{ minWidth: { xs: 0, md: 500 } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchInput !== '' && (
                <IconButton
                  onClick={() => {
                    setSearchInput('');
                  }}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      ></TextField>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        <Select
          value={sortMode}
          onChange={(e: SelectChangeEvent) => {
            setSortMode(e.target.value);
          }}
          sx={{ width: '100%' }}
          startAdornment={<SortIcon />}
        >
          {SORT_OPTIONS.map((option: string) => {
            return (
              <MenuItem
                value={option}
                key={'option' + option}
              >
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      {!leftFilterPermanentMode && (
        <Button
          variant="contained"
          onClick={() => {
            setDisplayFilterDrawer(true);
          }}
        >
          Show Filters
        </Button>
      )}
    </Box>
  );
}
