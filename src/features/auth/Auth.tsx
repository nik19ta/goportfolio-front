import React from 'react';
import {Outlet} from 'react-router-dom';

import styles from './Auth.module.css';

const Auth = () => {
  return (
    <div className={styles.authContainer} >
      <div className={styles.auth} >
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Auth;
