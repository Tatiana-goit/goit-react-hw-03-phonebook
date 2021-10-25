import './App.css';
import { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { RiContactsBook2Fill, RiContactsFill } from "react-icons/ri";
import Container from '../Container/Container';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Modal from '../Modal/Modal';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Tatiana Taranushchenko', number: '369-25-14' },
    ],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    const LocalContacts=localStorage.getItem('contactsList');
    const parseContact = JSON.parse(LocalContacts);

    if (parseContact) {
      this.setState({contacts : parseContact})
    }
 }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contactsList',JSON.stringify(this.state.contacts))
    }
  }
  
  addNewContact = obj => {
    const newContact = { ...obj, id: uuid() }; 

    const searchSameName = this.state.contacts
    .map(element => element.name.toLowerCase())
    .includes(obj.name.toLowerCase());

    searchSameName
    ? 
    alert(`${obj.name} is already in contacts`)
    :   
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    }); 
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }))
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
  }

  render() {
    const { addNewContact, changeFilter, getVisibleContacts,deleteContact,toggleModal} = this;
    const { filter } = this.state;
    return (
      <div className="App">
        <Container>
          <h1>
            <RiContactsBook2Fill/>
            Phonebook
          </h1>
          <button className='center_button' type='button' onClick={toggleModal}>Add contact</button>
          {this.state.showModal &&
            <Modal toggleModal={toggleModal}>
              <ContactForm addNewContact={addNewContact} />
            </Modal>
          }
          
          <h2>
            <RiContactsFill/>
            Contacts
          </h2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList contacts={getVisibleContacts()} onDeleteContact={deleteContact} />
        </Container>
      </div>
    );
  }
}

export default App;
