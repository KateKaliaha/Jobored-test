import { NumberInput, rem } from '@mantine/core';
import { FC } from 'react';

import { FormInputProps } from '../../../../models';
import { useStyles } from './styles';

interface SalaryInputProps extends FormInputProps {
  placeholder: string;
  label?: string;
  dataElem: string;
  inputRefKey: string;
}

export const SalaryInput: FC<SalaryInputProps> = ({
  form,
  label,
  dataElem,
  placeholder,
  inputRefKey,
}) => {
  const { classes } = useStyles();

  return (
    <NumberInput
      classNames={{
        control: classes.control,
        label: classes.label,
        input: classes.input,
        rightSection: classes.rightSectionInputNumber,
      }}
      mb={rem(8)}
      size="md"
      placeholder={placeholder}
      label={label ? label : null}
      {...form.getInputProps(inputRefKey)}
      min={0}
      data-elem={dataElem}
    />
  );
};
