import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../examhome/ExameHome.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../examhome/ExameHome.scss';

function ExamHome() {
  const [value, setValue] = React.useState('Enter_the_catagory');
  const nevigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example">
          <Tab onClick={() => nevigate('/exam')} value="Enter_the_catagory" label="Enter_the_catagory" />
          <Tab onClick={() => nevigate('/exam/takeqution')} value="Enter_the_qutions" label="Enter_the_qutions" />
          <Tab onClick={() => nevigate('/exam/takeexam')} value="Give_exame" label="Give_exame" />
        </Tabs>
      </Box>

      <Outlet />
    </>
  );
}

export default ExamHome;
