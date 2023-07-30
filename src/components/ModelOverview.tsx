'use client';
import ModelHeader from './ModelHeader';
import ModelCard from './ModelCard';
import { Box } from '@mui/material';
import { ModelData } from '@/app/api/types';
import { useEffect, useState } from 'react';
import { findBestMatch } from 'string-similarity';

export const SORT_OPTIONS = ['Ascending', 'Descending', 'Likes'];

export default function ModelOverview({
  modelData,
}: {
  modelData: ModelData[];
}) {
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

  /* -------------------------------------------------------------------------- */
  /*                                   Effects                                  */
  /* -------------------------------------------------------------------------- */
  /* ------------------- Effect to filter the existing data ------------------- */
  useEffect(() => {
    // 1. If searchInput is empty, set filteredModelData to modelData.
    if (searchInput === '') {
      setFilteredModelData(modelData);
    }
    // 2. Filter based on text input:
    else {
      let filteredResults: ModelData[] = [];
      const modelNames = modelData.map((model) => {
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
          const match = modelData.find((model) => {
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
  }, [searchInput, modelData]);

  /* -------------------- Effect to sort the existing data -------------------- */
  useEffect(() => {
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
  console.log('RERENDER');
  console.log(sortedFilteredModelData);

  /* -------------------------------------------------------------------------- */
  /*                                 JSX Return                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <ModelHeader
        numberOfModels={modelData.length}
        sortMode={sortMode}
        setSortMode={setSortMode}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* List of models */}
        {sortedFilteredModelData.map((model: ModelData) => {
          console.log(model);

          return (
            <ModelCard
              heading={model.name}
              category={model.category}
              uploadDate={model.uploadDate}
              downloads={model.downloads}
              likes={model.likes}
              key={model.name}
            />
          );
        })}
      </Box>
    </Box>
  );
}
