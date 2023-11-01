import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCatagory } from '../../../../redux/slice/examslice';
import '../takecatagory/TakeCatagory.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteDataCat } from 'redux/slice/examslice';
import { setToast } from 'redux/slice/tostSlice';
import { error, succes } from 'App';

function TakeCatagory() {
  const [catagory, setcatagory] = useState('');
  const dispach = useDispatch();
  const catagorydata = useSelector((state) => state.examslice.catagory);

  const handleSubmit = (e) => {
    e.preventDefault();
    const repeteData = catagorydata.filter((item) => item === catagory);
    if (repeteData.length > 0) {
      dispach(
        dispach(
          setToast({
            type: error,
            msg: 'Catagory allready present'
          })
        )
      );
      return;
    }

    dispach(
      setToast({
        type: succes,
        msg: 'Catagory added scessfully'
      })
    );
    dispach(addCatagory(catagory));
    setcatagory('');
  };

  const deleteDataFirst = (name) => {
    dispach(
      setToast({
        type: succes,
        msg: 'Catagory deleted scessfully'
      })
    );
    dispach(deleteDataCat(name));
  };

  return (
    <div className="catagory">
      <form onSubmit={handleSubmit} className="handelInputs">
        <label htmlFor="cat">Enter the catagory:</label>
        <input
          style={{ marginBlock: '15px', padding: '15px' }}
          id="cat"
          required
          value={catagory}
          onChange={(e) => setcatagory(e.target.value)}
          type="text"
          placeholder="Enter the catagory"
        />
        <input type="submit" className="button-primary" />
      </form>

      {catagorydata.length > 0 && (
        <div className="tab">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Catagory Name</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {catagorydata?.map((row, i) => (
                  <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row}
                    </TableCell>
                    <TableCell align="right">
                      <button onClick={() => deleteDataFirst(row)} className="button-primary">
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default TakeCatagory;
