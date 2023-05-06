import { FC } from 'react';

import { Vacancy } from '../models';
import { ShortVacancyCard } from './ShortVacancyCard';

interface VacanciesListProps {
  list: Vacancy[];
}

export const VacanciesList: FC<VacanciesListProps> = ({ list }) => {
  return (
    <>
      {list.map((vacancy) => (
        <ShortVacancyCard
          size="md"
          order={3}
          space={11}
          key={vacancy.id}
          item={vacancy}
        />
      ))}
    </>
  );
};
