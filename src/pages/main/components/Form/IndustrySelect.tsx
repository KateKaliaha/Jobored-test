import { rem, Select } from '@mantine/core';
import { FC, useState } from 'react';
import { SlArrowDown } from 'react-icons/sl';

import { FormInputProps } from '../../../../models';
import { useAppSelector } from '../../../../store';
import { getTitles } from '../../helpers';
import { useStyles } from './styles';

export const IndustrySelect: FC<FormInputProps> = ({ form }) => {
  const { classes, cx } = useStyles();
  const industries = useAppSelector((store) => store.industries.list);
  const titles = getTitles(industries);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelectStatus = () => setIsOpen(!isOpen);

  return (
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
  );
};
