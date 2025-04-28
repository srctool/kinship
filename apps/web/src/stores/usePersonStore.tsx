import { ulid } from 'ulid';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { PersonFormProps } from '@/modules/person/person-model';

export type PersonActionProps = {
  personCreate: (payload: PersonFormProps) => void;
  setSelectedPerson: (id?: string) => void;
};

export type PersonStateProps = {
  persons: PersonFormProps[];
  selectedPerson?: string;
};

export type PersonProps = PersonStateProps & PersonActionProps;

export const usePersonStore = create<PersonProps>()(
  devtools(
    persist(
      (set) => ({
        selectedPerson: '',
        persons: [],
        setSelectedPerson(id) {
          set({ selectedPerson: id });
        },
        personCreate: (payload: PersonFormProps) => {
          set((state) => {
            if (payload.id) {
              return {
                selectedPerson: '',
                persons: [
                  ...state.persons.filter(({ id }) => id !== payload.id),
                  {
                    ...payload,
                    id: payload?.id || ulid(),
                  },
                ],
              };
            }

            return {
              selectedPerson: '',
              persons: [
                ...state.persons,
                {
                  ...payload,
                  id: payload?.id || ulid(),
                },
              ],
            };
          });
        },
      }),
      { name: 'person-store' }
    )
  )
);
