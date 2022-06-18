import React from "react"
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../../styles/Project.module.css"

const Project: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const username = location.pathname.split("/")[1]

    return (
        <div id="container" className={styles.project_container} onClick={(e: any) => {
            if (e.target.id === "container") {
                navigate(`/${username}`, { replace: false });
                document.querySelector("body")!.style!.overflow = "auto"
            }
        }} >
            <div className={styles.project_content} >
                
            </div>
        </div>
    )
}

export default Project;