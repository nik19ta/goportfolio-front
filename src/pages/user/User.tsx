import { Avatar, Button, Card, Empty, Input, Modal, Tabs } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { createProject, deleteProject, renameProject } from "../../features/project/projectSlice";
import { getCategories, getProfile, getProjects } from "../../features/user/userSlice";
import { decode } from "../../utils/decodeToken";
import CardBtnCreate from "../project/CardBtnCreate";
import CardProject from "../project/CardProdject";

import { DeliveredProcedureOutlined, EditFilled, FileImageOutlined, DeleteFilled} from "@ant-design/icons";

import styles from './User.module.css'; 
import { fetchSetPrewiew } from "../../features/project/projectAPI";

import { Link, useNavigate } from "react-router-dom";


const { TabPane } = Tabs;

const User: React.FC = () => {
    let location = useLocation();

    const token = useAppSelector((state: RootState) => state.auth.token)
    const username = location.pathname.split("/")[1];
    
    const dispatch = useAppDispatch()
    
    const user_info = useAppSelector((state: RootState) => state.user)
    const categories = useAppSelector((state: RootState) => state.user.categories)
    const projects = useAppSelector((state: RootState) => state.user.projects)

    const [active_category, set_active_category] = useState("")
    // OWNER ACC OR NO
    const owner = (token ? decode(token!).shortname : "") === username

    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getProfile(username))
        dispatch(getCategories(username))
        dispatch(getProjects(username))
    }, [])

    useEffect(() => {
        if (categories !== undefined) {
            if (categories.length > 0) set_active_category(categories[0].uuid)
        }
    }, [categories])
    
    function callback(key: string) {
        console.log(key);
    }

    // МОДАЛЬНОЕ ОКНО 
    const [isModalToken, setisModalToken] = useState("");
    const [isModalText, setisModalText] = useState("");

    const showModal = (uuid: string) => {
        setisModalToken(uuid)
    };

    const handleOk = () => {
        // CLOSE
        setisModalToken("")

        // SAVE
        dispatch(renameProject({
            uuid: isModalToken,
            title: isModalText
        }))
        
        // DEL
        setisModalText("")
        // dispatch(getProjects(username))
    };

    const handleCancel = () => {
        setisModalToken("")
        setisModalText("")
    };

    // МОДАЛЬНОЕ ОКНО 

    return (
        <div>
            <div className={styles.avatar_container} >
                <Avatar style={{ backgroundColor: "#7265e6", verticalAlign: 'middle' }} size="large" gap={5} >
                    <p style={{fontSize: "16px"}} >{user_info.fullname !== undefined && <p> {user_info.fullname[0]} </p>}</p>
                </Avatar>
                <div>
                    <b style={{fontSize: "16px"}} >{user_info.fullname !== undefined && <p className={styles.avatar__text} > {user_info.fullname} </p>}</b>
                    {user_info.mail !== undefined && <p className={styles.avatar__text} > {user_info.mail} </p>}
                </div>
            </div> 

            <Modal 
                title="Редактировать название проекта" 
                visible={isModalToken.length > 0} 
                onOk={handleOk} 
                onCancel={handleCancel}
                cancelText="Отменить"
                okText="Переменовать проект" >
                <Input  
                    onChange={(e) => {setisModalText(e.target.value) }} 
                    prefix={<DeliveredProcedureOutlined className="site-form-item-icon" />} 
                    placeholder="Новое название проекта" />
            </Modal>

            <Tabs onChange={(e) => { set_active_category(e) }} >
                {categories && categories.map((caterory => (
                    <TabPane key={caterory.uuid} tab={caterory.name} >
                        
                    </TabPane>
                )))}
            </Tabs>

            <div className={styles.projects_list} >
                {owner && active_category !== "" && <CardBtnCreate onClick={async () => {
                    console.log("category uuid", active_category);
                    await dispatch(createProject(active_category))
                }} />}

                {projects && projects.map(project => {
                    if (project.category_uuid === active_category) {
                        return (
                            <Button className={styles.card_link_btn} onClick={(e: any) => {
                            if (e.target.localName !== "path" && 
                                e.target.localName !== "svg" && 
                                e.target.localName !== "button" && 
                                e.target.localName !== "input")  { 
                                    navigate(`/${username}/project/${project.uuid}`, { replace: false });
                                }}}>

                            <button id="edit_btn" className={styles.edit_icon} onClick={() => {showModal(project.uuid)}} ><EditFilled  /></button>
                            <button id="del_btn" className={styles.delete_icon} onClick={() => {dispatch(deleteProject(project.uuid))}} ><DeleteFilled /></button>
                            <button id="img_btn" className={styles.set_img_icon} >
                                <label htmlFor="file-input"> <FileImageOutlined /> </label>
                                <input id="file-input" type="file" onChange={(e) => ((e: any, uuid: string) => {
                                     console.log("Поменять фото для uuid", {l: project.uuid, d: uuid});
                                    
                                    // fetchSetPrewiew
                                    // await fetchSetPrewiew(uuid, e.target.files[0])
                                    // await dispatch(getProjects(username))
                                })(e, project.uuid)}/>
                            </button>
                            <div className={styles.main_container_item} >
                                {project.prewiew !== "empty" && <div className={styles.main_container_item_image} style={{ backgroundImage: `url(${process.env.REACT_APP_SERVER_HOST + "/images/" + project.prewiew})`}} ></div>}
                                {project.prewiew == "empty" && <Empty className={styles.main_container_item_empty} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                                <div className={styles.main_container_item_text}>
                                    <p className={styles.more_text}> {project.name} {project.uuid}</p>
                                </div>
                        </div>
                        {owner && <p className={styles.type_lable} >{project.state == 1 ? "private" : "public"}</p>}
                        </Button>
                        )
                    } else {
                        return (<></>)
                    }
                })} 
            </div>
        </div>
    )
}

export default User;