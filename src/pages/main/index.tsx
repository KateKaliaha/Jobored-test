import { Box, createStyles, Pagination, rem, Stack } from '@mantine/core';

import { AppLoader } from '../../components/AppLoader';
import { VacanciesList } from '../../components/VacanciesList';
import { useAppDispatch, useAppSelector } from '../../store';
import { changePage } from '../../store/mainPageSlice';
import { fetchVacanciesCatalog } from '../../store/vacanciesSlice';
import { Form } from './components/Form';
import { SearchInput } from './components/SearchInput';
import { getTotalPages } from './helpers';

type TypeHandleChangePage = (page: number) => void;

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

export const Main = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { listVacancies, loader, total } = useAppSelector((state) => state.vacancies);
  const { keyword, catalogueKey, payment_from, payment_to, page } = useAppSelector(
    (store) => store.mainPage,
  );
  const token = useAppSelector((state) => state.auth.token);
  const pages = getTotalPages(total);

  const handleChangePage: TypeHandleChangePage = (page) => {
    dispatch(changePage(page));

    if (token) {
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
  };

  return (
    <Box className={classes.wrapper} component="section">
      <Form />
      <Box className={classes.contentWrapper}>
        <SearchInput />
        {loader && <AppLoader />}
        <Stack h={600} spacing={15}>
          {listVacancies && !!listVacancies.length && (
            <VacanciesList list={listVacancies} />
          )}
        </Stack>
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
