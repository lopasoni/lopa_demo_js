import React, { useState } from 'react';
import '../event/style/Eventcat.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, saveData } from '../../../redux/slice/eventCatagorySlice';
import { nanoid } from 'nanoid';
import { setToast } from 'redux/slice/tostSlice';
import { succes } from 'App';

function Eventcatagoy() {
  const [jsonData, setJsonData] = useState(null);
  const [handleInput, setHandleInput] = useState('');
  const dispach = useDispatch();
  const data = useSelector((state) => state.eventCatagorySlice.eventeCatagoryData);

  const handleClicke = (e) => {
    e.preventDefault();
    setHandleInput('');
    dispach(
      saveData({
        id: nanoid(),
        name: handleInput
      })
    );
    dispach(
      setToast({
        type: succes,
        msg: 'Add data sccessfully'
      })
    );
  };

  const handleDelete = (name) => {
    console.log(name);
    dispach(deleteEvent(name));
    dispach(
      setToast({
        type: succes,
        msg: 'Add deleted sccessfully'
      })
    );
  };

  const convertToJSON = () => {
    const jsonFormatData = data.map((item) => ({
      id: item.id,
      name: item.name
    }));
    const jsonDatax = JSON.stringify(jsonFormatData);
    setJsonData(jsonDatax);
    downloadJSON(jsonDatax);
  };

  const downloadJSON = (data) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="catagoryX">
      <form onSubmit={handleClicke} action="">
        <input required value={handleInput} onChange={(e) => setHandleInput(e.target.value)} type="text" placeholder="Enter the catagoy" />
        <input type="submit" value={'save'} className="button-primary" />
      </form>

      <table style={{ marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>name</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((item) => {
              return (
                <>
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleDelete(item.name);
                        }}
                        className="button-primary"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      <button style={{ marginBottom: '10px' }} onClick={convertToJSON} className="button-primary">
        Convert JSON
      </button>

      <p>Josn data</p>
      <p>{jsonData}</p>
      <div style={{ paddingBottom: '50px' }}></div>

      <div style={{ paddingBottom: '50px' }}></div>
    </div>
  );
}

export default Eventcatagoy;
