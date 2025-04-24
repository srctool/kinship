import { Button, Group, Input, Stack, Textarea } from "@mantine/core";
import { GenderProps, PersonFormProps } from "./person-model";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DateInput } from "@mantine/dates";
import { usePersonStore } from "@/stores/usePersonStore";
import { useEffect } from "react";
import { Form } from "@/components/form/form";
import { FormInputWrapper } from "@/components/form/form-input-wrapper";

const PersonForm = ({ initialValues }: { initialValues?: PersonFormProps }) => {
  const { personCreate, selectedPerson, setSelectedPerson } = usePersonStore();

  const form = useForm<PersonFormProps>({
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      gender: GenderProps.MALE,
      birthDayDate: null,
      birthDayPlace: "",
    },
  });

  const onSubmit: SubmitHandler<PersonFormProps> = (data) => personCreate(data);

  useEffect(() => {
    if (selectedPerson) {
      form.reset(initialValues);
    } else {
      form.reset({
        id: "",
        firstName: "",
        lastName: "",
        gender: GenderProps.MALE,
        birthDayDate: null,
        birthDayPlace: "",
      });
    }
  }, [initialValues, form.reset, selectedPerson, form]);

  console.log(form.watch());

  return (
    <Stack gap={8} p="md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInputWrapper
            name="firstName"
            label="First Name"
            type="input"
            inputProps={{
              placeholder: "First Name",
            }}
          />
          <FormInputWrapper
            type="input"
            name="lastName"
            label="Last Name"
            inputProps={{
              placeholder: "Last Name",
            }}
          />
          <FormInputWrapper
            name="gender"
            label="Gender"
            type="switch"
            inputProps={{
              size: "lg",
              onLabel: "M",
              offLabel: "F",
            }}
          />
          <Controller
            name="birthDayDate"
            control={form.control}
            render={({ field }) => (
              <Input.Wrapper>
                <Input.Label>Birth Day Date</Input.Label>
                <DateInput
                  {...field}
                  placeholder="DD/MM/YYYY"
                  value={field.value ? new Date(field.value) : null}
                />
              </Input.Wrapper>
            )}
          />
          <Controller
            name="birthDayPlace"
            control={form.control}
            render={({ field }) => (
              <Input.Wrapper>
                <Input.Label>Birth Place</Input.Label>
                <Textarea {...field} placeholder="Birth Place" />
              </Input.Wrapper>
            )}
          />
          <Group grow mt="auto">
            <Button variant="light" onClick={() => setSelectedPerson("")}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Form>
    </Stack>
  );
};

export default PersonForm;
