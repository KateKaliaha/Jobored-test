import {
  Box,
  Container,
  createStyles,
  Group,
  Paper,
  Stack,
  TypographyStylesProvider,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';

import { NoContent } from '../../components/NoContent';
import { ShortVacancyCard } from '../../components/ShortVacancyCard';
import { useAppSelector } from '../../store';
import { fonts } from '../../utils/fontVariants';

const useStyles = createStyles((theme) => ({
  description: {
    color: theme.colors.blackVariants[0],

    p: {
      padding: 0,
      margin: 0,
    },

    b: {
      fontFamily: fonts.inter700,
      margin: 0,
    },

    ul: {
      marginTop: 11,
      paddingLeft: 24,
      fontFamily: fonts.inter400,
      lineHeight: '140%',
      fontSize: theme.fontSizes.sm,
    },
  },
}));

export const Vacancy = () => {
  const { classes } = useStyles();
  const card = useAppSelector((state) => state.vacancies.vacancy);
  const vacancyRichText = card ? card.vacancyRichText.replace(/"/g, '') : '';
  const largeScreen = useMediaQuery('(min-width: 767px)');

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Container size={largeScreen ? 'md' : 'sm'} px={15} pt={40}>
      {card && (
        <Stack spacing={20}>
          <ShortVacancyCard item={card} order={2} space={16} size={'lg'} />
          <Group>
            <Paper p={23} pb={18} pt={16} withBorder w="100%">
              <TypographyStylesProvider>
                <Box
                  dangerouslySetInnerHTML={{ __html: vacancyRichText }}
                  className={classes.description}
                />
              </TypographyStylesProvider>
            </Paper>
          </Group>
        </Stack>
      )}
      {!card && <NoContent message="Вакансия не найдена!" />}
    </Container>
  );
};
