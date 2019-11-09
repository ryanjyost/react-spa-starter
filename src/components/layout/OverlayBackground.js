import React from 'react';

// custom overlay background used with MainSidebar on smaller devices
export default function OverlayBackground({ handleClick }) {
   return (
      <div
         onClick={handleClick}
         style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 10
         }}
      />
   );
}
