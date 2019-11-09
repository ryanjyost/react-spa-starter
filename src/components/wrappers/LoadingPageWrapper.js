import React from 'react';
import { Icon } from 'antd';

// Wrap any component or markup in this to show a loader
export default function LoadingPageWrapper({ children, showLoading, message }) {
   if (showLoading) {
      // TODO -> componetize your custom loader to be used in non full-page cases
      return (
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Icon type="loading" style={{ fontSize: 40, marginBottom: 10 }} />
            <h3>{message || `Doing stuff...`}</h3>
         </div>
      );
   }

   return children;
}
