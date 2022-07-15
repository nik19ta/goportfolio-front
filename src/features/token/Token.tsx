import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {decode} from '../../utils/decodeToken';
import {setToken} from '../auth/authSlice';

const TokenSave: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const code = location.search.split('=')[1];

    if (code) {
      dispatch(setToken(code));
      navigate('/' + decode(code!).shortname, {replace: true});
    }

    return () => {};
  }, []);

  return (
    <div ></div>
  );
};


export default TokenSave;
