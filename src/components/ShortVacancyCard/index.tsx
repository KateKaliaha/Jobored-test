import { Card, createStyles, Stack } from '@mantine/core';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProfessionalCardProps } from '../../models';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchVacancyById } from '../../store/vacanciesSlice';
import { CardConditionals } from './CardConditionals';
import { CardHeader } from './CardHeader';
import { CardLocation } from './CardLocation';

const useStyles = createStyles(() => ({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
}));

export const ShortVacancyCard: FC<ProfessionalCardProps> = ({
  item,
  order,
  size,
  space,
}) => {
  const { classes } = useStyles();
  const { id } = item;
  const token = useAppSelector((state) => state.auth.token) as string;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const openCard = async (id: number) => {
    await dispatch(fetchVacancyById({ id: id.toString(), token: token }));
    navigate(`/${id}`);
  };

  return (
    <Card
      className={classes.card}
      padding="24px 23px 24px 23px"
      radius="md"
      withBorder
      onClick={() => openCard(id)}
      data-elem={`vacancy-${id}`}
    >
      <Stack spacing={space}>
        <CardHeader item={item} order={order} size={size} />
        <CardConditionals item={item} size={size} />
        <CardLocation item={item} />
      </Stack>
    </Card>
  );
};
