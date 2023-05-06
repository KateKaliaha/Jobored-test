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
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from 'react-router-dom';

import logo from '../assets/images/logo.svg';
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
    paddingLeft: rem(15),
    paddingRight: rem(15),
    maxWidth: rem(1146),
    margin: '0 auto',
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 280,
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

  const handleNavigate: TypeHandleNavigate = (link) => () => {
    dispatch(changeActiveLink(link));
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
      <Container className={classes.header}>
        <Paper className={classes.logo}>
          <Image src={logo} width={30} mr={12} alt="Logo"></Image>
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
