import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Avatar,
  Box,
  Container,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

function Admin() {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);
  const brands = useSelector((store) => store.brands);
  const types = useSelector((store) => store.types);
  const [editUsers, setEditUsers] = useState(false);
  const [editBrands, setEditBrands] = useState(false);
  const [editTypes, setEditTypes] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_USERS' });
    dispatch({ type: 'FETCH_BRANDS' });
    dispatch({ type: 'FETCH_TYPES' });
  }, []);

  const handleUserEdit = () => {
    setEditUsers(!editUsers);
  };

  const handleBrandEdit = (event) => {
    event.preventDefault();
    editBrands ? dispatch({ type: 'UPDATE_BRANDS', payload: brands}) : null;
    setEditBrands(!editBrands);
  };

  const handleTypeEdit = () => {
    editTypes ? dispatch({ type: 'UPDATE_TYPES', payload: types}) : null;
    setEditTypes(!editTypes);
  };

  return (
    <Container maxWidth="lg">
      <br></br>
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={12}>
          <Typography variant="h5">Manage Data</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Box m={2} p={2}>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" style={{ flex: 1 }}>
                  Users
                </Typography>
                <Tooltip title={editUsers ? 'Save users' : 'Edit users'}>
                  <IconButton aria-label="Edit users" onClick={handleUserEdit}>
                    {editUsers ? <SaveIcon /> : <EditIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
              <List dense={true}>
                {users &&
                  users.map((user) => (
                    <ListItem key={user.id} style={{ padding: '0' }}>
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.username}
                        secondary={user.admin ? 'Admin' : 'User'}
                      />
                      <ListItemIcon>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            dispatch({
                              type: 'DELETE_USER',
                              payload: user.id,
                            })
                          }
                        >
                          {editUsers ? <DeleteIcon /> : null}
                        </IconButton>
                      </ListItemIcon>
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Box m={2} p={2}>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" style={{ flex: 1 }}>
                  Brands
                </Typography>
                <Tooltip title={editBrands ? 'Save brands' : 'Edit brands'}>
                  <IconButton
                    aria-label="Edit brands"
                    onClick={handleBrandEdit}
                  >
                    {editBrands ? <SaveIcon /> : <EditIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
              <List dense={true}>
                {brands &&
                  brands.map((brand) => (
                    <ListItem
                      key={brand.id}
                      display="flex"
                      style={{ padding: '0' }}
                    >
                      {editBrands && brand.id !== 13 ? (
                        <TextField
                          style={{ flex: 1 }}
                          variant="outlined"
                          color="secondary"
                          size="small"
                          fullWidth
                          value={brand.brand}
                          onChange={(event) =>
                            dispatch({
                              type: 'SET_BRAND',
                              payload: {id: brand.id, brand: event.target.value},
                            })
                          }
                        />
                      ) : (
                        <ListItemText primary={brand.brand} />
                      )}
                      <ListItemIcon>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            dispatch({
                              type: 'DELETE_BRAND',
                              payload: brand.id,
                            })
                          }
                        >
                          {editBrands && brand.id !== 13 ? (
                            <DeleteIcon />
                          ) : null}
                        </IconButton>
                      </ListItemIcon>
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Box m={2} p={2}>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" style={{ flex: 1 }}>
                  Types
                </Typography>
                <Tooltip title={editTypes ? 'Save types' : 'Edit types'}>
                  <IconButton aria-label="Edit types" onClick={handleTypeEdit}>
                    {editTypes ? <SaveIcon /> : <EditIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
              <List dense={true}>
                {types &&
                  types.map((type) => (
                    <ListItem
                      key={type.id}
                      display="flex"
                      style={{ padding: '0' }}
                    >
                      {editTypes && type.id !== 7 ? (
                        <TextField
                          style={{ flex: 1 }}
                          variant="outlined"
                          color="secondary"
                          size="small"
                          fullWidth
                          value={type.type}
                          onChange={(event) =>
                            dispatch({
                              type: 'SET_TYPE',
                              payload: {id: type.id, type: event.target.value},
                            })
                          }
                        />
                      ) : (
                        <ListItemText primary={type.type} />
                      )}
                      <ListItemIcon>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            dispatch({
                              type: 'DELETE_TYPE',
                              payload: type.id,
                            })
                          }
                        >
                          {editTypes && type.id !== 7 ? <DeleteIcon /> : null}
                        </IconButton>
                      </ListItemIcon>
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Admin;
