import { createStyles, Group, rem, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC } from 'react';

import { ShortVacancyCardProps } from '../../models';
import { getSalaryText } from '../../pages/Main/helpers';
import { fonts } from '../../utils/fontVariants';

const useStyles = createStyles((theme) => ({
  salary: {
    color: theme.colors.blackVariants[0],
    lineHeight: rem(20),
  },

  salary_md: {
    fontFamily: fonts.inter600,
    fontSize: rem(16),
  },

  salary_lg: {
    fontFamily: fonts.inter700,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(16),
    },
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
}));

type CardConditionalsProps = Omit<ShortVacancyCardProps, 'space' | 'order'>;

export const CardConditionals: FC<CardConditionalsProps> = ({ item, size }) => {
  const { classes, cx } = useStyles();
  const { payment_to, type_of_work, currency, payment_from } = item;
  const text = getSalaryText(payment_from, payment_to, currency);
  const largeScreen = useMediaQuery('(min-width: 767px)');

  return (
    <Group spacing={rem(12.5)}>
      <Text
        size={largeScreen ? 'md' : 'sm'}
        className={cx(
          classes.salary,
          { [classes.salary_md]: size === 'md' },
          { [classes.salary_lg]: size === 'lg' },
        )}
      >
        {text}
      </Text>
      <Text size={largeScreen ? 'md' : 'sm'} className={classes.dot}>
        •
      </Text>
      <Text size="sm" className={classes.info}>
        {type_of_work.title}
      </Text>
    </Group>
  );
};
