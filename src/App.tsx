import { MantineProvider } from '@mantine/core';

import { AppRouter } from './components/Router';
import { CustomFonts } from './CustomFonts';

export const links = [
  { link: '/', label: 'Поиск Вакансий' },
  { link: '/fav', label: 'Избранное' },
];

function App() {
  return (
    <>
      <CustomFonts />
      <MantineProvider
        theme={{
          globalStyles: () => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
            },
          }),
          colors: {
            blueVariants: ['#5E96FC', '#92C1FF', '#3B7CD3', '#DEECFF'],
            grayVariants: ['#ACADB9', '#D5D6DC', '#7B7C88'],
            whiteVariants: ['#F7F7F8', '#FFFFFF', '#EAEBED'],
            blackVariants: ['#232134'],
          },
          fontSizes: {
            xs: '0.875rem',
            sm: '1rem',
            md: '1.25rem',
            lg: '1.5rem',
            xl: '1.75rem',
          },
        }}
        withNormalizeCSS
        withGlobalStyles
      >
        <AppRouter />
      </MantineProvider>
    </>
  );
}

export default App;
