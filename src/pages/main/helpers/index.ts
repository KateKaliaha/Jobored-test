import { Industry, Vacancy } from '../../../models';

const MAX_NUM_ENTITIES = 500;
export const MAX_NUM_PER_PAGE = 4;

type TypeGetTitles = (listIndustries: Industry[]) => string[];

export const getTitles: TypeGetTitles = (listIndustries) => {
  const titles = listIndustries.map((industry) => industry.title_rus);

  return titles;
};

type TypeGetSalaryText = (
  payment_from: number,
  payment_to: number,
  currency: string,
) => string;

export const getSalaryText: TypeGetSalaryText = (payment_from, payment_to, currency) => {
  if (payment_from > 0 && payment_to > 0) {
    return `з/п ${payment_from}  - ${payment_to} ${currency}`;
  }

  if (payment_from >= 0 && payment_to === 0) {
    return `з/п от ${payment_from} ${currency}`;
  }

  if (payment_from === 0 && payment_to > 0) {
    return `з/п ${payment_to} ${currency}`;
  }

  return '';
};

type TypeGetTotalPages = (totalCount: number) => number;

export const getTotalPages: TypeGetTotalPages = (totalCount) => {
  if (totalCount > MAX_NUM_ENTITIES) {
    const totalPages = MAX_NUM_ENTITIES / MAX_NUM_PER_PAGE;
    return totalPages;
  }

  const totalPages = Math.ceil(totalCount / MAX_NUM_PER_PAGE);

  return totalPages;
};

type TypeIsFav = (id: number) => boolean;

export const isFav: TypeIsFav = (id) => {
  const favoriteCards: Vacancy[] = localStorage.getItem('fav')
    ? JSON.parse(localStorage.getItem('fav') as string)
    : [];
  const findVacancy = favoriteCards.find((item) => item.id === id);

  if (!findVacancy) {
    return false;
  }

  return true;
};

type TypeGetIndustryTitle = (key: number | string, listIndustries: Industry[]) => string;

export const getIndustryTitle: TypeGetIndustryTitle = (key, listIndustries) => {
  if (typeof key === 'string') {
    return '';
  }

  const industry = listIndustries.find((industry) => industry.key === key) as Industry;

  return industry.title_rus;
};
