import { Button } from '@mantine/core';
import { FC } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import { FormInputProps } from '../../../../models';
import { useAppDispatch } from '../../../../store';
import {
  changeCatalogueKey,
  changePaymentFrom,
  changePaymentTo,
} from '../../../../store/mainPageSlice';
import { useStyles } from './styles';

export const ResetButton: FC<FormInputProps> = ({ form }) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const resetForm = () => {
    dispatch(changePaymentFrom(''));
    dispatch(changePaymentTo(''));
    dispatch(changeCatalogueKey(''));
    form.values.industry = '';
    form.values.salaryFrom = '';
    form.values.salaryTo = '';
    form.reset();
  };

  return (
    <Button
      size="xs"
      classNames={{
        root: classes.resetBtn,
        rightIcon: classes.rightIcon,
      }}
      rightIcon={<IoCloseOutline size={16} />}
      variant="subtle"
      onClick={resetForm}
    >
      Сбросить все
    </Button>
  );
};
