import React from 'react';
import styles from 'scss/components/BMCanvas.module.scss';

function BMCanvas() {
  return (
    <div className='f-container height-full f-dir-col'>
      <div className={styles.parent}>
        <div className={styles.div1}>contents</div>
        <div className={styles.div2}>contents</div>
        <div className={styles.div3}>contents</div>
        <div className={styles.div4}>contents</div>
        <div className={styles.div5}>contents</div>
        <div className={styles.div6}>contents</div>
        <div className={styles.div7}>contents</div>
      </div>
      <div className={styles.second}>
        <div className={styles.div8}>contents</div>
        <div className={styles.div9}>contents</div>
      </div>
    </div>
  );
}

export default BMCanvas;
