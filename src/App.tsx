import { List, MantineProvider } from "@mantine/core";
import Layout from "./components/layout";

import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import { DatesProvider } from "@mantine/dates";
import 'dayjs/locale/en';
import { usePersonStore } from "./stores/usePersonStore";

function App() {
  const { persons, setSelectedPerson, selectedPerson } = usePersonStore();

  return (
    <MantineProvider>
      <DatesProvider settings={{ locale: 'en' }}>
        <Layout>
          {selectedPerson}
          <List>
            {
              persons
              .sort((a, b) => a.firstName.localeCompare(b.firstName))
              .map(({ id, firstName, lastName }) => (
                <List.Item key={id} onClick={() => setSelectedPerson(id)}>{id} {firstName} {lastName}</List.Item>
              ))
            }
          </List>
        </Layout>
      </DatesProvider>
    </MantineProvider>
  );
}

export default App;
