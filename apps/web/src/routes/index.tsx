import { createFileRoute } from '@tanstack/react-router';
import { List } from '@mantine/core';
import { usePersonStore } from '@/stores';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { persons, setSelectedPerson, selectedPerson } = usePersonStore();

  return (
    <>
      {selectedPerson}
      <List>
        {persons
          .sort((a, b) => a.firstName.localeCompare(b.firstName))
          .map(({ id, firstName, lastName }) => (
            <List.Item key={id} onClick={() => setSelectedPerson(id)}>
              {id} {firstName} {lastName}
            </List.Item>
          ))}
      </List>
    </>
  );
}
