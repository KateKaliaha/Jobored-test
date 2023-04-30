import { Box, createStyles, Group, rem } from '@mantine/core';

import { Form } from './components/Form';
import { ProfessionCard } from './components/ProfessionCard';
import { SearchInput } from './components/SearchInput';

const useStyles = createStyles(() => ({
  wrapper: {
    paddingLeft: rem(15),
    paddingRight: rem(15),
    paddingTop: rem(40),
    maxWidth: rem(1146),
    margin: '0 auto',
    display: 'flex',
    gap: rem(28),
  },

  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}));

const data = [
  {
    profession: 'Менеджер-дизайнер',
    firm_name: null,
    payment_to: 70000,
    payment_from: null,
    currency: null,
    type_of_work: { title: 'Полный рабочий день' },
    town: { title: 'Новый Уренгой' },
  },
];

export const MainPage = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.wrapper} component="section">
      <Form />
      <Box className={classes.contentWrapper}>
        <SearchInput />
        <Group>
          <ProfessionCard professionInfo={data[0]} />
        </Group>
      </Box>
    </Box>
  );
};
