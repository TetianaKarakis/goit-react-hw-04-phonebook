import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import s from '../App.module.css';


//const phoneContacts = [
 // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
 // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
 // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
 // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//];

export const App = () => {
  let [contacts, setContacts] = useState([]);
  let [filter, setFilter] = useState('');
  const localStorageKey = 'contacts';

  useEffect(() => {
    const json = localStorage.getItem(localStorageKey);
    const carentContacts = JSON.parse(json) || [];
    if (carentContacts.length > 0) {
      setContacts([...contacts, ...carentContacts]);
    }
  }, []);

  const addContact = event => {
    setContacts(JSON.parse(localStorage.getItem(localStorageKey)) || []);
    const loweredCase = event.name.toLowerCase().trim();

    const exists = contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${event.name} is already in contacts!`);
    } else {
      setContacts((contacts = [...contacts, event]));
      console.log(contacts);
      const json = JSON.stringify(contacts);
      localStorage.setItem(localStorageKey, json);
    }
  };

  const addFilter = event => {
    setFilter((filter = event.currentTarget.value));
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const deleteContact = id => {
    setContacts((contacts = contacts.filter(contact => contact.id !== id)));
  };
  return (
    <section className={s.content}>
      <div className={s.content__container}>
        <ContactForm addContact={addContact} />
        <ContactList
          contacts={filteredContacts()}
          deleteContact={deleteContact}
        >
          <Filter filter={filter} addFilter={addFilter} />
        </ContactList>
      </div>
    </section>
  );
};
