import { Button, createStyles, rem, TextInput, TextInputProps } from '@mantine/core';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

import { useAppDispatch, useAppSelector } from '../../../store';
import {
  changeKeyword,
  changePage,
  fetchVacanciesCatalog,
} from '../../../store/vacanciesSlice';
import { fonts } from '../../../utils/fontVariants';

const useStyles = createStyles((theme) => ({
  input: {
    height: rem(48),
    fontFamily: fonts.inter400,
    fontSize: rem(14),
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

export const SearchInput = (props: TextInputProps) => {
  const { classes } = useStyles();
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const { token, payment_from, payment_to, catalogueKey } = useAppSelector(
    (store) => store.vacancies,
  );

  const handleClick = () => {
    dispatch(
      fetchVacanciesCatalog({
        token: token as string,
        page: 0,
        keyword: value,
        payment_from: payment_from,
        payment_to: payment_to,
        catalogueKey: catalogueKey,
      }),
    );
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
      mb={rem(16)}
      rightSection={
        <Button
          size="xs"
          className={classes.searchBtn}
          radius="md"
          w={83}
          h={32}
          onClick={handleClick}
        >
          Поиск
        </Button>
      }
      placeholder="Введите название вакансии"
      rightSectionWidth={83}
      {...props}
    />
  );
};
