import { Container, createStyles, Flex, Pagination, rem, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

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
    paddingTop: rem(40),
    display: 'flex',
    gap: rem(28),

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
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
  const { listVacancies, total } = useAppSelector((state) => state.vacancies);
  const { keyword, catalogueKey, payment_from, payment_to, page } = useAppSelector(
    (store) => store.mainPage,
  );
  const token = useAppSelector((state) => state.auth.token);
  const pages = getTotalPages(total);
  const largeScreen = useMediaQuery('(min-width: 767px)');

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
    <Container size={largeScreen ? 'xl' : 'sm'} px={rem(15)} className={classes.wrapper}>
      <Form />
      <Flex direction="column" sx={{ flex: 1 }}>
        <SearchInput />
        <Stack mih={600} spacing={15} w="100%">
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
          siblings={1}
          defaultValue={1}
          mt={35}
          pb={44}
          spacing={8}
          style={{ alignSelf: 'center' }}
        />
      </Flex>
    </Container>
  );
};
