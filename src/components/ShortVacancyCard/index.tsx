import { Card, createStyles, Stack } from '@mantine/core';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ShortVacancyCardProps } from '../../models';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchVacancyById } from '../../store/vacanciesSlice';
import { CardConditionals } from './CardConditionals';
import { CardHeader } from './CardHeader';
import { CardLocation } from './CardLocation';

type TypeOpenCard = (size: string) => Promise<void>;

const useStyles = createStyles(() => ({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const ShortVacancyCard: FC<ShortVacancyCardProps> = ({
  item,
  order,
  size,
  space,
}) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = item;
  const token = useAppSelector((state) => state.auth.token) as string;

  const openCard: TypeOpenCard = async (size) => {
    if (size === 'md') {
      await dispatch(fetchVacancyById({ id, token }));
      navigate(`/${id}`);
    }
    return;
  };

  return (
    <Card
      className={classes.card}
      padding="24px 54px 24px 23px"
      radius="md"
      withBorder
      onClick={() => openCard(size)}
      data-elem={`vacancy-${id}`}
      pos="relative"
      sx={size === 'md' ? { cursor: 'pointer' } : { cursor: 'default' }}
    >
      <Stack spacing={space}>
        <CardHeader item={item} order={order} size={size} />
        <CardConditionals item={item} size={size} />
        <CardLocation item={item} />
      </Stack>
    </Card>
  );
};
