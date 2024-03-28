'use client';

import React, {
  FC,
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

type ContextType = {
  showSnackbar: (message: string, severity: AlertColor) => void;
};

// Create Snackbar Context
export const SnackbarContext = createContext<ContextType>({
  showSnackbar: (...args) => null,
});

// Snackbar Provider Component
export const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>('success');

  // Function to display a snackbar
  const showSnackbar = (message: string, severity: AlertColor = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Function to close the snackbar
  const handleCloseSnackbar = (e: any) => {
    setSnackbarOpen(false);
  };
  const memoizedValue = useMemo(() => ({ showSnackbar }), []);

  return (
    <SnackbarContext.Provider value={memoizedValue}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
