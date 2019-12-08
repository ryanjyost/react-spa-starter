import React from 'react';
import { Icon } from 'antd';
import style from './loadingPageWrapper.module.scss';

// Wrap any component or markup in this to show a loader
export default function LoadingPageWrapper({ children, showLoading, message }) {
   if (showLoading) {
      // TODO -> componetize your custom loader to be used in non full-page cases
      return (
         <div className={style.container}>
            <Icon type="loading" className={style.Icon} />
            <h3>{message || `Doing stuff...`}</h3>
         </div>
      );
   }

   return children;
}
