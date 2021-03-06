import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';

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
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { format } from 'date-fns/fp';

function ViewHistory() {
  const dispatch = useDispatch();
  const [tableView, setTableView] = useState(false);

  useEffect(() => {
    console.log('in history page load');
    dispatch({ type: 'FETCH_ALL_PICKINGS', payload: filter });
    dispatch({ type: 'FETCH_ALL_LOCKS' });
    handleSwitch();
  }, []);

  const rows = useSelector((store) => store.pickings);
  const locks = useSelector((store) => store.locks);
  const filter = useSelector((store) => store.filter);

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
    { id: 'success', align: 'center', disablePadding: false, label: 'Solved' },
    { id: 'nickname', align: 'left', disablePadding: false, label: 'Lock' },
    { id: 'brand', align: 'left', disablePadding: false, label: 'Brand' },
    { id: 'type', align: 'left', disablePadding: false, label: 'Type' },
    {
      id: 'time_taken',
      align: 'right',
      disablePadding: false,
      label: 'Time Taken',
    },
    { id: 'date', align: 'left', disablePadding: false, label: 'Date' },
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
              align={headCell.align}
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
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      display: 'flex',
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

  const EnhancedTableToolbar = () => {
    const classes = useToolbarStyles();

    return (
      <Toolbar className={clsx(classes.root)}>
        <Typography
          className={classes.title}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Picking History
        </Typography>

        <Button disabled={tableView} onClick={handleSwitch}>
          Table
        </Button>
        <Button disabled={!tableView} onClick={handleSwitch}>
          Chart
        </Button>

        <TextField
          color="secondary"
          variant="outlined"
          style={{ minWidth: 300 }}
          select
          label="Lock"
          value={filter}
          onChange={(event) =>
            dispatch({
              type: 'FETCH_ALL_PICKINGS',
              payload: event.target.value,
            })
          }
        >
          <MenuItem value={0}>All</MenuItem>
          {locks &&
            locks.map((lock) => (
              <MenuItem key={lock.id} value={lock.id}>
                {lock.nickname}
              </MenuItem>
            ))}
        </TextField>
        <Tooltip title="Reset filter">
          <IconButton
            aria-label="Reset filter"
            onClick={() =>
              dispatch({
                type: 'FETCH_ALL_PICKINGS',
              })
            }
          >
            <RotateLeftIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    );
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [opt, setOpt] = useState({
    options: {
      chart: {
        id: 'picking-line',
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: 'seconds taken',
        type: 'line',
        data: [],
      },
    ],
  });

  const handleSwitch = () => {
    setTableView(!tableView);
    const bars = rows.slice(0, 10);
    console.log('sliced this many rows', bars);
    const chartDate = bars.map((bar) => {
      return new Date(bar.date).toLocaleDateString("en-us");
    });
    const chartTime = bars.map((bar) => {
      return bar.time_taken;
    });
    setOpt({
      options: {
        chart: {
          id: 'picking-bar',
        },
        xaxis: {
          categories: chartDate,
        },
      },
      series: [
        {
          name: 'seconds taken',
          data: chartTime,
        },
      ],
      markers: {
        size: 3,
      },
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
      {/* {JSON.stringify(new Date(rows[3]?.date))}
      {JSON.stringify(format(new Date(rows[3]?.date), 'MM/dd/yyyy'))}
      {JSON.stringify(format(parseISO(new Date(rows[3]?.date)), 'MM/dd/yyyy'))} */}

      <br></br>
      <TableContainer component={Paper} className={classes.paper}>
        <Box m={3} p={1}>
          <EnhancedTableToolbar />
          {tableView ? (
            <div>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size="medium"
                  aria-label="enhanced table"
                >
                  <colgroup>
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '20%' }} />
                  </colgroup>
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const labelId = `picking-row-${index}`;
                        return (
                          <TableRow hover tabIndex={-1} key={row.name}>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              align="center"
                            >
                              {row.success ? <LockOpenIcon /> : <LockIcon />}
                            </TableCell>
                            <TableCell>{row.nickname}</TableCell>
                            <TableCell>{row.brand}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell align="right">
                              {row.time_taken}
                            </TableCell>
                            <TableCell
                              component={Link}
                              to={{
                                pathname: `/pickDetails/${row.id}`,
                              }}
                            >
                              {/* {format(row.date, 'PPPP')} */}
                              {new Date(row?.date).toLocaleDateString("en-us")}
                            </TableCell>
                          </TableRow>
                        );
                      })}
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
            </div>
          ) : (
            <Chart
              options={opt.options}
              series={opt.series}
              type="line"
              width="100%"
              height={500}
              style={{ margin: 'auto' }}
            />
          )}
        </Box>
      </TableContainer>
    </Container>
  );
}

export default ViewHistory;
