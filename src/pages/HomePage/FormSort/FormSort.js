import classes from "./FormSort.module.css";
import Select from "react-select";
import {colForSortOptions, orderOptions} from "../HomePage";

const FormSort = ({colForSort, isSorted, setSortedOffset, setColForSort, setOrder, order, setOffset, setAlertText}) => {
  const applySort = (e) => {
    e.preventDefault()
    if (!colForSort) {
      setAlertText('Не выбрали столбец для сортировки')
      return
    }
    isSorted.current = true;
    setSortedOffset(0);
  }
  const resetSort = (e) => {
    e.preventDefault();
    isSorted.current = false;
    setOffset(0)
    setSortedOffset(null);
    setOrder(orderOptions[0]);
    setColForSort(null);
  }

  const changeSelectColForSort = (selectedOption) => {
    setColForSort(selectedOption)
  }
  const changeSelectOrder = (selectedOption) => {
    setOrder(selectedOption)
  }
  return (
    <form className={classes.form}>
      <div className={classes.selectGroup}>
        <label>Выберите столбец</label>
        <div className={classes.selectWrap}>
          <Select options={colForSortOptions}
                  value={colForSort}
                  onChange={changeSelectColForSort}
          />
        </div>
      </div>
      {
        colForSort &&
        <div className={classes.selectGroup}>
          <label>Выберите тип</label>
          <div className={classes.selectWrap}>
            <Select value={order}
                    options={orderOptions}
                    onChange={changeSelectOrder}
            />
          </div>
        </div>
      }
      <div>
        <button className={classes.btn} onClick={applySort}>Применить</button>
        <button className={classes.btn} onClick={resetSort}>Отменить</button>
      </div>
    </form>
  );
};

export default FormSort;