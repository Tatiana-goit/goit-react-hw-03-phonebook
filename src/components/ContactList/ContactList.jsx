import PropTypes from "prop-types";
import s from './ContactList.module.css'

export default function ContactList({ contacts,onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ name, number, id }) => (
        <li className={s.item} key={id}>
          <div className={s.info}>
            <p className={s.name}> {name}</p> 
            <p className={s.number}> {number}</p> 
          </div>
          
          <button 
          type="button"
          onClick={()=>onDeleteContact(id)}
          > 
          Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.objectOf(
            PropTypes.string
        )).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
}

