import { Header } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import styles from './User.module.css'; 

const UserContainer: React.FC = () => {
    return (
        <div className={styles.container} style={{paddingTop: "60px"}} >
            <div className={styles.content}  >
                <Outlet></Outlet>
            </div>
        </div>
    )
}


export default UserContainer;