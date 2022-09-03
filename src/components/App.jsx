import React from 'react';
import Phonebook from './Phonebook';
import ContactList from './ContactList';
import Filter from './Filter';
import { useSelector } from 'react-redux';
import { contactsSelectors } from 'redux/contacts';
import { Toaster } from 'react-hot-toast';


function App() {
  const error = useSelector(contactsSelectors.getError);

  return (
    <div>
      <h1>Телефонна книга</h1>
      <Phonebook />

      <h2>Контакти</h2>
      <Filter />
      {error ? <h2>{error}, спробуйте пізніше</h2> : <ContactList />}
      <Toaster
        
      />
    </div>
  );
}

export default App;
