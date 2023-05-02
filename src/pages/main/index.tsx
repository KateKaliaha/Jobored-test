import { Box, createStyles, Loader, Overlay, Pagination, rem } from '@mantine/core';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchIndustriesCatalog } from '../../store/industriesSlice';
import { changePage, fetchAuth, fetchVacanciesCatalog } from '../../store/vacanciesSlice';
import { Form } from './components/Form';
import { ProfessionCard } from './components/ProfessionCard';
import { SearchInput } from './components/SearchInput';
import { getTotalPages } from './helpers';

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

  const {
    token,
    listVacancies,
    loader,
    total,
    payment_from,
    catalogueKey,
    payment_to,
    page,
    keyword,
  } = useAppSelector((state) => state.vacancies);

  const { classes } = useStyles();

  const pages = getTotalPages(total);

  const handleChangePage = (page: number) => {
    dispatch(changePage(page));
    dispatch(
      fetchVacanciesCatalog({
        token: token as string,
        page: page - 1,
        keyword: keyword,
        payment_from: payment_from,
        payment_to: payment_to,
        catalogueKey: catalogueKey,
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
          page: page - 1,
          keyword: '',
          payment_from: null,
          payment_to: null,
          catalogueKey: null,
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
        <Box
          style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 600 }}
        >
          {listVacancies &&
            listVacancies.length > 0 &&
            listVacancies.map((item) => <ProfessionCard key={item.id} item={item} />)}
        </Box>
        <Pagination
          value={page}
          onChange={handleChangePage}
          classNames={{
            control: classes.control,
          }}
          total={pages}
          siblings={3}
          defaultValue={1}
          mt={35}
          pb={44}
          spacing={8}
          style={{ alignSelf: 'center' }}
        />
      </Box>
    </Box>
  );
};
