import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function ViewHistory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PICKINGS' });
    dispatch({ type: 'FETCH_ALL_LOCKS' });
    dispatch({ type: 'FETCH_BRANDS' });
    dispatch({ type: 'FETCH_TYPES' });
  }, []);

  const rows = useSelector((store) => store.pickings);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    // numeric true here for spacing
    { id: 'success', numeric: true, disablePadding: true, label: 'Solved' },
    { id: 'nickname', numeric: false, disablePadding: false, label: 'Lock' },
    { id: 'brand', numeric: false, disablePadding: false, label: 'Brand' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    {
      id: 'time_taken',
      numeric: true,
      disablePadding: false,
      label: 'Time Taken',
    },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  ];

  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {/* this is where i can put filtered stuff */}
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h5"
            id="tableTitle"
            component="div"
          >
            Picking History
          </Typography>
        )}

        {/* {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )} */}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper} className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody minRows={0}>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `picking-row-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      tabIndex={-1}
                      key={row.name}
                      //   selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="right"
                      >
                        {row.success ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell>{row.nickname}</TableCell>
                      <TableCell>{row.brand}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell align="right">{row.time_taken}</TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}

// function ViewHistory() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const pickings = useSelector((store) => store.pickings);
//   const locks = useSelector((store) => store.locks);
//   const brands = useSelector((store) => store.brands);
//   const types = useSelector((store) => store.types);
//   const filter = useSelector((store) => store.filter);

//   useEffect(() => {
//     dispatch({ type: 'FETCH_ALL_PICKINGS' });
//     dispatch({ type: 'FETCH_ALL_LOCKS' });
//     dispatch({ type: 'FETCH_BRANDS' });
//     dispatch({ type: 'FETCH_TYPES' });
//   }, []);

//   return (
//     <Container maxWidth="lg">
//       <NewTable />

//       <span>Lock - </span>
//       <select
//         value={filter.lock}
//         onChange={(event) =>
//           dispatch({
//             type: 'FETCH_ALL_PICKINGS',
//             payload: { ...filter, lock: event.target.value },
//           })
//         }
//       >
//         <option value={0}>All Locks</option>
//         {locks &&
//           locks.map((lock) => (
//             <option key={lock.id} value={lock.id}>
//               {lock.nickname}
//             </option>
//           ))}
//       </select>
//       <br></br>
//       <span>Brand - </span>
//       <select
//         value={filter.brand}
//         onChange={(event) =>
//           dispatch({
//             type: 'FETCH_ALL_PICKINGS',
//             payload: { ...filter, brand: event.target.value },
//           })
//         }
//       >
//         <option value={0}>All Brands</option>
//         {brands &&
//           brands.map((brand) => (
//             <option key={brand.id} value={brand.id}>
//               {brand.brand}
//             </option>
//           ))}
//       </select>
//       <span>Type - </span>
//       <select
//         value={filter.type}
//         onChange={(event) =>
//           dispatch({
//             type: 'FETCH_ALL_PICKINGS',
//             payload: { ...filter, type: event.target.value },
//           })
//         }
//       >
//         <option value={0}>All Types</option>
//         {types &&
//           types.map((type) => (
//             <option key={type.id} value={type.id}>
//               {type.type}
//             </option>
//           ))}
//       </select>
//       <button
//         onClick={() =>
//           dispatch({
//             type: 'FETCH_ALL_PICKINGS',
//           })
//         }
//       >
//         Reset
//       </button>
//       <table>
//         <thead>
//           <tr>
//             <th>Lock</th>
//             <th>Brand</th>
//             <th>Type</th>
//             <th>Solved</th>
//             <th>Time</th>
//             <th>Date</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {pickings.map((picking) => (
//             <tr key={picking.id}>
//               <td>{picking.nickname}</td>
//               <td>{picking.brand}</td>
//               <td>{picking.type}</td>
//               <td>{picking.success}</td>
//               <td>{picking.time_taken}</td>
//               <td>{picking.date}</td>
//               <td>
//                 <button
//                   onClick={() => {
//                     history.push({ pathname: `/pickDetails/${picking.id}` });
//                   }}
//                 >
//                   Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </Container>
//   );
// };

export default ViewHistory;
