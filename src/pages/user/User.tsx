import { Avatar, Card, Empty, Input, Modal, Tabs } from "antd";
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

import { DeliveredProcedureOutlined } from "@ant-design/icons";

import styles from './User.module.css'; 
import { fetchSetPrewiew } from "../../features/project/projectAPI";

const { TabPane } = Tabs;

const User: React.FC = () => {
    let location = useLocation();

    const token = useAppSelector((state: RootState) => state.auth.token)
    const username = location.pathname.split("/")[1];
    
    const dispatch = useAppDispatch()
    
    const user_info = useAppSelector((state: RootState) => state.user)
    const categories = useAppSelector((state: RootState) => state.user.categories)
    const projects = useAppSelector((state: RootState) => state.user.projects)

    // OWNER ACC OR NO
    const owner = (token ? decode(token!).shortname : "") === username

    useEffect(() => {
        dispatch(getProfile(username))
        dispatch(getCategories(username))
        dispatch(getProjects(username))
    }, [])
    
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
        dispatch(getProjects(username))
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

            <Tabs>
                {categories && categories.map((caterory => (
                    <TabPane key={caterory.uuid} tab={caterory.name} >
                        <div className={styles.projects_list} >
                            {owner && <CardBtnCreate onClick={async () => {
                                console.log("category uuid", caterory.uuid);
                                await dispatch(createProject(caterory.uuid))
                                await dispatch(getProjects(username))
                            }} />}

                            {projects && projects.map(project => (
                                <>
                                    {project.category_uuid == caterory.uuid && 
                                        <CardProject 
                                            username={username} 
                                            uuid={project.uuid} 
                                            projectname={project.name} 
                                            type={project.state} 
                                            prewiew={project.prewiew} 
                                            isowner={owner}
                                            OnEdit={(uuid: string) => {
                                                showModal(uuid)
                                            }}
                                            OnDelete={ async (uuid: string) => {
                                                await dispatch(deleteProject(uuid))
                                                await dispatch(getProjects(username))
                                            }}
                                            OnImage={async (e: any, uuid: string) => {
                                                await fetchSetPrewiew(uuid, e.target.files[0])
                                                await dispatch(getProjects(username))
                                                // fetchSetPrewiew
                                            }} />
                                    }
                                </>
                            ))} 
                        </div>
                    </TabPane>
                )))}
            </Tabs>
        </div>
    )
}

export default User;