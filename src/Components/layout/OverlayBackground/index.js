import React from 'react';
import style from './overlayBackground.module.scss';

// custom overlay background used with MainSidebar on smaller devices
export default function OverlayBackground({ handleClick }) {
   return <div onClick={handleClick} className={style.overlay} />;
}
