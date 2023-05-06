import { AppShell, createStyles } from '@mantine/core';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { Favorites as FavoritesPage } from '../pages/Favorites';
import { Main as MainPage } from '../pages/Main';
import { Vacancy as VacancyPage } from '../pages/Vacancy';
import { HeaderResponsive } from './Header';

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.colors.whiteVariants[0],
    padding: 0,
    minHeight: 'calc(100vh - 84px)',
  },
}));

export const AppRouter = () => {
  const { classes } = useStyles();

  return (
    <Router>
      <AppShell
        classNames={{
          main: classes.main,
        }}
        header={<HeaderResponsive />}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<VacancyPage />} />
          <Route path="/fav" element={<FavoritesPage />} />
        </Routes>
      </AppShell>
    </Router>
  );
};
