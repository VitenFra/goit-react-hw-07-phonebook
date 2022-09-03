import { useState } from 'react';
import s from './Phonebook.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import toast from 'react-hot-toast';



function Phonebook() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(contactsSelectors.getContacts);

  const dispatch = useDispatch();

  const handleInput = evt => {
    switch (evt.currentTarget.name) {
      case 'name':
        setName(evt.currentTarget.value);
        break;
      case 'number':
        setNumber(evt.currentTarget.value);
        break;
      default:
        console.log('wrong name');
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addContactToContacts(name, number);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const addContactToContacts = (name, number) => {
    const isNameInContacts = contacts
      .map(({ name }) => name.toLowerCase())
      .includes(name.toLowerCase());

    if (isNameInContacts) {
      toast.error(`${name} вже є в контактах`, {
        position: 'top',
      });
    } else {
      dispatch(contactsOperations.addContact({ name, number }));
      reset();
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
      Ім'я
        <input
          type="text"
          onChange={handleInput}
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Назва може містити лише літери, апостроф, тире та пробіли. Наприклад Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          className={s.input}
        />
      </label>

      <label className={s.label}>
      Номер
        <input
          type="tel"
          onChange={handleInput}
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефону має складатися з цифр і може містити пробіли, тире, круглі дужки та може починатися з +"
          required
          className={s.input}
        />
      </label>

      <button className={s.button} type="submit">
       
        Додати
       
      </button>
    </form>
  );
}

export default Phonebook;
