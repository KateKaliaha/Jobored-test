import { Card, createStyles, Group, rem, Text, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { Vacancy } from '../../../models';
import { fonts } from '../../../utils/fontVariants';
import { getSalaryText } from '../helpers';

const useStyles = createStyles((theme) => ({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // gap: rem(13),
  },

  cardTitle: {
    fontFamily: fonts.inter600,
    color: theme.colors.blueVariants[0],
    lineHeight: rem(24),
    margin: 0,
    maxWidth: rem(680),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  salary: {
    fontFamily: fonts.inter600,
    color: theme.colors.blackVariants[0],
    lineHeight: rem(20),
  },

  dot: {
    fontFamily: fonts.poppins400,
    color: theme.colors.grayVariants[2],
    lineHeight: rem(21),
  },

  info: {
    fontFamily: fonts.inter400,
    color: theme.colors.blackVariants[0],
    lineHeight: rem(19),
  },

  star: {
    cursor: 'pointer',
    '&:hover': {
      stroke: theme.colors.blueVariants[0],
    },
  },
}));

export const ProfessionCard = (props: { item: Vacancy }) => {
  const { classes } = useStyles();
  const { colors } = useMantineTheme();
  const { profession, payment_to, type_of_work, town, currency, payment_from } =
    props.item;

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavoriteStatus = () => {
    setIsFavorite(!isFavorite);
  };

  const text = getSalaryText(payment_from, payment_to, currency);

  return (
    <Card className={classes.card} padding="23px 25px 24px 24px" radius="md" withBorder>
      <Group position="apart" mb={13}>
        <Text size="md" className={classes.cardTitle}>
          {profession}
        </Text>
        <svg
          className={classes.star}
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill={isFavorite ? colors.blueVariants[0] : 'none'}
          xmlns="http://www.w3.org/2000/svg"
          stroke={isFavorite ? colors.blueVariants[0] : colors.grayVariants[0]}
          strokeWidth="1.5"
          onClick={toggleFavoriteStatus}
        >
          <path d="M9.97183 1.70846C10.4382 0.933481 11.5618 0.933482 12.0282 1.70847L14.3586 5.58087C14.5262 5.85928 14.7995 6.05784 15.116 6.13116L19.5191 7.15091C20.4002 7.35499 20.7474 8.42356 20.1545 9.10661L17.1918 12.5196C16.9788 12.765 16.8744 13.0863 16.9025 13.41L17.2932 17.9127C17.3714 18.8138 16.4625 19.4742 15.6296 19.1214L11.4681 17.3583C11.1689 17.2316 10.8311 17.2316 10.5319 17.3583L6.37038 19.1214C5.53754 19.4742 4.62856 18.8138 4.70677 17.9127L5.09754 13.41C5.12563 13.0863 5.02124 12.765 4.80823 12.5196L1.8455 9.1066C1.25257 8.42356 1.59977 7.35499 2.48095 7.15091L6.88397 6.13116C7.20053 6.05784 7.47383 5.85928 7.64138 5.58087L9.97183 1.70846Z" />
        </svg>
      </Group>
      <Group spacing={rem(12.5)} mb={10}>
        <Text size="sm" className={classes.salary}>
          {text}
        </Text>
        <Text size="md" className={classes.dot}>
          •
        </Text>
        <Text size="sm" className={classes.info}>
          {type_of_work.title}
        </Text>
      </Group>
      <Group spacing={rem(8)}>
        <HiOutlineLocationMarker size={21} color={colors.grayVariants[0]} />
        <Text size="sm" className={classes.info}>
          {town.title}
        </Text>
      </Group>
    </Card>
  );
};
