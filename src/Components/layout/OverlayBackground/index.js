import React from 'react';
import PropTypes from 'prop-types';
import style from './overlayBackground.module.scss';

/**
 * Custom overlay background used with MainSidebar on smaller devices
 */
export default function OverlayBackground(props) {
   const { handleClick } = props;
   return <div onClick={handleClick} className={style.overlay} />;
}

OverlayBackground.propTypes = {
   /** When you click the overlay background */
   handleClick: PropTypes.func
};
