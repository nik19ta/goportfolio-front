/* eslint-disable max-len */
import React from 'react';
import {Outlet} from 'react-router-dom';

import styles from './Auth.module.css';

import LogoGitHub from '../../assets/github/GitHub-120px.png';

const Auth = () => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.auth}>
        <Outlet></Outlet>

        <div className={styles.aouth2_links}>
          <a href={`${process.env.REACT_APP_SERVER_HOST}/api/auth/github/get_link`} >
            <img className={styles.aouth2_links__item}src={LogoGitHub} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
