'use client';

import { ModelData } from '@/app/api/types';
import {
  Box,
  Button,
  Divider,
  Input,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const TAB_OPTIONS = ['Files'];

export default function ModelDetails({ model }: { model: ModelData }) {
  /* -------------------------------------------------------------------------- */
  /*                                NextJS Router                               */
  /* -------------------------------------------------------------------------- */
  const nextRouter = useRouter();

  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */
  const [selectedTab, setSelectedTab] = useState(TAB_OPTIONS[0]);

  /* -------------------------------------------------------------------------- */
  /*                                   Effects                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                 JSX Return                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={(event: React.SyntheticEvent, newValue: string) => {
          setSelectedTab(newValue);
        }}
      >
        {TAB_OPTIONS.map((option) => {
          return (
            <Tab
              label={option}
              value={option}
              key={option}
            />
          );
        })}
      </Tabs>

      {/* File/File upload section: */}
      {selectedTab === 'Files' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'flex-start',
          }}
        >
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                const fileInput = e.target;

                if (!fileInput.files) {
                  console.warn('no file was chosen');
                  return;
                }

                if (!fileInput.files || fileInput.files.length === 0) {
                  console.warn('files list is empty');
                  return;
                }

                const file = fileInput.files[0];

                const formData = new FormData();
                formData.append('file', file);
                formData.append('modelName', model.name);
                formData.append('name', file.name);

                try {
                  const res = await fetch(
                    `${window.location.origin}/api/model`,
                    {
                      method: 'POST',
                      body: formData,
                    }
                  );

                  if (!res.ok) {
                    console.error('something went wrong, check your console.');
                    return;
                  }
                  nextRouter.refresh();
                } catch (error) {
                  console.error('something went wrong, check your console.');
                }

                /** Reset file input */
                e.target.type = 'text';
                e.target.type = 'file';
              }}
            />
          </Button>
          <Divider />
          <Typography>Existing Files</Typography>
          <Box
            sx={{
              width: '100%',
              height: 600,
            }}
          >
            <DataGrid
              columns={[
                { field: 'name', headerName: 'Name', width: 200 },
                {
                  field: 'uploadDate',
                  headerName: 'Upload Date',
                  width: 300,
                  type: 'dateTime',
                  valueGetter: (params) => {
                    return new Date(params.row.uploadDate);
                  },
                },
                {
                  field: 'version',
                  headerName: 'Version',
                  width: 150,
                },
              ]}
              rows={model.files ? model.files : []}
              // autoHeight
              getRowId={(row) => row.uploadDate + row.version}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
