import { Avatar, Button, Card, Empty, Input, Modal } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { changeExistingCategory, chengePhoto, CreateNewCategory, createProject, deleteExistingCategory, deleteProject, renameProject, SetStateProject } from "../../features/project/projectSlice";
import { getCategories, getProfile, getProjects } from "../../features/user/userSlice";
import { decode } from "../../utils/decodeToken";
import CardBtnCreate from "../project/CardBtnCreate";

import Header from "../../components/Header";

import { DeliveredProcedureOutlined} from "@ant-design/icons";

import styles from './User.module.css'; 
import { fetchSetPrewiew } from "../../features/project/projectAPI";

import { Link, useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import ProjectCard from "../project/ProjectCard";


const User: React.FC = () => {
    let location = useLocation();

    const token = useAppSelector((state: RootState) => state.auth.token)
    const username = location.pathname.split("/")[1];
    
    const dispatch = useAppDispatch()
    
    const user_info = useAppSelector((state: RootState) => state.user)
    const categories = useAppSelector((state: RootState) => state.user.categories)
    const projects = useAppSelector((state: RootState) => state.user.projects)

    const [active_category, set_active_category] = useState("")
    
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
    
    
    // МОДАЛЬНОЕ ОКНО 
    const [isModalToken, setisModalToken] = useState("");
    const [isModalText, setisModalText] = useState("");

    // Модальное окно добавления категории
    const [isCreateCategory, setIsCreateCategory] = useState(false)
    const [textCreateCategory, setTextCreateCategory] = useState("")

    // Модальное окно изменения категории
    const [isEditCategory, setIsEditCategory] = useState(false)
    const [uuidEditCategory, setUuidEditCategory] = useState("")
    const [textEditCategory, setTextEditCategory] = useState("")

    // изменение картинки
    const [chengePhotoId, setChengePhotoId] = useState("");

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
        
        setisModalText("")
    };

    const handleOkEditCategory = () => {
        dispatch(changeExistingCategory({
            uuid: uuidEditCategory,
            title: textEditCategory
        }))

        setIsEditCategory(false)
        setUuidEditCategory("")
        setTextEditCategory("")
    }
    const handleCancelEditCategory = () => {
        setIsEditCategory(false)
        setUuidEditCategory("")
        setTextEditCategory("")
    }

    const handleOkCreateCategory = () => {
        dispatch(CreateNewCategory(textCreateCategory))
        setIsCreateCategory(false)
        setTextCreateCategory("")
    }

    const handleCancel = () => {
        setisModalToken("")
        setisModalText("")
    };

    const handleCancelCreateCategory = () => {
        setIsCreateCategory(false)
        setTextCreateCategory("")
    }

    // МОДАЛЬНОЕ ОКНО 

    return (
        <div>
            <Header />

            <Tabs 
                tabs={categories}
                active_tab={active_category}
                set_active={set_active_category}
                owner={owner} 
                createNew={() => setIsCreateCategory(true)}
                editHandler={(uuid: string, title: string) => {
                    setTextEditCategory(title)
                    setUuidEditCategory(uuid)
                    setIsEditCategory(true)
                }}
                deleteHandler={(uuid: string) => {
                    dispatch(deleteExistingCategory(uuid))
                }} />

            <Modal 
                title="Изменить категорию" 
                visible={isEditCategory} 
                onOk={handleOkEditCategory} 
                onCancel={handleCancelEditCategory}
                cancelText="Отменить"
                okText="Сохранить" >
                    
                <Input  
                    onChange={(e) => {setTextEditCategory(e.target.value) }} 
                    value={textEditCategory}
                    prefix={<DeliveredProcedureOutlined className="site-form-item-icon" />} 
                    placeholder="Новое название категории" />
            </Modal>

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

            <Modal 
                title="Создать новую категорию" 
                visible={isCreateCategory} 
                onOk={handleOkCreateCategory} 
                onCancel={handleCancelCreateCategory}
                cancelText="Отменить"
                okText="Создать" >
                    
                <Input  
                    onChange={(e) => {setTextCreateCategory(e.target.value) }} 
                    prefix={<DeliveredProcedureOutlined className="site-form-item-icon" />} 
                    placeholder="Название новой категории" />
            </Modal>

            <div className={styles.projects_list} >
                {owner && active_category !== "" && <CardBtnCreate onClick={async () => {await dispatch(createProject(active_category))}} />}

                {projects && projects.map(project => (
                    active_category === project.category_uuid && <ProjectCard 
                        setState={(state: number, uuid: string) => {
                            let new_state = state;
                            
                            if (new_state === 0) new_state = 1
                            else if (new_state === 1) new_state = 2
                            else if (new_state === 2) new_state = 0

                            dispatch(SetStateProject({uuid, state: new_state}))
                        }}
                        toHandler={(uuid: string) => {
                            navigate(`/${username}/project/${uuid}`, { replace: false });
                            document.querySelector("body")!.style!.overflow = "hidden"
                        }} 
                        editHandler={(uuid: string) => {setisModalToken(uuid)}} 
                        deleteHandler={(uuid: string) => dispatch(deleteProject(uuid))} 
                        setImageHandlerFirstStap={(uuid: string) => {setChengePhotoId(uuid)}}
                        setImageHandler={(image: File) => {
                            dispatch(chengePhoto({
                                uuid: chengePhotoId,
                                image: image
                            }));
                            setChengePhotoId("")
                        }} 
                        uuid={project.uuid} 
                        name={project.name} 
                        prewiew={project.prewiew} 
                        state={project.state} 
                        owner={owner}  />
                ))} 
            </div>
        
            <Outlet></Outlet>
        </div>
    )
}

export default User;