import { createStyles, Group, rem, Title } from '@mantine/core';
import { FC } from 'react';

import { ShortVacancyCardProps } from '../../models';
import { fonts } from '../../utils/fontVariants';
import { CardButton } from './CardButton';

const useStyles = createStyles((theme) => ({
  cardTitle: {
    margin: 0,
    maxWidth: rem(680),
  },

  cardTitle_md: {
    fontFamily: fonts.inter600,
    color: theme.colors.blueVariants[0],
    lineHeight: rem(24),
    fontSize: rem(20),
    fontWeight: 600,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  cardTitle_lg: {
    fontFamily: fonts.inter700,
    color: theme.colors.blackVariants[0],
    lineHeight: rem(34),
    fontSize: rem(28),
    fontWeight: 700,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  star: {
    display: 'inline-block',
    cursor: 'pointer',
    '&:hover': {
      stroke: theme.colors.blueVariants[0],
    },
  },

  star_lg: {
    alignSelf: 'flex-start',
  },
}));

type CardHeaderProps = Omit<ShortVacancyCardProps, 'space'>;

export const CardHeader: FC<CardHeaderProps> = ({ item, size, order }) => {
  const { classes, cx } = useStyles();
  const { profession } = item;

  return (
    <Group>
      <Title
        order={order}
        className={cx(
          classes.cardTitle,
          { [classes.cardTitle_md]: size === 'md' },
          { [classes.cardTitle_lg]: size === 'lg' },
        )}
      >
        {profession}
      </Title>
      <CardButton item={item} />
    </Group>
  );
};
