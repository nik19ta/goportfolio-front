import {DeleteFilled, EditFilled, PlusCircleOutlined} from '@ant-design/icons';
import React, {FC, useState} from 'react';

import styles from '../../styles/Tabs.module.css';

interface ITabs {
  tabs: {
    uuid: string
    user_uuid: string
    name: string
  }[]
  activeTab: string
  setActive: Function

  owner: boolean

  createNew: Function

  editHandler: Function
  deleteHandler: Function
}

// eslint-disable-next-line max-len
const Tabs: FC<ITabs> = ({tabs, activeTab, setActive, owner, createNew, editHandler, deleteHandler}) => {
  const [active, setactive] = useState('');

  return <div className={styles.tabs} >
    {tabs && tabs.map((tab) =>
      <div
        key={tab.uuid}
        onMouseMove={() => {
          setactive(tab.uuid);
        }}
        // eslint-disable-next-line max-len
        className={`${styles.tab} ${activeTab === tab.uuid && styles.active_tab}`}
        onClick={() => setactive(tab.uuid)} >

        {tab.name}

        {active === tab.uuid && <div className={styles.options}>
          {owner && <button id='edit_btn'
            className={styles.edit_icon}
            onClick={() => {
              editHandler(tab.uuid, tab.name);
            }} >
            <EditFilled />
          </button>}

          {owner && <button id='del_btn'
            className={styles.delete_icon}
            onClick={() => {
              deleteHandler(tab.uuid);
            }} >
            <DeleteFilled />
          </button>}
        </div>}

      </div>)}

    {owner && <div className={styles.tab} onClick={() => createNew()} >
      <PlusCircleOutlined />
    </div>}
  </div>;
};

export default Tabs;
