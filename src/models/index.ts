import { TitleOrder } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

export interface Industry {
  title_rus: string;
  url_rus: string;
  title: string;
  title_trimmed: string;
  key: number;
  positions: Record<string, string>[];
}

export interface Vacancies {
  objects: Vacancy[];
  total: number;
  corrected_keyword: string;
  more: boolean;
}

export interface Vacancy {
  id: number;
  id_client: number;
  payment_from: number;
  payment_to: number;
  date_pub_to: number;
  date_archived: number;
  date_published: number;
  address: null | string;
  profession: string;
  work: string;
  candidat: string;
  metro: [
    {
      id: number;
      title: string;
      id_metro_line: number;
    },
  ];
  currency: string;
  moveable: boolean;
  agreement: boolean;
  anonymous: boolean;
  type_of_work: {
    id: number;
    title: string;
  };
  place_of_work: {
    id: number;
    title: string;
  };
  education: {
    id: number;
    title: string;
  };
  experience: {
    id: number;
    title: string;
  };
  maritalstatus: {
    id: number;
    title: string;
  };
  children: {
    id: number;
    title: string;
  };
  already_sent_on_vacancy: boolean;
  languages: string[];
  driving_licence: string[];
  catalogues: [
    {
      id: number;
      title: string;
      positions: [
        {
          id: number;
          title: string;
        },
      ];
    },
  ];
  agency: {
    id: number;
    title: string;
  };
  town: {
    id: number;
    title: string;
    declension: string;
    genitive: string;
  };
  client_logo: string;
  age_from: number;
  age_to: number;
  gender: {
    id: number;
    title: string;
  };
  firm_name: string;
  firm_activity: string;
  link: string;
  vacancyRichText: string;
}

export interface ShortVacancyCardProps {
  item: Vacancy;
  order: TitleOrder;
  size: string;
  space: number;
}

export interface FormValues {
  industry: string;
  salaryFrom: string;
  salaryTo: string;
}

export interface FormInputProps {
  form: UseFormReturnType<FormValues>;
}
