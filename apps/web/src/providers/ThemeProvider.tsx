import { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';

import 'dayjs/locale/en';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider>
      <DatesProvider settings={{ locale: 'en' }}>{children}</DatesProvider>
    </MantineProvider>
  );
};

export default ThemeProvider;
