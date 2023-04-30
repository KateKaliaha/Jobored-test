import { AppShell, createStyles } from '@mantine/core';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { links } from '../App';
import { MainPage } from '../pages/main';
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
        header={<HeaderResponsive links={links} />}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<h1>item page</h1>} />
          <Route path="/fav" element={<h1>fav</h1>} />
        </Routes>
      </AppShell>
    </Router>
  );
};
