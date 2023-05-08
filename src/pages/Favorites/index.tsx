import { Container, createStyles, Pagination, rem, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { NoContent } from '../../components/NoContent';
import { VacanciesList } from '../../components/VacanciesList';
import { useAppDispatch, useAppSelector } from '../../store';
import { getFavCardsForPage } from '../../store/favoritesSlice';
import { getTotalPages } from '../Main/helpers';

type TypeHandleChangePage = (page: number) => void;

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: rem(40),
  },

  control: {
    fontWeight: 400,
    fontSize: theme.fontSizes.sm,
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

export const Favorites = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { lisFavorites, cardsFavPerPage } = useAppSelector((state) => state.favorites);
  const [page, setPage] = useState(1);
  const pages = getTotalPages(lisFavorites.length);
  const largeScreen = useMediaQuery('(min-width: 767px)');

  const handleChangePage: TypeHandleChangePage = (page) => {
    setPage(page);
    dispatch(getFavCardsForPage(page));
  };

  if (cardsFavPerPage.length === 0 && page !== 1) {
    handleChangePage(page - 1);
  }

  useEffect(() => {
    dispatch(getFavCardsForPage(page));
  }, [lisFavorites]);

  return (
    <Container size={largeScreen ? 'md' : 'sm'} px={15} className={classes.wrapper}>
      <Stack spacing={15} mih={600}>
        {!!cardsFavPerPage.length && <VacanciesList list={cardsFavPerPage} />}
        {!lisFavorites.length && <NoContent message="Упс, здесь еще ничего нет!" />}
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
        mt={100}
        pb={44}
        spacing={8}
        position="center"
      />
    </Container>
  );
};
