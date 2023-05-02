import { Industry } from '../../../models';

const MAX_NUM_ENTITIES = 500;
const MAX_NUM_PER_PAGE = 4;

export const getTitles = (data: Industry[]) => {
  const titles = data.map((industry) => industry.title_rus);

  return titles;
};

export const getSalaryText = (
  payment_from: number,
  payment_to: number,
  currency: string,
) => {
  if (payment_from > 0 && payment_to > 0) {
    return `з/п ${payment_from}  - ${payment_to} ${currency}`;
  }
  if (payment_from >= 0 && payment_to === 0) {
    return `з/п от ${payment_from} ${currency}`;
  }
  if (payment_from === 0 && payment_to > 0) {
    return `з/п ${payment_to} ${currency}`;
  }
};

export const getTotalPages = (totalCount: number) => {
  if (totalCount > MAX_NUM_ENTITIES) {
    const totalPages = MAX_NUM_ENTITIES / MAX_NUM_PER_PAGE;
    return totalPages;
  }
  const totalPages = totalCount / MAX_NUM_PER_PAGE;
  return totalPages;
};
