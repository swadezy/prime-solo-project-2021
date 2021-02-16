import { useEffect } from 'react';
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

function Admin() {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);
  const brands = useSelector((store) => store.brands);
  const types = useSelector((store) => store.types);

  useEffect(() => {
    dispatch({ type: 'FETCH_USERS' });
    dispatch({ type: 'FETCH_BRANDS' });
    dispatch({ type: 'FETCH_TYPES' });
  }, []);

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
              <Typography variant="h6" display="inline">
                Users
              </Typography>
              <Tooltip title="Edit users">
                <IconButton
                  aria-label="Edit users"
                  // onClick={}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <List dense={true}>
                {users &&
                  users.map((user) => (
                    <ListItem style={{ padding: '0' }}>
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.username}
                        secondary={user.admin ? 'Admin' : null}
                      />
                      <ListItemIcon>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
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
              <Typography variant="h6">Brands</Typography>
              <List dense={true}>
                {brands &&
                  brands.map((brand) => (
                    <ListItem style={{ padding: '0' }}>
                      {/* <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar> */}
                      <ListItemText primary={brand.brand} />
                      <ListItemIcon>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
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
              <Typography variant="h6">Types</Typography>
              <List dense={true}>
                {types &&
                  types.map((type) => (
                    <ListItem style={{ padding: '0' }}>
                      {/* <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar> */}
                      <ListItemText primary={type.type} />
                      <ListItemIcon>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
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
