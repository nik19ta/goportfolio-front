import {DeleteFilled, EditFilled, FileImageOutlined} from '@ant-design/icons';
import {Empty} from 'antd';
import React, {FC} from 'react';

import styles from '../../styles/CardProject.module.css';

interface IProjectCard {
  toHandler: Function

  editHandler: Function
  deleteHandler: Function

  setState: Function

  setImageHandlerFirstStap: Function
  setImageHandler: Function

  uuid: string
  name: string
  prewiew: string
  state: number

  owner: boolean
}

// eslint-disable-next-line max-len
const ProjectCard: FC<IProjectCard> = ({uuid, name, prewiew, state, toHandler, editHandler, deleteHandler, setImageHandlerFirstStap, setImageHandler, owner, setState}) => (
  <div className={styles.card_link_btn} onClick={(e: any) => {
    if (e.target.localName !== 'path' &&
    e.target.localName !== 'svg' &&
    e.target.localName !== 'button' &&
    e.target.localName !== 'span' &&
    e.target.localName !== 'input') {
      toHandler(uuid);
    }
  }}>

    {owner && <button id='edit_btn' className={styles.edit_icon}
      onClick={() => {
        editHandler(uuid);
      }}>
      <EditFilled />
    </button>}

    {owner && <button id='del_btn' className={styles.delete_icon}
      onClick={() => {
        deleteHandler(uuid);
      }}>
      <DeleteFilled />
    </button>}

    {owner && <button id='img_btn' className={styles.set_img_icon}>
      <label htmlFor='file-input'
        onClick={() => setImageHandlerFirstStap(uuid)}>
        <FileImageOutlined />
      </label>
      <input id='file-input' type='file' onChange={(e: any) => {
        if (e.target.files.length > 0) {
          setImageHandler(e.target.files[0]);
        }
      }} />
    </button>}

    <div className={styles.main_container_item}>
      {prewiew !== 'empty' &&
        <div
          className={styles.main_container_item_image}
          // eslint-disable-next-line max-len
          style={{backgroundImage: `url(${process.env.REACT_APP_SERVER_HOST + '/images/' + prewiew})`}}></div>}

      {prewiew == 'empty' &&
        <Empty
          className={styles.main_container_item_empty}
          image={Empty.PRESENTED_IMAGE_SIMPLE} />}

      <div className={styles.main_container_item_text}>
        <p className={styles.more_text}> {name}</p>
      </div>
    </div>
    {owner &&
      <span
        onClick={() => setState(state, uuid)}
        className={styles.type_lable}>
        {state == 1 ? 'private' : state == 0 ? 'public' : 'api'}
      </span>}
  </div>);

export default ProjectCard;
