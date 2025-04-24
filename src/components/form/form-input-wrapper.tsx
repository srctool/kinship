import {
  Input,
  InputWrapperProps,
  TextInput,
  Textarea,
  Select,
  Checkbox,
  Switch,
  TextInputProps,
  TextareaProps,
  SelectProps,
  CheckboxProps,
  SwitchProps,
} from "@mantine/core";
import useFormField from "./use-form-field";
import { FormField } from "./form";
import { FieldPath, FieldValues } from "react-hook-form";

/**
 * Component props mapping for different input types
 */
export type ComponentPropsMap = {
  input: TextInputProps;
  textarea: TextareaProps;
  select: SelectProps & { options?: { value: string; label: string }[] };
  checkbox: CheckboxProps;
  switch: SwitchProps;
};

/**
 * Dynamic Props resolver based on input type
 */
export type DynamicProps<T extends keyof ComponentPropsMap> =
  ComponentPropsMap[T];

/**
 * Props for the FormInputWrapper component
 */
export type FormInputWrapperProps<
  T extends keyof ComponentPropsMap,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label?: string;
  name: TName;
  type: T;
  inputProps: DynamicProps<T>;
};

const defaultProps: InputWrapperProps = {
  inputWrapperOrder: ["label", "input", "error", "description"],
};

/**
 * Creates a form field configuration dynamically based on type
 */
export function createFormField<T extends keyof ComponentPropsMap>(
  type: T,
  inputProps: DynamicProps<T>,
) {
  return { type, inputProps };
}

/**
 * Maps form field types to respective Mantine components
 */
const mapComponent = {
  input: (props: TextInputProps) => <TextInput {...props} />,
  textarea: (props: TextareaProps) => <Textarea {...props} />,
  select: (props: SelectProps) => <Select {...props} />,
  checkbox: (props: CheckboxProps) => <Checkbox {...props} />,
  switch: (props: SwitchProps) => <Switch {...props} />,
};

/**
 * Wrapper component for form inputs using Mantine and React Hook Form
 */
export const FormInputWrapper = <
  T extends keyof ComponentPropsMap | "input",
  TFieldValues extends FieldValues,
>({
  name,
  type,
  inputProps,
  label,
}: FormInputWrapperProps<T, TFieldValues>) => {
  const { id } = useFormField();
  const fieldConfig = createFormField(type, inputProps);
  return (
    <FormField
      name={name}
      render={({ field, fieldState }) => (
        <Input.Wrapper
          id={id}
          error={fieldState?.error?.message}
          {...defaultProps}
          label={label}
        >
          {mapComponent[type]({
            ...(fieldConfig.inputProps as typeof fieldConfig),
            ...field,
          })}
        </Input.Wrapper>
      )}
    />
  );
};
