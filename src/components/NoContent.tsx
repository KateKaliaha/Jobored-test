import { Box, Button, createStyles, Flex, rem, Text } from '@mantine/core';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../store';
import { changeActiveLink } from '../store/navSlice';
import { fonts } from '../utils/fontVariants';
import { links } from '../utils/links';

const useStyles = createStyles((theme) => ({
  message: {
    fontFamily: fonts.inter700,
    lineHeight: rem(29),
    color: theme.colors.blackVariants[1],
    alignItems: 'center',
    textAlign: 'center',
  },

  button: {
    width: rem(164),
    height: rem(42),
    padding: '10px 24px',
    fontFamily: fonts.openSans600,
    fontSize: theme.fontSizes.xs,
    lineHeight: '155%',
    borderRadius: rem(8),
    backgroundColor: theme.colors.blueVariants[3],
  },
}));

interface NoContentProps {
  message: string;
}

export const NoContent: FC<NoContentProps> = ({ message }) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickBtn = () => {
    const mainPageLink = links[0].link;
    navigate('/');
    dispatch(changeActiveLink(mainPageLink));
  };

  return (
    <Flex gap={32} align="center" mt={80} direction="column">
      <Box h={230} w={240} bg="url(./images/Frame.png)" />
      <Text size="lg" className={classes.message}>
        {message}
      </Text>
      <Button variant="light" className={classes.button} onClick={handleClickBtn}>
        Поиск Вакансий
      </Button>
    </Flex>
  );
};
