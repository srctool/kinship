import { usePersonStore } from "@/stores/usePersonStore"
import PersonForm from "./person-form"

const PersonView = () => {

  const { selectedPerson, persons } = usePersonStore()

  const initialValues = persons.find(({ id }) => selectedPerson === id)

  return <PersonForm initialValues={initialValues} />
}

export default PersonView