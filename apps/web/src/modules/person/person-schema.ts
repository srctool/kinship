import { ComponentPropsMap } from '@/components/form/form-input-wrapper';
import { PersonFormProps } from './person-model';

type DynamicField<T = string> = {
  [K in keyof ComponentPropsMap]: {
    name: T;
    type: K;
    label?: string;
    inputProps: ComponentPropsMap[K];
  };
}[keyof ComponentPropsMap];

export const personSchema: DynamicField<keyof PersonFormProps>[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'input',
    inputProps: {
      placeholder: 'First Name',
    },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'input',
    inputProps: {
      placeholder: 'Last Name',
    },
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'switch',
    inputProps: {
      size: 'lg',
      onLabel: 'M',
      offLabel: 'F',
    },
  },
  {
    name: 'birthDayDate',
    type: 'date',
    label: 'Birth Day Date',
    inputProps: {
      placeholder: 'DD/MM/YYYY',
    },
  },
  {
    name: 'birthDayPlace',
    type: 'textarea',
    label: 'Birth Place',
    inputProps: {
      placeholder: 'Birth Place',
    },
  },
];
