/* eslint-disable max-len */
import {Modal} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {RootState} from '../../app/store';
import {AddDescritionToProject as addDescritionToProject,
  addPhotoProject} from '../../features/project/projectSlice';
import {getProjectById} from '../../features/user/userSlice';

import styles from '../../styles/Project.module.css';
import {decode} from '../../utils/decodeToken';

const Project: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  // eslint-disable-next-line max-len
  const activeProject = useAppSelector((state: RootState) => state.user.active_project);


  const token = useAppSelector((state: RootState) => state.auth.token);
  const username = location.pathname.split('/')[1];
  const owner = (token ? decode(token!).shortname : '') === username;

  useEffect(() => {
    const uuid = location.pathname.split('/')[3];
    dispatch(getProjectById(uuid));
  }, []);

  const setImageHandler = (files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      dispatch(addPhotoProject({
        uuid: activeProject.project.uuid,
        image: files[i],
      }));
    }
  };

  const [isModalText, setisModalText] = useState(false);
  const [isModalTextType, setIsModalTextType] = useState('');

  const hendlerok = () => {
    dispatch(addDescritionToProject({
      uuid: activeProject.project.uuid,
      text: isModalTextType,
    }));

    setisModalText(false);
    setIsModalTextType('');
  };

  const hendlercancel = () => {
    setisModalText(false);
    setIsModalTextType('');
  };

  return (
    <div id='container'
      className={styles.project_container} onClick={(e: any) => {
        if (e.target.id === 'container') {
          navigate(`/${username}`, {replace: false});
          document.querySelector('body')!.style!.overflow = 'auto';
        }
      }} >
      <div className={styles.project_content} >
        {activeProject !== undefined && <>
          <h1 className={styles.title} >
            {activeProject.project && activeProject.project.name}
          </h1>
          <h1 className={styles.description_title} >Описание</h1>

          {activeProject.descriptions &&
            activeProject.descriptions.map((item) => (
              // eslint-disable-next-line max-len
              <div style={{whiteSpace: 'pre-wrap'}}
                className={styles.description_text}
                key={item.uuid} >
                {item.value.split('\\n').map(function(item, idx) {
                  return (
                    <span key={`text-${idx}`}>
                      {item}
                      <br/>
                    </span>
                  );
                })}
              </div>
            ))}

          <Modal
            title='Добавить описание'
            visible={isModalText}
            onOk={hendlerok}
            onCancel={hendlercancel}
            cancelText='Отменить'
            okText='Сохранить' >

            <TextArea
              onChange={(e) => {
                setIsModalTextType(e.target.value);
              }}
              value={isModalTextType}
              placeholder='Обзац' />
          </Modal>

          {owner && <div onClick={() => setisModalText(true)} className={styles.btns} >
            <button className={styles.btn} >Добавить описание</button>
          </div>}

          {activeProject.photos && activeProject.photos.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <div key={item.photo_uuid} className={styles.photo_container} >
              <img className={styles.photo} src={`${process.env.REACT_APP_SERVER_HOST + '/images/' + item.src}`} alt='' />
            </div>
          ))}

          <div className={styles.btns} >
            {owner && <button className={styles.btn_m} id='img_btn' >
              <label className={styles.btn} htmlFor='file-input-wsedr' >
                Добавить изображение
              </label>
              <input className={styles.file_input} id='file-input-wsedr' type='file' onChange={(e: any) => {
                if (e.target.files.length > 0) setImageHandler(e.target.files);
              }} />
            </button>}
          </div>

        </>}
      </div>
    </div>
  );
};

export default Project;
