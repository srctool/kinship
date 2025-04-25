import { ComponentPropsMap } from "@/components/form/form-input-wrapper";

type DynamicField<T = unknown> = {
  [K in keyof ComponentPropsMap]: {
    name: keyof T | string;
    type: K;
    label?: string;
    inputProps: ComponentPropsMap[K];
  };
}[keyof ComponentPropsMap];

export const personSchema: DynamicField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "input",
    inputProps: {
      placeholder: "First Name",
    },
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "input",
    inputProps: {
      placeholder: "Last Name",
    },
  },
  {
    name: "gender",
    label: "Gender",
    type: "switch",
    inputProps: {
      size: "lg",
      onLabel: "M",
      offLabel: "F",
    },
  },
  {
    name: "birthDayDate",
    type: "date",
    label: "Birth Day Date",
    inputProps: {
      placeholder: "DD/MM/YYYY",
    },
  },
  {
    name: "birthDayPlace",
    type: "textarea",
    label: "Birth Place",
    inputProps: {
      placeholder: "Birth Place",
    },
  },
];
