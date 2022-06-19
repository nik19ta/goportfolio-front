import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getProjectById } from "../../features/user/userSlice";

import styles from "../../styles/Project.module.css"

const Project: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useAppDispatch()

    const username = location.pathname.split("/")[1]

    useEffect(() => {
        const uuid = location.pathname.split("/")[3];
        dispatch(getProjectById(uuid))
    }, [])

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