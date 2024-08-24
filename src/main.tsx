import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LetterStatusProvider } from './providers/letter_status_context_provider.tsx';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LetterStatusProvider>
      <App />
    </LetterStatusProvider>
  </StrictMode >
);
