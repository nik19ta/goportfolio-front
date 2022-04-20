import React, { useEffect } from 'react';

// For ant.d 
import 'antd/dist/antd.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Container from './pages/container/Container';
import HomeScreen from './pages/home/HomeScreen';
import Auth from './features/auth/Auth';
import Login from './pages/auth/Login';
import Registration from './pages/auth/Registration';
import User from './pages/user/User';
import Project from './pages/project/Project';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import Storage from './utils/storage'
import { setToken } from './features/auth/authSlice';
import { decode } from './utils/decodeToken';
import UserContainer from './features/user/User';

const App: React.FC = () => {
  let navigate = useNavigate();
  let location = useLocation();
  
  const dispatch = useAppDispatch()
  const token = useAppSelector((state: RootState) => state.auth.token)
  
  useEffect(() => {
      const usertoken = Storage.get("api_token")

      if (usertoken && token === "") {
        dispatch(setToken(usertoken))
      }

      if ((location.pathname !== "/auth/login" && location.pathname !== "/auth/registration") && usertoken === null || usertoken === "") {
        navigate("/auth/login", { replace: true });
      } else if (Storage.get("api_token") !== null && location.pathname.indexOf('auth/') !== -1) {
        navigate("/" + decode(usertoken!).shortname, { replace: true });
      }

    }, [token])
    
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Container />} >
          <Route index element={<HomeScreen />} />
          <Route path="auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
          </Route>
          <Route path=":username" element={<UserContainer />}>
            <Route index element={<User />} />
            <Route path="project/:id" element={<Project />} />
          </Route>
        </Route>
      </Routes>
    </div>  
  );
}

export default App;
