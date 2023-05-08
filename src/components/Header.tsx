import {
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Image,
  Paper,
  rem,
  Text,
  Transition,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store';
import { changeActiveLink } from '../store/navSlice';
import { fonts } from '../utils/fontVariants';
import { links } from '../utils/links';

const HEADER_HEIGHT = rem(84);

type TypeHandleNavigate = (link: string) => () => void;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    borderBottom: 'none',
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 280,
    cursor: 'pointer',
    [theme.fn.smallerThan('md')]: {
      marginRight: 'auto',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: rem(20),
    textDecoration: 'none',
    color: theme.colors.blackVariants[0],
    fontFamily: fonts.inter400,
    [theme.fn.smallerThan('sm')]: {
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      color: theme.colors.blueVariants[0],
      fontFamily: fonts.inter500,
    },
  },
}));

export const HeaderResponsive = () => {
  const { classes, cx } = useStyles();
  const dispatch = useAppDispatch();
  const [opened, { toggle }] = useDisclosure(false);
  const { active } = useAppSelector((state) => state.navigation);
  const largeScreen = useMediaQuery('(min-width: 767px)');
  const navigate = useNavigate();

  const handleNavigate: TypeHandleNavigate = (link) => () => {
    dispatch(changeActiveLink(link));
  };

  const goMainPage = () => {
    const mainPageLink = links[0].link;
    dispatch(changeActiveLink(mainPageLink));
    navigate(mainPageLink);
  };

  const items = links.map((link) => (
    <Text
      size="sm"
      component={NavLink}
      to={link.link}
      key={link.label}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={handleNavigate(link.link)}
    >
      {link.label}
    </Text>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container size={largeScreen ? 'xl' : 'sm'} px={15} className={classes.header}>
        <Paper className={classes.logo} onClick={goMainPage}>
          <Image src="./images/logo.svg" width={30} mr={12} alt="Logo"></Image>
          <Text
            component="h1"
            size={24}
            lts={`-0.03rem`}
            lh={rem(36)}
            sx={{ fontFamily: 'Poppins SemiBold' }}
          >
            Jobored
          </Text>
        </Paper>
        <Group position="center" spacing={61} className={classes.links}>
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="md" />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} style={styles} onClick={toggle}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};
