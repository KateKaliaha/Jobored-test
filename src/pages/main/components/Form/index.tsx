import { Box, Button, Group, rem, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { FormValues } from '../../../../models';
import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  changeCatalogueKey,
  changePage,
  changePaymentFrom,
  changePaymentTo,
} from '../../../../store/mainPageSlice';
import { fetchVacanciesCatalog } from '../../../../store/vacanciesSlice';
import { getIndustryTitle } from '../../helpers';
import { IndustrySelect } from './IndustrySelect';
import { ResetButton } from './ResetButton';
import { SalaryInput } from './SalaryInput';
import { useStyles } from './styles';

type TypeHandleChange = (values: FormValues) => void;

export const Form = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const industries = useAppSelector((store) => store.industries.list);
  const token = useAppSelector((state) => state.auth.token);
  const { keyword, catalogueKey, payment_from, payment_to } = useAppSelector(
    (store) => store.mainPage,
  );

  const handleChange: TypeHandleChange = (values) => {
    const { salaryFrom, salaryTo, industry } = values;
    const catalogue = industries.find((item) => item.title_rus === industry);
    dispatch(changePaymentFrom(salaryFrom));
    dispatch(changePaymentTo(salaryTo));

    if (catalogue) {
      dispatch(changeCatalogueKey(catalogue.key));
    }

    if (token) {
      dispatch(
        fetchVacanciesCatalog({
          token,
          page: 0,
          keyword,
          payment_from: salaryFrom ?? '',
          payment_to: salaryTo ?? '',
          catalogueKey: catalogue ? catalogue.key : '',
        }),
      );
    }

    dispatch(changePage(1));
  };

  const form = useForm({
    initialValues: {
      industry: getIndustryTitle(catalogueKey, industries) ?? '',
      salaryFrom: payment_from ?? '',
      salaryTo: payment_to ?? '',
    },
  });

  return (
    <Box className={classes.form} component="form" onSubmit={form.onSubmit(handleChange)}>
      <Group className={classes.formHeader}>
        <Text size="md" className={classes.formTitle}>
          Фильтры
        </Text>
        <ResetButton form={form} />
      </Group>
      <IndustrySelect form={form} />
      <SalaryInput
        form={form}
        placeholder="От"
        dataElem="salary-from-input"
        inputRefKey="salaryFrom"
        label="Оклад"
      />
      <SalaryInput
        form={form}
        placeholder="До"
        dataElem="salary-to-input"
        inputRefKey="salaryTo"
      />
      <Button
        size="xs"
        className={classes.submitBtn}
        type="submit"
        radius="md"
        mt={rem(11)}
        data-elem="search-button"
      >
        Применить
      </Button>
    </Box>
  );
};
