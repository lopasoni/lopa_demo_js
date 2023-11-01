import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

// ==============================|| APP ||============================== //
export const succes = 'SUCCESS';
export const error = 'ERROR';

const App = () => {
  const toastData = useSelector((state) => state.tostSlice.toast);

  useEffect(() => {
    if (toastData.type == 'SUCCESS') {
      toast.success(toastData.msg);
      return;
    }
    if (toastData.type == 'ERROR') {
      toast.error(toastData.msg);
      return;
    }
  }, [toastData]);

  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Toaster />
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
