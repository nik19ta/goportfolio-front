import { Button, Empty, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from '../../styles/CardProject.module.css'

import { EditFilled, DeleteFilled, FileImageOutlined } from "@ant-design/icons";

interface ICardProject {
    username: string
    uuid: string
    projectname: string
    type: number
    prewiew: string
    isowner: boolean
    OnDelete: Function
    OnEdit: Function
    OnImage: Function
}


const CardProject: React.FC<ICardProject> = ({username, uuid, projectname, type, prewiew, isowner, OnDelete, OnEdit, OnImage }) => {
    let navigate = useNavigate();
    
    return (
        <Button className={styles.card_link_btn} onClick={(e: any) => {
            if (e.target.localName !== "path" && e.target.localName !==  "svg" && e.target.localName !==  "button" && e.target.localName !==  "input")  {
                navigate(`/${username}/project/${uuid}`, { replace: false });
            }
         }}>
            <button id="edit_btn" className={styles.edit_icon} onClick={() => { OnEdit(uuid) }} ><EditFilled  /></button>
            <button id="del_btn" className={styles.delete_icon} onClick={() => { OnDelete(uuid) }} ><DeleteFilled /></button>
            <button id="img_btn" className={styles.set_img_icon} onClick={() => { OnImage(uuid) }} >
                <label htmlFor="file-input">
                    <FileImageOutlined />
                </label>
                <input id="file-input" type="file" onChange={(e) => OnImage(e, uuid)} />
            </button>
            <div className={styles.main_container_item} >
                {prewiew !== "empty" && <div className={styles.main_container_item_image} style={{ backgroundImage: `url(${process.env.REACT_APP_SERVER_HOST + "/images/" + prewiew})`}} ></div>}
                {prewiew == "empty" && <Empty className={styles.main_container_item_empty} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                <div className={styles.main_container_item_text}>
                    <p className={styles.more_text}> {projectname} </p>
                </div>
        </div>
        {isowner && <p className={styles.type_lable} >{type == 1 ? "private" : "public"}</p>}
        </Button>
    )
}

export default CardProject