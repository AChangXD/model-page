import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Button } from '@mui/material';

export const metadata = {
  title: 'Fireworks AI Model Explorer',
  description: 'Fireworks AI Model Explorer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar
            position="fixed"
            sx={{ zIndex: 2000 }}
          >
            <Toolbar sx={{ backgroundColor: 'background.paper' }}>
              <Button
                href="/"
                LinkComponent={Link}
              >
                <CelebrationIcon
                  sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }}
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  color="black"
                >
                  Fireworks AI
                </Typography>
              </Button>
            </Toolbar>
          </AppBar>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              mt: ['48px', '56px', '64px'],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
