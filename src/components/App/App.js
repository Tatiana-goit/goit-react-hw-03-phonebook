import './App.css';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { RiContactsBook2Fill, RiContactsFill } from 'react-icons/ri';
import Container from '../Container/Container';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Modal from '../Modal/Modal';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function App() {
  const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    { id: 'id-5', name: 'Tatiana Taranushchenko', number: '369-25-14' },
  ];

  const [contacts, setContacts] = useLocalStorage('contacts', defaultContacts);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const addNewContact = obj => {
    const newContact = { ...obj, id: uuid() };

    const searchSameName = contacts
      .map(element => element.name.toLowerCase())
      .includes(obj.name.toLowerCase());

    searchSameName
      ? alert(`${obj.name} is already in contacts`)
      : setContacts([...contacts, newContact]);
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  const deleteContact = id =>
    setContacts(prev => prev.filter(contact => contact.id !== id));

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="App">
      <Container>
        <h1>
          <RiContactsBook2Fill />
          Phonebook
        </h1>
        <button className="center_button" type="button" onClick={toggleModal}>
          Add contact
        </button>
        {showModal && (
          <Modal toggleModal={toggleModal}>
            <ContactForm addNewContact={addNewContact} />
          </Modal>
        )}

        <h2>
          <RiContactsFill />
          Contacts
        </h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </Container>
    </div>
  );
}
