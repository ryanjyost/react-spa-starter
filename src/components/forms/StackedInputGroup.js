import React from 'react';
import PropTypes from 'prop-types';

// Ant-d only has horizontal labels, so just make own label and pass input as children
export default function StackedInputGroup({ label, children }) {
   return (
      <div style={{ marginBottom: 15 }}>
         <p style={{ marginBottom: 5 }}>{label}</p>
         {children}
      </div>
   );
}

StackedInputGroup.propTypes = {
   label: PropTypes.string.isRequired
};
