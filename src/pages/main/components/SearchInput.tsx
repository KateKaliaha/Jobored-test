import { Button, createStyles, rem, TextInput } from '@mantine/core';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

import { useAppDispatch, useAppSelector } from '../../../store';
import { changeKeyword, changePage } from '../../../store/mainPageSlice';
import { fetchVacanciesCatalog } from '../../../store/vacanciesSlice';
import { fonts } from '../../../utils/fontVariants';

const useStyles = createStyles((theme) => ({
  input: {
    height: rem(48),
    fontFamily: fonts.inter400,
    fontSize: theme.fontSizes.xs,
    lineHeight: rem(21),
    border: `1px solid ${theme.colors.whiteVariants[2]}`,
    '&[data-with-icon]': {
      paddingLeft: rem(35.6),
    },
    paddingRight: rem(100),
    color: theme.colors.blackVariants[0],
    caretColor: theme.colors.blueVariants[0],
    '&:focus': {
      borderColor: theme.colors.blueVariants[0],
    },
    '&:hover': {
      borderColor: theme.colors.blueVariants[0],
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  icon: {
    zIndex: 0,
  },

  rightSection: {
    right: rem(12),
  },

  searchBtn: {
    fontFamily: fonts.inter500,
    lineHeight: rem(21),
    fontWeight: 500,
    border: 'none',
    backgroundColor: theme.colors.blueVariants[0],
    '&:hover': { background: theme.colors.blueVariants[1] },
    '&:active': { background: theme.colors.blueVariants[2] },
  },
}));

export const SearchInput = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { payment_from, payment_to, catalogueKey, keyword } = useAppSelector(
    (store) => store.mainPage,
  );
  const token = useAppSelector((state) => state.auth.token);
  const [value, setValue] = useState(keyword ? keyword : '');

  const handleClick = () => {
    if (token) {
      dispatch(
        fetchVacanciesCatalog({
          token,
          page: 0,
          keyword: value,
          payment_from,
          payment_to,
          catalogueKey,
        }),
      );
    }

    dispatch(changeKeyword(value));
    dispatch(changePage(1));
  };

  return (
    <TextInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      classNames={{
        input: classes.input,
        icon: classes.icon,
        rightSection: classes.rightSection,
      }}
      icon={<BiSearch size="19" style={{ marginTop: 1 }} />}
      radius="md"
      size="md"
      data-elem="search-input"
      mb={rem(16)}
      rightSection={
        <Button
          size="xs"
          className={classes.searchBtn}
          radius="md"
          w={83}
          h={32}
          data-elem="search-button"
          onClick={handleClick}
        >
          Поиск
        </Button>
      }
      placeholder="Введите название вакансии"
      rightSectionWidth={83}
    />
  );
};
