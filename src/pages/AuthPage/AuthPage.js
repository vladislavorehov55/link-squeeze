import {Routes, Route} from 'react-router-dom';
import LoginForm from "./LoginForm/LoginForm";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import classes from './AuthPage.module.css'
const AuthPage = ({setIsAuth, setAlertText}) => {
  const signIn = async (username, password) => {
    const res = await fetch('http://79.143.31.216/login', {
      method: 'POST',
      body: `username=${username}&password=${password}`,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    const json = await res.json();
    if (!res.ok) {
      const alertText = Array.isArray(json.detail) ? 'Извините, что-то пошло не так.' : json.detail
      setAlertText(alertText);
      return
    }
    localStorage.setItem('tokenInfo', JSON.stringify(json));
    setIsAuth(true);
  }
  return (
    <div className={classes.wrap}>
      <Routes>
        <Route path='/' element={<LoginForm signIn={signIn}/>}/>
        <Route path='/registration' element={<RegistrationForm signIn={signIn} setAlertText={setAlertText}/>}/>
       </Routes>
    </div>

  )
}
export default AuthPage