import {Routes, Route, Navigate} from "react-router-dom";
import SqueezeLinkForm from "./SqueezeLinkForm/SqueezeLinkForm";
import classes from './HomePage.module.css'
import LinksTable from "./LinksTable/LinksTable";
import {useEffect, useRef, useState} from "react";
import FormSort from "./FormSort/FormSort";
import Pagination from "../../components/Pagination/Pagination";
export const colForSortOptions = [
  {value: '', label: 'no'},
  {value: 'short', label: 'short'},
  {value: 'target', label: 'target'},
  {value: 'counter', label: 'counter'}
]
export const orderOptions = [
  {value: 'asc', label:'asc'},
  {value: 'desc', label: 'desc'}
]
const HomePage = ({setAlertText}) => {
  const limit = 1;
  const [links, setLinks] = useState([]);
  const isSorted = useRef(false)
  const [offset, setOffset] = useState(0);
  const [sortedOffset, setSortedOffset] = useState(null);
  const [colForSort, setColForSort] = useState(null);

  const [order, setOrder] = useState(orderOptions[0]);

  const loadLinks = async () => {
    const {token_type, access_token} = JSON.parse(localStorage.getItem('tokenInfo'));
    const params = isSorted.current === false ? `offset=${offset}` :
      `order=${order.value}_${colForSort.value}&offset=${sortedOffset}`;
    const res = await fetch(`http://79.143.31.216/statistics?limit=${limit}&${params}`, {
      headers: {
        'Authorization': `${token_type} ${access_token}`
      }
    })
    const json = await res.json();
    if (json.length === 0) {
      isSorted.current === false ? setOffset(prevState => prevState - limit) :
        setSortedOffset(prevState => prevState - limit)
      return
    }
    setLinks(json)
  }

  useEffect(() => {
    loadLinks()
  },[offset, sortedOffset])


  const prevClickHandler = () => {
    if (isSorted.current === false) {
      if (offset - limit >= 0) {
        setOffset(prevState => prevState - limit)
      }
    }
    else {
      if (sortedOffset - limit >=0) {
        setSortedOffset(prevState => prevState - limit)
      }
    }

  }
  const nextClickHandler = () => {
    if (isSorted.current === false) {
      setOffset(prevState => prevState + limit);
    }
    else {
      setSortedOffset(prevState => prevState + limit)
    }
  }
  return (
    <div className={classes.wrap}>
      <Routes>
        <Route path='/' element={
          <>
            <FormSort colForSort={colForSort}
                      isSorted={isSorted}
                      setSortedOffset={setSortedOffset}
                      setColForSort={setColForSort}
                      setOrder={setOrder}
                      order={order}
                      setOffset={setOffset}
                      setAlertText={setAlertText}
            />
            <SqueezeLinkForm setLinks={setLinks} setAlertText={setAlertText}/>
            <LinksTable links={links}/>
            <Pagination nextClickHandler={nextClickHandler}
                        prevClickHandler={prevClickHandler()}
            />
          </>
        }/>
        <Route path='*' element={<Navigate to='/' replace/>}/>
      </Routes>
    </div>
  );
};

export default HomePage;