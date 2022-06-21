import { DeliveredProcedureOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { AddDescritionToProject, addPhotoProject } from "../../features/project/projectSlice";
import { getProjectById } from "../../features/user/userSlice";

import styles from "../../styles/Project.module.css"
import { decode } from "../../utils/decodeToken";

const Project: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch()

  const active_project = useAppSelector((state: RootState) => state.user.active_project)


  const token = useAppSelector((state: RootState) => state.auth.token)
  const username = location.pathname.split("/")[1];
  const owner = (token ? decode(token!).shortname : "") === username

  useEffect(() => {
      const uuid = location.pathname.split("/")[3];
      dispatch(getProjectById(uuid))
  }, [])

  const [idModalDescription, setIsModalDescription] = useState(true)

  // const addDescription = () => {}
  // const addPhoto = () => {}

  const setImageHandler = (files: File[]) => {
      for (let i = 0; i < files.length; i++) {
          dispatch(addPhotoProject({
              uuid: active_project.project.uuid,
              image: files[i]
          }));
      }
  }

  const [isModalText, setisModalText] = useState(false)
  const [isModalTextType, setIsModalTextType] = useState("")

  const hendlerok = () => {
      dispatch(AddDescritionToProject({
          uuid: active_project.project.uuid,
          text: isModalTextType
      }))

      setisModalText(false)
      setIsModalTextType("")
  }

  const hendlercancel = () => {
      setisModalText(false)
      setIsModalTextType("")
  }

  return (
      <div id="container" className={styles.project_container} onClick={(e: any) => {
        if (e.target.id === "container") {
          navigate(`/${username}`, { replace: false });
          document.querySelector("body")!.style!.overflow = "auto"
        }
      }} >
        <div className={styles.project_content} >
          {active_project !== undefined && <>
          <h1 className={styles.title} >{active_project.project && active_project.project.name}</h1>
          <h1 className={styles.description_title} >Описание</h1>

          {active_project.descriptions && active_project.descriptions.map(item => (
            <div  style={{whiteSpace: "pre-wrap"}} className={styles.description_text} key={item.uuid} >
              {item.value.split("\\n").map(function(item, idx) {
                return (
                  <span key={`text-${idx}`}>
                    {item}
                    <br/>
                  </span>
              )
              })}
            </div>
          ))}

          <Modal
            title="Добавить описание"
            visible={isModalText}
            onOk={hendlerok}
            onCancel={hendlercancel}
            cancelText="Отменить"
            okText="Сохранить" >

            <TextArea
              onChange={(e) => {setIsModalTextType(e.target.value) }}
              value={isModalTextType}
              placeholder="Обзац" />
          </Modal>

          {owner && <div onClick={() => setisModalText(true)} className={styles.btns} >
            <button className={styles.btn} >Добавить описание</button>
          </div>}

          {active_project.photos && active_project.photos.map(item => (
            <div className={styles.photo_container} >
              <img className={styles.photo} src={`${process.env.REACT_APP_SERVER_HOST + "/images/" + item.src}`} alt="" />
            </div>
          ))}

          <div className={styles.btns} >
            {owner && <button className={styles.btn_m} id="img_btn"  >
              <label className={styles.btn} htmlFor="file-input-wsedr" >
                Добавить изображение
              </label>
              <input className={styles.file_input} id="file-input-wsedr" type="file" onChange={(e: any) => {
                if (e.target.files.length > 0) setImageHandler(e.target.files)
              }} />
            </button>}
          </div>

          </>}
        </div>
      </div>
  )
}

export default Project;
