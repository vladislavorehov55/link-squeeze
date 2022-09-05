import {useState} from 'react';
import classes from './SqueezeLinkForm.module.css'
const SqueezeLinkForm = ({setLinks, setAlertText}) => {
  const [value, setValue] = useState('');
  const changeInputHandler = (e) => {
    setValue(e.target.value);
  }
  const submitHandler = async(e) => {
    e.preventDefault();
    const {token_type, access_token} = JSON.parse(localStorage.getItem('tokenInfo'));
    const res = await fetch(`http://79.143.31.216/squeeze?link=${value}`, {
      method: 'POST',
      headers: {
        'Authorization': ` ${token_type} ${access_token}`
      }
    })
    const json = await res.json();
    if (!res.ok) {
      const alertText = Array.isArray(json.detail) ? 'Извините, что-то пошло не так.' : json.detail
      setAlertText(alertText);
      return
    }
    setLinks(prevState => [...prevState, json]);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input placeholder='Введите ссылку'
             className={classes.linkInput}
             value={value} onChange={changeInputHandler}/>
      <button className={classes.btn}>Сократить</button>
    </form>
  );
};

export default SqueezeLinkForm;