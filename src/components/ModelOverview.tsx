'use client';
import ModelHeader from './ModelHeader';
import ModelCard from './ModelCard';
import { Box, Theme, useMediaQuery } from '@mui/material';
import { ModelData } from '@/app/api/types';
import { useEffect, useState } from 'react';
import { findBestMatch } from 'string-similarity';
import CategoryFilter, { LEFT_FILTER_WIDTH } from './CategoryFilter';

export const SORT_OPTIONS = ['Ascending', 'Descending', 'Likes'];

export default function ModelOverview({
  modelData,
}: {
  modelData: ModelData[];
}) {
  // Used to determine whether the category filter should be in permanent mode or not
  const leftFilterPermanentMode = useMediaQuery(
    (theme: Theme) => theme.breakpoints.up('lg'),
    {
      defaultMatches: true,
      noSsr: false,
    }
  );
  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */
  /* ---------------------------- Filtering by name --------------------------- */
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredModelData, setFilteredModelData] = useState<ModelData[]>([]);
  /* --------------------------------- Sorting -------------------------------- */
  // Sort by Ascending/Descending/Likes
  const [sortMode, setSortMode] = useState<string>(SORT_OPTIONS[0]);
  const [sortedFilteredModelData, setSortedFilteredModelData] = useState<
    ModelData[]
  >([]);
  // Sorting by categories.
  const [categories, setCategories] = useState(
    modelData.reduce((accumulator: string[], currentValue: ModelData) => {
      if (accumulator.find((category) => category === currentValue.category)) {
        return accumulator;
      } else {
        return [currentValue.category, ...accumulator];
      }
    }, [] as string[])
  );
  const [selectedCategory, setSelectedCategory] = useState('');
  // Whether to display the filter Drawer or not:
  const [displayFilterDrawer, setDisplayFilterDrawer] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                   Effects                                  */
  /* -------------------------------------------------------------------------- */
  /* ------------------- Effect to filter the existing data ------------------- */
  useEffect(() => {
    // 1. If certain categories are selected, filter through them:
    let categoryFilteredResult: ModelData[] = [];
    if (selectedCategory) {
      categoryFilteredResult = modelData.reduce((accumulator, model) => {
        if (model.category === selectedCategory) {
          return [...accumulator, model];
        } else {
          return accumulator;
        }
      }, [] as ModelData[]);
    } else {
      categoryFilteredResult = modelData;
    }

    // 1. If searchInput is empty, set filteredModelData to categoryFilteredResult.
    if (searchInput === '') {
      setFilteredModelData(categoryFilteredResult);
    }
    // 2. Filter based on text input:
    else {
      let filteredResults: ModelData[] = [];
      const modelNames = categoryFilteredResult.map((model) => {
        return model.name;
      });
      // Use string similarity to sort:
      const matchingResult = findBestMatch(searchInput, modelNames);

      // Sort based on the rating of each match:
      let preSortedArray = [...matchingResult.ratings];

      const sortedRatings = preSortedArray.sort((a, b) => {
        return b.rating - a.rating;
      });

      sortedRatings.forEach((result) => {
        if (result.rating > 0.3) {
          const match = categoryFilteredResult.find((model) => {
            return model.name === result.target;
          });

          if (match) {
            filteredResults.push(match);
          }
        }
      });

      setFilteredModelData(filteredResults);
    }

    // Set the categories in case modelData changes:
    // !TEMPORARY
    // !Change this so this doesn't run everytime searchInput changes.
    setCategories(
      modelData.reduce((accumulator: string[], currentValue: ModelData) => {
        if (
          accumulator.find((category) => category === currentValue.category)
        ) {
          return accumulator;
        } else {
          return [currentValue.category, ...accumulator];
        }
      }, [] as string[])
    );
  }, [searchInput, selectedCategory, modelData]);

  /* -------------------- Effect to sort the existing data -------------------- */
  useEffect(() => {
    //
    let filteredModelDataCopy = JSON.parse(JSON.stringify(filteredModelData));
    if (sortMode === 'Ascending') {
      const ascOrder = filteredModelDataCopy.sort(
        (a: ModelData, b: ModelData) => {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        }
      );

      setSortedFilteredModelData(ascOrder);
    } else if (sortMode === 'Descending') {
      const descOrder = filteredModelDataCopy.sort(
        (a: ModelData, b: ModelData) => {
          if (a.name < b.name) {
            return 1;
          } else {
            return -1;
          }
        }
      );

      setSortedFilteredModelData(descOrder);
    } else {
      setSortedFilteredModelData(
        filteredModelDataCopy.sort((a: ModelData, b: ModelData) => {
          return b.likes - a.likes;
        })
      );
    }
  }, [sortMode, filteredModelData]);

  /* -------------------------------------------------------------------------- */
  /*                                 JSX Return                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
      <CategoryFilter
        permanentMode={leftFilterPermanentMode}
        categories={categories}
        displayFilterDrawer={displayFilterDrawer}
        setDisplayFilterDrawer={setDisplayFilterDrawer}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          paddingLeft: leftFilterPermanentMode ? LEFT_FILTER_WIDTH + 'px' : 0,
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <ModelHeader
          numberOfModels={modelData.length}
          sortMode={sortMode}
          setSortMode={setSortMode}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          leftFilterPermanentMode={leftFilterPermanentMode}
          setDisplayFilterDrawer={setDisplayFilterDrawer}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* List of models */}
          {sortedFilteredModelData.map((model: ModelData) => {
            return (
              <ModelCard
                heading={model.name}
                category={model.category}
                description={model.description}
                version={model.version}
                uploadDate={model.uploadDate}
                downloads={model.downloads}
                likes={model.likes}
                key={model.name}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
