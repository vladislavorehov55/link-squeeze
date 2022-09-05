import classes from './LinksTable.module.css';
const LinksTable = ({links}) => {
  return (
    <table className={classes.table}>
      <thead>
      <tr>
        <th className={classes.th} data-name={'short'}>
          Сокращенная ссылка
        </th>
        <th className={classes.th} data-name={'target'}>
          Ссылка
        </th>
        <th className={classes.th} data-name={'counter'}>
        </th>
      </tr>
      </thead>
      <tbody>
        {
          links.map(row => <tr key={row.id}>{Object.values(row).slice(1).map((value, ind) => <td className={classes.td} key={ind}>{ind === 0 ? `http://79.143.31.216/s/${value}` : value}</td>)}</tr>)
        }
      </tbody>
    </table>
  );
};

export default LinksTable;