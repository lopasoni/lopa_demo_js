import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../takequtions/Takeqution.scss';
import { addQution } from '../../../../redux/slice/examslice';
import { nanoid } from '@reduxjs/toolkit';
import { setToast } from 'redux/slice/tostSlice';
import { succes } from 'App';

function Takequtions() {
  const [formdata, setFormdata] = useState({
    id: '',
    catagory: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    qution: '',
    ans: ''
  });
  const dispach = useDispatch();
  const catagoryData = useSelector((state) => state.examslice.catagory);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    dispach(
      addQution({
        id: nanoid(),
        catagory: formdata.catagory,
        option1: formdata.option1,
        option2: formdata.option2,
        option3: formdata.option3,
        option4: formdata.option4,
        qution: formdata.qution,
        ans: { ans: formdata.ans, ansId: nanoid() }
      }),
      dispach(
        setToast({
          type: succes,
          msg: 'Catagory deleted scessfully'
        })
      )
    );
    setFormdata({
      id: '',
      catagory: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      qution: '',
      ans: {
        ans: '',
        id: ''
      }
    });
  };
  return (
    <div className="Takeqution">
      <form onSubmit={handlSubmit} action="">
        <label htmlFor="catagory">Entrt the catagory</label>
        <select id="catagory" required value={formdata.catagory} name="catagory" onChange={handleChange}>
          <option>catagory</option>
          {catagoryData?.map((item) => {
            return (
              <option key={item} value={item} name={item}>
                {item}
              </option>
            );
          })}
        </select>

        <label htmlFor="qution">Enter the qution</label>
        <textarea id="qution" required onChange={handleChange} value={formdata.qution} name="qution" cols="30" rows="10" />

        <input required name="option1" onChange={handleChange} value={formdata.option1} placeholder="first option" type="text" />
        <input required name="option2" onChange={handleChange} value={formdata.option2} placeholder="second option" type="text" />
        <input required name="option3" onChange={handleChange} value={formdata.option3} placeholder="third option" type="text" />
        <input required name="option4" onChange={handleChange} value={formdata.option4} placeholder="forth option" type="text" />

        <label htmlFor="ans">Write right answer</label>
        <input
          id="ans"
          required
          onChange={handleChange}
          value={formdata.ans.ans}
          name="ans"
          placeholder="right ans"
          className="Right answer"
          type="text"
        />

        <input type="submit" className="button-primary" />
      </form>

      <div style={{ paddingBottom: '100px' }}></div>
    </div>
  );
}

export default Takequtions;
