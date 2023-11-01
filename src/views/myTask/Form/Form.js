import React, { useState } from 'react';
import '../Form/Form.scss';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { deleteData, saveDataForUpdate, setDataAllUser, updateDataForm } from '../../../redux/slice/storeFormData';
import NewModal from '../models/NewModal';
import UpdateModel from '../models/UpdateModel';
import { setToast } from 'redux/slice/tostSlice';
import { succes } from 'App';

const itemsPerPage = 2; // Number of rows per page

function Form() {
  const dispach = useDispatch();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    checkboxes: {
      option1: false,
      option2: false,
      option3: false
    },
    city: ''
  });
  const alluser = useSelector((state) => state.storeFormData.alluser);

  // const [ind, setind] = useState();
  const [update, setUpdate] = useState(false);
  const [handleCheckBox, setHandleCheckBox] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [upadateProp, setUpdateProp] = useState();
  const [updateOn, setUpadteOn] = useState();
  const updateData = useSelector((state) => state.storeFormData.dataForDisaplay);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = alluser.slice(startIndex, endIndex);

  const totalPages = Math.ceil(alluser.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setData({
        ...data,
        checkboxes: {
          ...data.checkboxes,
          [name]: checked
        }
      });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispach(setDataAllUser([...alluser, data]));
    setData({
      name: '',
      email: '',
      password: '',
      gender: '',
      checkboxes: {
        option1: false,
        option2: false,
        option3: false
      },
      city: ''
    });
    dispach(
      setToast({
        type: succes,
        msg: 'data add sucessfully'
      })
    );
  };

  const getData = (index) => {
    const updateData = alluser.find((item, indexofdata) => indexofdata === index);
    dispach(saveDataForUpdate(updateData));
  };

  const handleUpdate = (index, newData) => {
    console.log(newData);
    dispach(updateDataForm({ index, newData }));
  };

  const setupadtedData = () => {
    alluser[ind] = data;
    setData({
      name: '',
      email: '',
      password: '',
      gender: '',
      city: '',
      checkboxes: {
        option1: false,
        option2: false,
        option3: false
      }
    });
    Swal.fire({
      title: 'Success!',
      text: 'Your data was updated successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleAllDeleteCheckBox = (e) => {
    if (e.target.checked) {
      setHandleCheckBox([...handleCheckBox, parseInt(e.target.value)]);
    } else {
      const x = handleCheckBox.filter((item) => item != parseInt(e.target.value));
      setHandleCheckBox(x);
    }
  };

  const deleteAllData = () => {
    if (handleCheckBox.length > 0) {
      const x = alluser.filter((item, index) => !handleCheckBox.includes(index));
      dispach(setDataAllUser(x));
      const y = handleCheckBox.filter((item) => alluser.includes(item));
      setHandleCheckBox(y);
    }
  };

  const deleteAllUserData = () => {
    dispach(setDataAllUser([]));
    setHandleCheckBox([]);
  };

  const deleteDataMy = (i) => {
    dispach(deleteData(i));
  };

  return (
    <div className="MainDiv">
      <h1>{!update ? 'Enter your data' : 'Update your data'}</h1>

      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="name" required value={data.name} onChange={handleChange} placeholder="Enter your name" />
        <input type="email" name="email" required value={data.email} onChange={handleChange} placeholder="Enter your email" />
        <input type="password" name="password" required value={data.password} onChange={handleChange} placeholder="Enter your password" />

        <div className="setRadio">
          <div className="setallradio">
            <label htmlFor="gender">Male</label>
            <input id="gender" type="radio" name="gender" value={'Male'} checked={data.gender === 'Male'} onChange={handleChange} />
          </div>

          <div className="setallradio">
            <label htmlFor="rd">Female</label>
            <input id="rd" type="radio" name="gender" value={'Female'} checked={data.gender === 'Female'} onChange={handleChange} />
          </div>

          <div className="setallradio">
            <label htmlFor="x">Other</label>
            <input id="x" type="radio" name="gender" value={'Other'} checked={data.gender === 'Other'} onChange={handleChange} />
          </div>
        </div>

        <div className="setRadio">
          <div className="setallradio">
            <label htmlFor="op1">OP1</label>
            <input id="op1" type="checkbox" name="option1" checked={data.checkboxes.option1} onChange={handleChange} />
          </div>

          <div className="setallradio">
            <label htmlFor="op2">OP2</label>
            <input id="op2" type="checkbox" name="option2" checked={data.checkboxes.option2} onChange={handleChange} />
          </div>

          <div className="setallradio">
            <label htmlFor="op3">OP3</label>
            <input id="op3" type="checkbox" name="option3" checked={data.checkboxes.option3} onChange={handleChange} />
          </div>
        </div>

        <label className="setDropDown">
          Select City:
          <select required name="city" value={data.city} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="ahmedabad">ahmedabad</option>
            <option value="surat">surat</option>
            <option value="rajkot">rajkot</option>
          </select>
        </label>

        {!update ? (
          <input type="submit" />
        ) : (
          <input
            onClick={() => {
              setupadtedData();
              setUpdate(false);
            }}
            type="button"
            value={'upadte'}
          />
        )}
      </form>

      <button
        style={{
          marginTop: '10px',
          background: '#ff6666',
          color: 'white',
          padding: '10px'
        }}
        onClick={deleteAllUserData}
      >
        Delete All
      </button>

      <button
        style={{
          marginTop: '10px',
          background: '#ff6666',
          color: 'white',
          padding: '10px'
        }}
        onClick={deleteAllData}
      >
        Delete
      </button>

      <table className="user-table">
        <thead>
          <tr>
            <th>delete</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>City</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((data, index) => (
            <tr key={index}>
              <td>
                <input onChange={handleAllDeleteCheckBox} type="checkbox" name="" id="" value={index} />
              </td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.password}</td>
              <td>{data.gender}</td>
              <td>{data.city}</td>
              <td>
                {Object.keys(data.checkboxes)
                  .filter((key) => data.checkboxes[key])
                  .join(', ')}
              </td>

              <td>
                <button
                  className="button-primary"
                  onClick={() => {
                    setUpdateProp(true);
                  }}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="button-primary"
                  onClick={() => {
                    setUpadteOn(true);
                    getData(index);
                  }}
                >
                  Update
                </button>
              </td>

              {upadateProp && (
                <NewModal closeModal={() => setUpdateProp(false)} data={index} dataDeleteData={(index) => deleteDataMy(index)} />
              )}
              {updateOn && (
                <UpdateModel
                  dataUp={updateData}
                  UpdateData={(index, updatedData) => {
                    handleUpdate(index, updatedData);
                  }}
                  closeModal={() => setUpadteOn(false)}
                  index={index}
                  dataDeleteData={(index) => deleteDataMy(index)}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button className="btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? 'active btn' : 'btn'}>
            {index + 1}
          </button>
        ))}

        <button className="btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Form;
