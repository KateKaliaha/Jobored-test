import {
  Box,
  createStyles,
  Group,
  Loader,
  Overlay,
  Pagination,
  rem,
} from '@mantine/core';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchIndustriesCatalog } from '../../store/industriesSlice';
import { fetchAuth, fetchVacanciesCatalog } from '../../store/vacanciesSlice';
import { Form } from './components/Form';
import { ProfessionCard } from './components/ProfessionCard';
import { SearchInput } from './components/SearchInput';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingLeft: rem(15),
    paddingRight: rem(15),
    paddingTop: rem(40),
    maxWidth: rem(1146),
    margin: '0 auto',
    display: 'flex',
    gap: rem(28),
  },

  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  control: {
    fontWeight: 400,
    fontSize: rem(16),
    lineHeight: '140%',
    ':not([data-disabled]):hover': {
      backgroundColor: theme.colors.blueVariants[3],
    },
    '&[data-active]': {
      '&, &:not([data-disabled]):hover': {
        backgroundColor: theme.colors.blueVariants[0],
      },
    },
  },
}));

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const { token, listVacancies, loader } = useAppSelector((state) => state.vacancies);

  const { classes } = useStyles();

  const [activePage, setPage] = useState(1);

  const handleChangePage = (page: number) => {
    setPage(page);
    dispatch(
      fetchVacanciesCatalog({
        token: token as string,
        page: page - 1,
        keyword: '',
        payment_from: '',
        payment_to: '',
        catalogues: '',
      }),
    );
  };

  useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchIndustriesCatalog());
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(
        fetchVacanciesCatalog({
          token: token,
          page: 0,
          keyword: '',
          payment_from: '',
          payment_to: '',
          catalogues: '',
        }),
      );
    }
  }, [token]);

  return (
    <Box className={classes.wrapper} component="section">
      <Form />
      <Box className={classes.contentWrapper}>
        <SearchInput />
        {loader && (
          <Overlay color="#202021" opacity={0.2} center>
            <Loader size="xl" color="#5E96FC" />
          </Overlay>
        )}
        <Group spacing={16} h={600}>
          <>
            {listVacancies &&
              listVacancies.length > 0 &&
              listVacancies.map((item) => <ProfessionCard key={item.id} item={item} />)}
          </>
        </Group>
        <Pagination
          value={activePage}
          onChange={handleChangePage}
          classNames={{
            control: classes.control,
          }}
          total={3}
          siblings={3}
          defaultValue={1}
          mt={40}
          spacing={8}
          style={{ alignSelf: 'center' }}
        />
      </Box>
    </Box>
  );
};
