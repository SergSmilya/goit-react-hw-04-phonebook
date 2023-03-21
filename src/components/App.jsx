import { useState, useEffect } from 'react';
import Contacts from './Contacts/Contacts';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';

const STORAGE_KEY = 'Contacts';
const defaultArrayContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

// Custom hook
// function useLocalStorageContacts(key, defaultValue) {
//   const [state, setState] = useState(() => {
//     return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(state));
//   }, [key, state]);

//   return [state, setState];
// }

export default function App() {
  const [filter, setFilter] = useState('');

  // const [contacts, setContacts] = useLocalStorageContacts(
  //   STORAGE_KEY,
  //   defaultArrayContacts
  // );

  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? defaultArrayContacts
    );
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onFormData = data => {
    const dataNameLowerCase = data.name.toLowerCase().trim();

    if (
      contacts.find(el => dataNameLowerCase === el.name.toLowerCase().trim())
    ) {
      alert(`Contact was added`);
      return;
    }

    const id = nanoid(3);
    data = { ...data, id };

    setContacts(s => [...s, data]);
  };

  const onFilterControl = value => {
    setFilter(value);
  };

  const onFilterSearch = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const onDeleteContact = contactId => {
    setContacts(s => contacts.filter(({ id }) => id !== contactId));
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'block',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onFormData={onFormData} />

      <h2>Contacts</h2>
      <Filter onFilterControl={onFilterControl} />
      <Contacts contacts={onFilterSearch()} onDeleteContact={onDeleteContact} />
    </div>
  );
}
