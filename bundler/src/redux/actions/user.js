import { server } from '../store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,

        // whenever cookies is used
      }
    );
    console.log(data)

    dispatch({ type: 'loginSuccess', payload: data });

    console.log(data);
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );
    console.log(data.user);
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(
      `${server}/logout`,

      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};

export const register = (name,email,password,file)=> async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });
    const { data } = await axios.post(`${server}/register`,{name,email,password,file}, {
      headers: {
        "Content-Type":"application/json"
      },
      withCredentials: true,

      // whenever cookies is used
    });

   await  dispatch({ type: 'registerSuccess', payload: data });

    console.log(data);
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};
