import './App.css';
import {useMemo, useState} from "react";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import Alert from "./components/Alert/Alert";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [alertText, setAlertText] = useState('')
  const page = useMemo(() => {
    if (isAuth) {
      return <HomePage setAlertText={setAlertText}/>
    }
    return <AuthPage setIsAuth={setIsAuth} setAlertText={setAlertText}/>
  },[isAuth])
  return (
    <div className="App">
      {
        alertText && <Alert content={alertText} setAlertText={setAlertText}/>
      }
      {page}
    </div>
  );
}

export default App;
