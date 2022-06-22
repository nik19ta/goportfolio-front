import {Input, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {RootState} from '../../app/store';
import {changeExistingCategory, chengePhoto,
  createNewCategory, createProject,
  deleteExistingCategory, deleteProject, renameProject,
  setStateProject} from '../../features/project/projectSlice';
import {getCategories, getProfile,
  getProjects} from '../../features/user/userSlice';
import {decode} from '../../utils/decodeToken';
import CardBtnCreate from '../project/CardBtnCreate';

import Header from '../../components/Header';

import {DeliveredProcedureOutlined} from '@ant-design/icons';

import styles from './User.module.css';

import {useNavigate} from 'react-router-dom';
import Tabs from './Tabs';
import ProjectCard from '../project/ProjectCard';


const User: React.FC = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const username = location.pathname.split('/')[1];

  const dispatch = useAppDispatch();

  // eslint-disable-next-line max-len
  const categories = useAppSelector((state: RootState) => state.user.categories);
  const projects = useAppSelector((state: RootState) => state.user.projects);

  const [activeCategory, setActiveCategory] = useState('');

  const owner = (token ? decode(token!).shortname : '') === username;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile(username));
    dispatch(getCategories(username));
    dispatch(getProjects(username));
  }, []);

  useEffect(() => {
    if (categories !== undefined) {
      if (categories.length > 0) setActiveCategory(categories[0].uuid);
    }
  }, [categories]);


  // МОДАЛЬНОЕ ОКНО
  const [isModalToken, setisModalToken] = useState('');
  const [isModalText, setisModalText] = useState('');

  // Модальное окно добавления категории
  const [isCreateCategory, setIsCreateCategory] = useState(false);
  const [textCreateCategory, setTextCreateCategory] = useState('');

  // Модальное окно изменения категории
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [uuidEditCategory, setUuidEditCategory] = useState('');
  const [textEditCategory, setTextEditCategory] = useState('');

  // изменение картинки
  const [chengePhotoId, setChengePhotoId] = useState('');

  const handleOk = () => {
    // CLOSE
    setisModalToken('');

    // SAVE
    dispatch(renameProject({
      uuid: isModalToken,
      title: isModalText,
    }));

    setisModalText('');
  };

  const handleOkEditCategory = () => {
    dispatch(changeExistingCategory({
      uuid: uuidEditCategory,
      title: textEditCategory,
    }));

    setIsEditCategory(false);
    setUuidEditCategory('');
    setTextEditCategory('');
  };
  const handleCancelEditCategory = () => {
    setIsEditCategory(false);
    setUuidEditCategory('');
    setTextEditCategory('');
  };

  const handleOkCreateCategory = () => {
    dispatch(createNewCategory(textCreateCategory));
    setIsCreateCategory(false);
    setTextCreateCategory('');
  };

  const handleCancel = () => {
    setisModalToken('');
    setisModalText('');
  };

  const handleCancelCreateCategory = () => {
    setIsCreateCategory(false);
    setTextCreateCategory('');
  };

  // МОДАЛЬНОЕ ОКНО

  return (
    <div>
      <Header />

      <Tabs
        tabs={categories}
        activeTab={activeCategory}
        setActive={setActiveCategory}
        owner={owner}
        createNew={() => setIsCreateCategory(true)}
        editHandler={(uuid: string, title: string) => {
          setTextEditCategory(title);
          setUuidEditCategory(uuid);
          setIsEditCategory(true);
        }}
        deleteHandler={(uuid: string) => {
          dispatch(deleteExistingCategory(uuid));
        }} />

      <Modal
        title='Изменить категорию'
        visible={isEditCategory}
        onOk={handleOkEditCategory}
        onCancel={handleCancelEditCategory}
        cancelText='Отменить'
        okText='Сохранить' >

        <Input
          onChange={(e) => {
            setTextEditCategory(e.target.value);
          }}
          value={textEditCategory}
          // eslint-disable-next-line max-len
          prefix={<DeliveredProcedureOutlined className='site-form-item-icon' />}
          placeholder='Новое название категории' />
      </Modal>

      <Modal
        title='Редактировать название проекта'
        visible={isModalToken.length > 0}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText='Отменить'
        okText='Переменовать проект' >

        <Input
          onChange={(e) => {
            setisModalText(e.target.value);
          }}
          // eslint-disable-next-line max-len
          prefix={<DeliveredProcedureOutlined className='site-form-item-icon' />}
          placeholder='Новое название проекта' />
      </Modal>

      <Modal
        title='Создать новую категорию'
        visible={isCreateCategory}
        onOk={handleOkCreateCategory}
        onCancel={handleCancelCreateCategory}
        cancelText='Отменить'
        okText='Создать' >

        <Input
          onChange={(e) => {
            setTextCreateCategory(e.target.value);
          }}
          // eslint-disable-next-line max-len
          prefix={<DeliveredProcedureOutlined className='site-form-item-icon' />}
          placeholder='Название новой категории' />
      </Modal>

      <div className={styles.projects_list} >
        {owner && activeCategory !== '' &&
        <CardBtnCreate onClick={async () => {
          await dispatch(createProject(activeCategory));
        }} />}

        {projects && projects.map((project) => (
          activeCategory === project.category_uuid && <ProjectCard
            key={project.uuid}
            setState={(state: number, uuid: string) => {
              let newState = state;

              if (newState === 0) newState = 1;
              else if (newState === 1) newState = 2;
              else if (newState === 2) newState = 0;

              dispatch(setStateProject({uuid, state: newState}));
            }}
            toHandler={(uuid: string) => {
              navigate(`/${username}/project/${uuid}`, {replace: false});
              document.querySelector('body')!.style!.overflow = 'hidden';
            }}
            editHandler={(uuid: string) => {
              setisModalToken(uuid);
            }}
            deleteHandler={(uuid: string) => dispatch(deleteProject(uuid))}
            setImageHandlerFirstStap={(uuid: string) => {
              setChengePhotoId(uuid);
            }}
            setImageHandler={(image: File) => {
              dispatch(chengePhoto({
                uuid: chengePhotoId,
                image: image,
              }));
              setChengePhotoId('');
            }}
            uuid={project.uuid}
            name={project.name}
            prewiew={project.prewiew}
            state={project.state}
            owner={owner} />
        ))}
      </div>

      <Outlet></Outlet>
    </div>
  );
};

export default User;
