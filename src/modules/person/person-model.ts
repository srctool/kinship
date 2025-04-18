export enum GenderProps {
  MALE = "m",
  FEMALE = "f",
}

export type PersonFormProps = {
  id?: string;
  firstName: string;
  lastName: string;
  birthDayDate: null | Date;
  birthDayPlace: string;
  gender: GenderProps;
};
