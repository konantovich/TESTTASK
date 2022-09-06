import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import './index.css';
import App from './App';
import {theme} from './theme'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
      <App />
  </ThemeProvider>
);
