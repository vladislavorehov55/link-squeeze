import classes from './Alert.module.css'
const Alert = ({content, setAlertText}) => {
  const closeAlert = () => {
    setAlertText('')
  }
  return (
    <div className={classes.wrap}>
      <span>{content}</span>
      <span className={classes.close} onClick={closeAlert}>&times;</span>
    </div>
  );
};

export default Alert;