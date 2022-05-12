import React from 'react';
// @ts-ignore
import { createRoot } from 'react-dom18/client';
import { App } from './app-components/App';
import '@styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root') as HTMLElement;

  const root = createRoot(container);

  root.render(<App />);
});
