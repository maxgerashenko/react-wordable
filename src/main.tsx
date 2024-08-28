import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LetterStatusProvider } from './providers/letter_status_provider.tsx';
import React from 'react';
import { WordListProvider } from './providers/words_list_provider.tsx';
import { ActiveIndexProvider } from './providers/active_index_provider.tsx';
import { WordsStatesProvider } from './providers/words_states_provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LetterStatusProvider>
      <WordsStatesProvider>
        <WordListProvider>
          <ActiveIndexProvider>
            <App />
          </ActiveIndexProvider>
        </WordListProvider>
      </WordsStatesProvider>
    </LetterStatusProvider>
  </StrictMode >
);
