import { createStyles, Group, rem, Text, useMantineTheme } from '@mantine/core';
import { FC } from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { ProfessionalCardProps } from '../../models';
import { fonts } from '../../utils/fontVariants';

const useStyles = createStyles((theme) => ({
  info: {
    fontFamily: fonts.inter400,
    color: theme.colors.blackVariants[0],
    lineHeight: rem(19),
  },
}));

type CardLocationProps = Pick<ProfessionalCardProps, 'item'>;

export const CardLocation: FC<CardLocationProps> = ({ item }) => {
  const { classes } = useStyles();
  const { colors } = useMantineTheme();
  const {
    town: { title },
  } = item;

  return (
    <Group spacing={rem(8)}>
      <HiOutlineLocationMarker size={21} color={colors.grayVariants[0]} />
      <Text size="sm" className={classes.info}>
        {title}
      </Text>
    </Group>
  );
};
