'use client';
import {
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { SetStateAction, useEffect, useState } from 'react';
import { findBestMatch } from 'string-similarity';

export const LEFT_FILTER_WIDTH = 500;

export default function CategoryFilter({
  permanentMode,
  categories,
  displayFilterDrawer,
  setDisplayFilterDrawer,
  selectedCategory,
  setSelectedCategory,
}: {
  permanentMode: boolean;
  categories: string[];
  displayFilterDrawer: boolean;
  setDisplayFilterDrawer: React.Dispatch<SetStateAction<boolean>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<SetStateAction<string>>;
}) {
  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */
  const [searchInput, setSearchInput] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  /* -------------------------------------------------------------------------- */
  /*                                   Effects                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    // 1. If searchInput is empty, set filteredModelData to modelData.
    if (searchInput === '') {
      setFilteredCategories(categories);
    }
    // 2. Filter based on text input:
    else {
      let filteredResults: string[] = [];
      // Use string similarity to sort:
      const matchingResult = findBestMatch(searchInput, categories);

      // Sort based on the rating of each match:
      let preSortedArray = [...matchingResult.ratings];

      const sortedRatings = preSortedArray.sort((a, b) => {
        return b.rating - a.rating;
      });

      sortedRatings.forEach((result) => {
        if (result.rating > 0.3) {
          filteredResults.push(result.target);
        }
      });

      setFilteredCategories(filteredResults);
    }
  }, [searchInput, categories]);

  /* -------------------------------------------------------------------------- */
  /*                                 JSX Return                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <Drawer
      anchor="left"
      variant={permanentMode ? 'permanent' : 'temporary'}
      open={permanentMode ? true : displayFilterDrawer}
      onClose={() => {
        setDisplayFilterDrawer(false);
      }}
      PaperProps={{
        sx: {
          width: permanentMode ? LEFT_FILTER_WIDTH : '100%',
          backgroundColor: 'neutral.900',
          height: '100%',
          mt: ['48px', '56px', '64px'],
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 1,
          alignItems: 'center',
        }}
      >
        {!permanentMode && (
          <Button
            onClick={() => {
              setDisplayFilterDrawer(false);
            }}
            sx={{ mt: 2, width: '25%' }}
          >
            Exit
          </Button>
        )}
        <TextField
          placeholder="Filter Categories By Name"
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchInput(e.target.value);
          }}
          sx={{ width: '100%', padding: 3 }}
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
        {selectedCategory !== '' && (
          <Button
            color="error"
            onClick={() => {
              setSelectedCategory('');
            }}
            variant="contained"
            sx={{ mb: 4, width: '85%' }}
          >
            Clear
          </Button>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            width: '100%',
            paddingX: 3,
          }}
        >
          {filteredCategories.map((category) => {
            return (
              <Chip
                label={category}
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                }}
                color={selectedCategory === category ? 'primary' : 'default'}
              />
            );
          })}
        </Box>
      </Box>
    </Drawer>
  );
}
