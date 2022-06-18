import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { AuthState, LoginBody, RegistrationBody } from '../../interfaces/auth';
import { errNotification, successNotification } from '../../utils/notification';

import { fetchLogin, fetchRegistration } from './authAPI';

import Storage from '../../utils/storage'

const initialState: AuthState = {
  token: "",
  load: false
};

export const loginUser = createAsyncThunk('Auth/Login', async (body: LoginBody) => {
    const response = await fetchLogin(body);
    
    if (response.status == 200) {
        const token = await response.json();
        successNotification("Вы успешно вошли в систему", "")
        return token.token;
    } else {
        errNotification("Ошибка входа", "Не верный логин или пароль")
        return ""
    }
  }
);

export const registrationUser = createAsyncThunk('Auth/Registration', async (body: RegistrationBody) => {
    const response = await fetchRegistration(body);

    if (response.status == 200) {
        const token = await response.json();
        successNotification("Вы успешно зарегестрировались", "")
        return token.token;
    } else if (response.status == 409) {
      errNotification("Ошибка регистрации", "Аккаунт с такой почтой или username'ом уже существует")
      return ""
    } else {
      errNotification("Ошибка регистрации", "Что то то пошло не так ")
      return ""
    }
  }
);

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      Storage.set('api_token', action.payload)
    },
    exitFromAccount: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      Storage.delete('api_token')
    }
  },
  extraReducers: (builder) => {
    builder
    // Login
      .addCase(loginUser.pending, (state) => {
        state.load = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.load = false;
        state.token = action.payload
        
        Storage.set('api_token', action.payload)
      })
    // Registration
      .addCase(registrationUser.pending, (state) => {
        state.load = true;
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        state.load = false;
        state.token = action.payload
        Storage.set('api_token', action.payload)
      });
  },
});

export const { setToken, exitFromAccount } = AuthSlice.actions;

export const getToken = (state: RootState) => state.auth.token;
export const getLoadStatus = (state: RootState) => state.auth.token;

export default AuthSlice.reducer;
