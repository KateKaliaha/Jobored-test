import { MantineProvider } from '@mantine/core';
import { useEffect } from 'react';

import { AppRouter } from './components/Router';
import { CustomFonts } from './CustomFonts';
import { useAppDispatch, useAppSelector } from './store';
import { fetchAuth } from './store/authSlice';
import { fetchIndustriesCatalog } from './store/industriesSlice';
import { fetchVacanciesCatalog } from './store/vacanciesSlice';

function App() {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { payment_from, catalogueKey, payment_to, page, keyword } = useAppSelector(
    (state) => state.mainPage,
  );
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth) {
      dispatch(fetchAuth());
    }
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchIndustriesCatalog({ token }));
      dispatch(
        fetchVacanciesCatalog({
          token,
          page: page - 1,
          keyword,
          payment_from,
          payment_to,
          catalogueKey,
        }),
      );
    }
  }, [token]);

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
            blackVariants: ['#232134', '#343A40', '#202021'],
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

addEventListener('unload', () => {
  localStorage.delete('auth');
});
