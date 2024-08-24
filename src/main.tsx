import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LetterStatusProvider } from './providers/letter_status_provider.tsx';
import React from 'react';
import { WordListProvider } from './providers/words_list_provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LetterStatusProvider>
      <WordListProvider>
        <App />
      </WordListProvider>
    </LetterStatusProvider>
  </StrictMode >
);
