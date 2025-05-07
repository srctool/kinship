import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/en';

import Provider from './providers';

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider />
    </StrictMode>
  );
}
