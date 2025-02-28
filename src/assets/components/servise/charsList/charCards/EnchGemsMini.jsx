import React from 'react'
import {miniArmorIco} from '../../../../../miniArmor/miniArmor'
import styles from './style.module.css'
const EnchGemsMini = ({items}) => {
  return (
    <>
      {miniArmorIco.map((iconItem, i) => (
        <div key={i + iconItem.name} className={styles.iconContainer}>
          <span
            className={`${styles.icon_mini} 
            ${
              iconItem.enchant
                ? items?.[iconItem?.name]?.enchant
                  ? styles.enchant_on_ind
                  : styles.enchant_off_ind
                : ''
            }`}
          >
            <img src={iconItem.ico} alt='' />
          </span>
          <span className={styles.label_mini}>
            {/* {items?.[iconItem?.name]?.enchant ? 'ok' : 'no'} */}
            {items?.[iconItem?.name]?.gems?.length || ''}
          </span>
        </div>
      ))}
    </>
  )
}

export default EnchGemsMini
