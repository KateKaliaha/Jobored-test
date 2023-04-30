import { Industry } from '../../../models';

export const getTitles = (data: Industry[]) => {
  const titles = data.map((industry) => industry.title_rus);

  return titles;
};
