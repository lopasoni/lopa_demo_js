import { error, succes } from 'App';
import axios from 'axios';
import { setToast } from 'redux/slice/tostSlice';
import { fetchAllList } from 'redux/slice/userListing';
import { store } from 'store';

//Add the user
export const addUser = async (body) => {
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/AddUser`, body, config);

    store.dispatch(fetchAllList());

    if (responce.data.message) {
      return store.dispatch(
        setToast({
          type: succes,
          msg: responce.data.message
        })
      );
    }

    if (responce.data.error.message) {
      return store.dispatch(
        setToast({
          type: error,
          msg: responce.data.error.message
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};
