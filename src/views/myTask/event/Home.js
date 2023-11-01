import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function Home() {
  const [value, setValue] = React.useState('Event Catagory');
  const nevigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example">
          <Tab onClick={() => nevigate('/event')} value="Event Catagory" label="Event Catagory" />
          <Tab onClick={() => nevigate('/event/eventlist')} value="Event List" label="Event List" />
        </Tabs>
      </Box>
      <Outlet />
    </div>
  );
}

export default Home;
