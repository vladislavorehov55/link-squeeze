import classes from './Pagination.module.css';

const Pagination = ({prevClickHandler, nextClickHandler}) => {
  return (
    <div className={classes.wrap}>
      <span className={classes.item} onClick={prevClickHandler}>prev</span>
      <span className={classes.item} onClick={nextClickHandler}>next</span>
    </div>
  );
};

export default Pagination;