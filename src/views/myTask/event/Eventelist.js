import React, { useState } from 'react';
import '../event/style/Eventlist.scss';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { setData } from '../../../redux/slice/eventCatagorySlice';
import Papa from 'papaparse';
import { setToast } from 'redux/slice/tostSlice';
import { succes } from 'App';

function Eventelist() {
  const data = useSelector((state) => state.eventCatagorySlice.eventeCatagoryData);
  const [jsonData, setJsonData] = useState(null);
  const [formdata, setFormData] = useState({
    id: nanoid(),
    catagory: '',
    name: '',
    location: '',
    date: '',
    inogration: ''
  });
  const [csvData, setCSVData] = useState([]);

  const alldata = useSelector((state) => state.eventCatagorySlice.eventListing);
  const dispach = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispach(setData(formdata));
    setFormData({
      id: nanoid(),
      catagory: '',
      name: '',
      location: '',
      date: '',
      inogration: ''
    });
    dispach(
      setToast({
        type: succes,
        msg: 'Add data sccessfully'
      })
    );
  };

  const convertToJSON = () => {
    const jsonFormatData = alldata.map((item) => ({
      EventCategory: item.catagory,
      Name: item.name,
      Location: item.location,
      Date: item.date,
      Inauguration: item.inogration
    }));
    const jsonDataX = JSON.stringify(jsonFormatData);
    setJsonData(jsonDataX);
    downloadJSON(jsonDataX);
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

  const handleExportCSV = (data) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    try {
      const file = e.target.files[0];

      Papa.parse(file, {
        complete: (result) => {
          const parsedData = result.data;
          if (parsedData && parsedData.length > 0) {
            setCSVData(parsedData);
          } else {
            console.log('uplod ypur file');
          }
        },
        header: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="EventeList">
      <p>Select your csv file</p>
      <input style={{ padding: '22px', width: '250px' }} type="file" accept=".csv" onChange={handleFileUpload} />

      <form action="" onSubmit={handleSubmit}>
        <div className="setLaIn">
          <label htmlFor="cat">Select catagory</label>

          <select id="cat" required value={formdata.catagory} name="catagory" onChange={handleChange}>
            <option>catagory</option>
            {data?.map((item) => {
              return (
                <option key={item.id} value={item.name} name={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="setLaIn">
          <label htmlFor="name">Name :</label>
          <input id="name" value={formdata.name} name="name" onChange={handleChange} placeholder="Enter the name" type="text" required />
        </div>
        <div className="setLaIn">
          <label htmlFor="location">Location :</label>
          <input
            id="location"
            value={formdata.location}
            name="location"
            onChange={handleChange}
            placeholder="Enter the Location"
            type="text"
            required
          />
        </div>
        <div className="setLaIn">
          <label htmlFor="date">Date :</label>
          <input id="date" name="date" value={formdata.date} onChange={handleChange} placeholder="Enter the Date" type="date" required />
        </div>{' '}
        <div className="setLaIn">
          <label htmlFor="ino">Inogration :</label>
          <input
            id="ino"
            value={formdata.inogration}
            name="inogration"
            placeholder="Enter the Inogration"
            onChange={handleChange}
            type="text"
            required
          />
        </div>
        <input type="submit" value={'save'} className="button-primary" />
      </form>

      <div className="setDiv">
        <table>
          <thead>
            <tr>
              <th>EventeCatagory</th>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Inogration</th>
            </tr>
          </thead>
          <tbody>
            {alldata &&
              alldata.map((item) => {
                return (
                  <>
                    <tr key={item.id}>
                      <td>{item.catagory}</td>
                      <td>{item.name}</td>
                      <td>{item.location}</td>
                      <td>{item.date}</td>
                      <td>{item.inogration}</td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>

        <button
          style={{ marginBlock: '10px' }}
          className="button-primary"
          onClick={() => {
            handleExportCSV(alldata && alldata);
          }}
        >
          Covert csv
        </button>
        <button onClick={convertToJSON} className="button-primary">
          Convert JSON
        </button>
      </div>
      <p>Json data</p>
      <p>{jsonData}</p>
      <p>Csv data</p>
      <p>
        {csvData && (
          <div style={{ paddingBottom: '150px' }}>
            {csvData.map((item, index) => (
              <tr key={index}>
                <td>{item.catagory}</td>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td>{item.date}</td>
                <td>{item.inogration}</td>
              </tr>
            ))}{' '}
          </div>
        )}
      </p>
    </div>
  );
}

export default Eventelist;
