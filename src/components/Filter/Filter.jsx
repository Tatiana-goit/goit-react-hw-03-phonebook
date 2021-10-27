import PropTypes from 'prop-types';
import s from './Filter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <div className={s.section}>
      <span className={s.text}> Фильтр по имени</span>
      <input className={s.input} type="text" value={value} onChange={onChange}></input>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

