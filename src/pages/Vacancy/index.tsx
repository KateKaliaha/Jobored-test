import {
  Box,
  Button,
  Container,
  createStyles,
  Group,
  Paper,
  rem,
  TypographyStylesProvider,
} from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

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
      fontSize: rem(16),
    },
  },
}));

export const Vacancy = () => {
  const { classes } = useStyles();

  const card = useAppSelector((state) => state.vacancies.vacancy);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const vacancyRichText = card ? card.vacancyRichText.replace(/"/g, '') : '';

  return (
    <Container size="md" px={15} pt={40} pos="relative">
      {card && (
        <>
          <Button
            pos="absolute"
            top={40}
            left={-120}
            leftIcon={<BsArrowLeft size={20} />}
            variant="subtle"
            onClick={goBack}
          >
            Назад
          </Button>
          <ShortVacancyCard item={card} order={2} space={16} size={'lg'} />
          <Group mt={20}>
            <Paper p={23} pb={18} pt={16} withBorder w="100%">
              <TypographyStylesProvider>
                <Box
                  dangerouslySetInnerHTML={{ __html: vacancyRichText }}
                  className={classes.description}
                />
              </TypographyStylesProvider>
            </Paper>
          </Group>
        </>
      )}
      {!card && <NoContent message="Вакансия не найдена!" />}
    </Container>
  );
};
