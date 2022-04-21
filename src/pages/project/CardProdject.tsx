import { Button, Empty, Input } from "antd";
import React, { useState } from "react";
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

    const [active_uuid, setactive_uuid] = useState(uuid)
    
    return (
        <div></div>
    )
}

export default CardProject