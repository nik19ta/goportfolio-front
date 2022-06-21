import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

import styles from './Auth.module.css';

const Auth = () => {
    return (
        <div className={styles.authContainer} >
            <div className={styles.auth} >
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Auth;
