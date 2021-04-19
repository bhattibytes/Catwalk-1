import React, {useEffect, useContext} from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import styles from './cardPicture.module.css';

const CardPicture = () => {
  return (
    <div className={styles.cardPictureArea}>
      <ComparisonModal />
    </div>
  )
}

export default CardPicture;