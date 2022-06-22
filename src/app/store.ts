import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectSlice from '../features/project/projectSlice';
import userSlice from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    project: projectSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
