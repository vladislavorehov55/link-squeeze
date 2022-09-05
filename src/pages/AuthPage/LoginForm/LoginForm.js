import {Link} from "react-router-dom";
import {useState} from "react";
import classes from './LoginForm.module.css';

const LoginForm = ({signIn}) => {
  const [form, setForm] = useState({login: '', password: ''});
  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    signIn(form.login, form.password);
    setForm({login: '', password: ''});
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input placeholder='Введите логин' onChange={changeHandler} value={form.login}
             name='login'
             className={classes.input}
             required={true}
      />
      <input placeholder='Введите пароль' onChange={changeHandler} value={form.password}
             name='password'
             className={classes.input}
             type='password'
             required={true}
      />
      <div className={classes.linkWrap}>
        <Link to='/registration' className={classes.link}>регистарция</Link>
      </div>
      <button className={classes.btn}>Войти</button>
    </form>


  )
}
export default LoginForm