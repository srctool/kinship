import { createFileRoute } from '@tanstack/react-router';
import { List } from '@mantine/core';
import { useGetPost, useGetUser } from '@/services';
import { usePersonStore } from '@/stores';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { persons, setSelectedPerson, selectedPerson } = usePersonStore();
  const { data: dataUser } = useGetUser('1');
  const { data: dataPost } = useGetPost('1');

  return (
    <>
      Data Post {JSON.stringify(dataPost)}
      <br />
      Data User {JSON.stringify(dataUser)}
      <br />
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
