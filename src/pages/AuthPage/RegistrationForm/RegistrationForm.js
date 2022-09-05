import {useState} from "react";
import classes from './RegistrationForm.module.css'

const RegistrationForm = ({signIn, setAlertText}) => {
  const [form, setForm] = useState({login: '', password: '', repeatedPassword: ''});
  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    if (form.password !== form.repeatedPassword) {
      return
    }
    const res = await fetch(`http://79.143.31.216/register?username=${form.login}&password=${form.password}`, {
      method: 'POST',
    })
    const json = await res.json();
    if (!res.ok) {
      const alertText = Array.isArray(json.detail) ? 'Извините, что-то пошло не так.' : json.detail
      setAlertText(alertText);
    }
    else {
      signIn(form.login, form.password);
    }
    setForm({login: '', password: '', repeatedPassword: ''});
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.inputGroup}>
        <span className={classes.label}>Введите логин</span>
        <input className={classes.input} placeholder='Введите логин'
               name='login'
               value={form.login}
               onChange={changeHandler}/>
      </div>
      <div className={classes.inputGroup}>
        <span className={classes.label}>Введите пароль</span>
        <input className={classes.input} type="password" placeholder='Введите пароль'
               name='password'
               value={form.password}
               onChange={changeHandler}/>
      </div>
      <div className={classes.inputGroup}>
        <span className={classes.label}>Повторите пароль</span>
        <input className={classes.input} type="password" placeholder='Введите пароль еще раз'
               name='repeatedPassword'
               value={form.repeatedPassword}
               onChange={changeHandler}/>
      </div>
      <div className={classes.btnWrap}>
        <button className={classes.btn}>Зарегистрироваться</button>
      </div>
    </form>

  )
}
export default RegistrationForm