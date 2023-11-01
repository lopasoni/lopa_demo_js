import { Avatar, Button, Grid, InputAdornment, Pagination, TextField } from '@mui/material';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import CreateUser from './models/CreateUser';
import { addUser } from './allFunction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchAllList, updateUser } from 'redux/slice/userListing';
import Update from './models/Update';

function UserListing() {
  const [open, setOpen] = useState();
  const [openForUpdate, setOpenForUpdate] = useState();
  const [updatData, setUpdatData] = useState();
  const selector = useSelector((state) => state.userListing.listingData);
  const data = selector?.data;
  const distpach = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (searchText.length === 0) {
      distpach(fetchAllList({ page }));
    } else {
      distpach(fetchAllList({ search: searchText, page }));
    }
  }, [searchText, page]);

  const handleAddUser = () => {
    setOpen(true);
  };

  const handleUpdateUser = (data) => {
    setOpenForUpdate(true);
    setUpdatData(data);
  };
  const addUserApiCall = (body) => {
    addUser(body);
  };

  const handleSearch = () => {
    distpach(fetchAllList({ search: searchText }));
  };

  const shortData = () => {
    if (!toggle) {
      setToggle(true);
      distpach(fetchAllList({ order: 'asc' }));
    } else {
      setToggle(false);
      distpach(fetchAllList({ order: 'desc' }));
    }
  };

  return (
    <Grid container direction={'column'} alignItems={'center'} justifyContent="center">
      <Button onClick={handleAddUser} color="error" variant="outlined">
        Add user
      </Button>
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <Button onClick={() => shortData()} color="error" variant="outlined">
          {toggle ? 'ASC' : 'DESC'}
        </Button>
      </div>

      <TextField
        sx={{ marginTop: '10px', width: '80%' }}
        label="Search"
        variant="outlined"
        color="error"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="outlined" color="error" onClick={handleSearch}>
                Search
              </Button>
            </InputAdornment>
          )
        }}
      />

      {open && <CreateUser addUser={(body) => addUserApiCall(body)} initialOpen={open} handleclose={() => setOpen(false)} />}
      {data && data.length <= 0 && <h1 style={{ color: 'red', marginTop: '200px' }}>Data not found</h1>}
      {data && data.length > 0 && (
        <TableContainer sx={{ width: '80%', marginTop: '20px' }} component={Paper}>
          <Table sx={{ border: '1px' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">PROFILE_PHOTO</TableCell>
                <TableCell align="center">FIRST_NAME</TableCell>
                <TableCell align="center">LAST_NAME</TableCell>
                <TableCell align="center">EMAIL</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: '1px' } }}>
                    <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Avatar alt="Image not avilable" src={`${process.env.REACT_APP_BASE_URL}/${row.image}`} />
                    </TableCell>
                    <TableCell align="center">{row.first_name}</TableCell>
                    <TableCell align="center">{row.last_name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleUpdateUser(row)} variant="outlined" color="error">
                        UPDATE
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => distpach(deleteUser({ _id: row._id }))} variant="outlined" color="error">
                        DELETE
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {openForUpdate && (
        <Update
          data={updatData}
          updateUser={(body) => distpach(updateUser(body))}
          initialOpen={openForUpdate}
          handleclose={() => setOpenForUpdate(false)}
        />
      )}
      <div style={{ marginTop: '20px' }}></div>
      <Pagination
        style={{ position: 'fixed', bottom: '10px' }}
        defaultPage={1}
        count={7}
        variant="outlined"
        color="error"
        onChange={(e, v) => setPage(v)}
      />
    </Grid>
  );
}

export default UserListing;
