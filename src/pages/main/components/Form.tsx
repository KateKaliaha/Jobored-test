import {
  Box,
  Button,
  createStyles,
  Group,
  NumberInput,
  rem,
  Select,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { SlArrowDown } from 'react-icons/sl';

import { useAppSelector } from '../../../store';
import { fonts } from '../../../utils/fontVariants';
import { getTitles } from '../helpers';

const useStyles = createStyles((theme) => ({
  form: {
    background: theme.colors.whiteVariants[1],
    border: `1px solid ${theme.colors.whiteVariants[2]}`,
    borderRadius: rem(12),
    padding: rem(19),
    maxWidth: rem(315),
  },

  formHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rem(25),
  },

  formTitle: {
    fontFamily: fonts.inter700,
    lineHeight: rem(20),
    color: theme.colors.blackVariants[0],
  },

  resetBtn: {
    color: theme.colors.grayVariants[0],
    padding: 0,
    border: 'none',
    fontFamily: fonts.inter500,
    fontWeight: 500,
    lineHeight: rem(20),
    height: 20,
    '&:hover': { background: 'none', color: theme.colors.blueVariants[1] },
    '&:active': { color: theme.colors.blueVariants[0] },
  },

  rightIcon: {
    marginLeft: 5,
  },

  submitBtn: {
    fontFamily: fonts.inter500,
    lineHeight: rem(21),
    fontWeight: 500,
    border: 'none',
    backgroundColor: theme.colors.blueVariants[0],
    height: rem(40),
    width: rem(275),
    marginTop: rem(20),
    '&:hover': { background: theme.colors.blueVariants[1] },
    '&:active': { background: theme.colors.blueVariants[2] },
  },

  selectArrow: {
    color: theme.colors.grayVariants[1],
    width: rem(16),
    height: rem(16),
    transition: '0.3s',
  },

  selectArrowActive: {
    transform: 'rotate(180deg)',
    color: theme.colors.blueVariants[0],
  },

  control: {
    color: theme.colors.grayVariants[1],
    cursor: 'pointer',
    '&:not([data-disabled]):hover': { background: 'none' },
    border: 'none',
  },

  label: {
    fontFamily: fonts.inter700,
    fontSize: rem(16),
    lineHeight: rem(19),
    marginBottom: rem(8),
  },

  dropdown: {
    borderRadius: rem(8),
    minHeight: rem(20),
    border: `1px solid ${theme.colors.grayVariants[1]}`,
  },

  item: {
    borderRadius: rem(8),
    fontFamily: fonts.inter400,
    fontSize: rem(14),
    lineHeight: rem(20),
    padding: rem(8),
    maxWidth: rem(259),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.colors.blackVariants[0],
    '&:hover': {
      backgroundColor: theme.colors.blueVariants[3],
    },
    '&[data-selected]': {
      '&, &:hover': {
        backgroundColor: theme.colors.blueVariants[0],
      },
    },
  },

  input: {
    fontFamily: fonts.inter400,
    fontSize: rem(14),
    lineHeight: rem(20),
    paddingLeft: rem(12),
    paddingRight: rem(36),
    borderRadius: rem(8),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.colors.blackVariants[0],
    border: `1px solid ${theme.colors.grayVariants[1]}`,
    '&:hover': {
      borderColor: theme.colors.blueVariants[0],
    },
    '&:focus': {
      borderColor: theme.colors.blueVariants[0],
    },
  },

  rightSection: {
    pointerEvents: 'none',
    width: rem(24),
    marginRight: rem(12),
    alignSelf: 'center',
  },

  rightSectionInputNumber: {
    marginRight: rem(3),
    height: 'auto',
  },
}));

export function Form() {
  const { classes, cx } = useStyles();
  const industries = useAppSelector((store) => store.industries.list);

  const titles = getTitles(industries);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSelectStatus = () => setIsOpen(!isOpen);
  const form = useForm({
    initialValues: {
      industry: '',
      salaryFrom: '',
      salaryTo: '',
    },
  });

  return (
    <>
      <Box
        className={classes.form}
        component="form"
        onSubmit={form.onSubmit((values) => console.log(values))}
      >
        <Group className={classes.formHeader}>
          <Text size="md" className={classes.formTitle}>
            Фильтры
          </Text>
          <Button
            size="xs"
            className={classes.resetBtn}
            classNames={{
              rightIcon: classes.rightIcon,
            }}
            rightIcon={<IoCloseOutline size={16} />}
            variant="subtle"
            onClick={form.reset}
          >
            Сбросить все
          </Button>
        </Group>

        <Select
          classNames={{
            label: classes.label,
            input: classes.input,
            rightSection: classes.rightSection,
            item: classes.item,
            dropdown: classes.dropdown,
          }}
          size="md"
          maxDropdownHeight={188}
          mb={rem(12)}
          label="Отрасль"
          placeholder="Выберите отрасль"
          rightSection={
            <SlArrowDown
              className={cx(classes.selectArrow, {
                [classes.selectArrowActive]: isOpen,
              })}
            />
          }
          data={titles}
          {...form.getInputProps('industry')}
          data-elem="industry-select"
          onDropdownOpen={toggleSelectStatus}
          onDropdownClose={toggleSelectStatus}
        />
        <NumberInput
          classNames={{
            control: classes.control,
            label: classes.label,
            input: classes.input,
            rightSection: classes.rightSectionInputNumber,
          }}
          mb={rem(8)}
          size="md"
          placeholder="От"
          label="Оклад"
          {...form.getInputProps('salaryFrom')}
          min={0}
        />
        <NumberInput
          classNames={{
            control: classes.control,
            label: classes.label,
            input: classes.input,
            rightSection: classes.rightSectionInputNumber,
          }}
          size="md"
          placeholder="До"
          {...form.getInputProps('salaryTo')}
          min={0}
        />

        <Button size="xs" className={classes.submitBtn} type="submit" radius="md">
          Применить
        </Button>
      </Box>
    </>
  );
}
