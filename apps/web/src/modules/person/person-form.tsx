import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Group, Stack } from '@mantine/core';
import { Form } from '@/components/form/form';
import { FormInputWrapper } from '@/components/form/form-input-wrapper';
import { usePersonStore } from '@/stores/usePersonStore';
import { GenderProps, PersonFormProps } from './person-model';
import { personSchema } from './person-schema';

const PersonForm = ({ initialValues }: { initialValues?: PersonFormProps }) => {
  const { personCreate, selectedPerson, setSelectedPerson } = usePersonStore();

  const form = useForm<PersonFormProps>({
    defaultValues: {
      id: '',
      firstName: '',
      lastName: '',
      gender: GenderProps.MALE,
      birthDayDate: null,
      birthDayPlace: '',
    },
  });

  const onSubmit: SubmitHandler<PersonFormProps> = (data) => personCreate(data);

  useEffect(() => {
    if (selectedPerson) {
      form.reset(initialValues);
    } else {
      form.reset({
        id: '',
        firstName: '',
        lastName: '',
        gender: GenderProps.MALE,
        birthDayDate: null,
        birthDayPlace: '',
      });
    }
  }, [initialValues, form.reset, selectedPerson, form]);

  return (
    <Stack gap={8} p="md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {personSchema.map((props, index) => (
            <FormInputWrapper key={`${props.name}-${index}`} {...props} />
          ))}

          <Group grow mt="auto">
            <Button variant="light" onClick={() => setSelectedPerson('')}>
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
