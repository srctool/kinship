import {
  Button,
  Group,
  Input,
  Stack,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { GenderProps, PersonFormProps } from "./person-model";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DateInput } from "@mantine/dates";
import { usePersonStore } from "@/stores/usePersonStore";
import { useEffect } from "react";

const PersonForm = ({ initialValues }: { initialValues?: PersonFormProps }) => {
  const { personCreate, selectedPerson, setSelectedPerson } = usePersonStore();

  const { control, handleSubmit, reset } = useForm<PersonFormProps>({
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
      reset(initialValues)
    } else {
      reset({
      id: "",
      firstName: "",
      lastName: "",
      gender: GenderProps.MALE,
      birthDayDate: null,
      birthDayPlace: "",
    })
    }
  },[initialValues, reset, selectedPerson])

  return (
    <Stack
      gap={8}
      p="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder="First Name"
              label="First Name"
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder="Last Name"
              label="Last Name"
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Input.Wrapper>
              <Input.Label>Gender</Input.Label>
              <Switch
                {...field}
                size="lg"
                onLabel="M"
                offLabel="F"
                checked={field.value === "m"}
                onChange={() => field.onChange(field.value === "m" ? "f" : "m")}
              />
            </Input.Wrapper>
          )}
        />
        <Controller
          name="birthDayDate"
          control={control}
          render={({ field }) => (
            <Input.Wrapper>
              <Input.Label>Birth Day Date</Input.Label>
              <DateInput
                {...field}
                placeholder="DD/MM/YYYY"
                value={field.value ? new Date(field.value): null}
              />
            </Input.Wrapper>
          )}
        />
        <Controller
          name="birthDayPlace"
          control={control}
          render={({ field }) => (
            <Input.Wrapper>
              <Input.Label>Birth Place</Input.Label>
              <Textarea
                {...field}
                placeholder="Birth Place"
              />
            </Input.Wrapper>
          )}
        />
        <Group
          grow
          mt="auto">
          <Button variant="light" onClick={() => setSelectedPerson("")}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Stack>
  );
};

export default PersonForm;
