import React from 'react';

import styles from '../../styles/CardProject.module.css';

interface ICardBtnCreate {
  onClick: Function
}

const CardBtnCreate: React.FC<ICardBtnCreate> = ({onClick}) => {
  return (
    <button onClick={(e: any) => onClick(e)} className={styles.card_link_btn} >
      <div className={styles.main_container_item} >
        <div className={styles.main_container_item_image_plus} ></div>
        <div className={styles.main_container_item_text}>
          <p className={styles.more_text}> Create new</p>
        </div>
      </div>
    </button>
  );
};

export default CardBtnCreate;
