import React from 'react';
import PropTypes from 'prop-types';
import style from './stackedInputGroup.module.scss';

/**
 * Ant-d only has horizontal labels, so just make own label and pass input as children
 */

export default function StackedInputGroup({ label, children }) {
   return (
      <div className={style.wrapper}>
         <p className={style.label}>{label}</p>
         {children}
      </div>
   );
}

StackedInputGroup.defaultProps = {
   label: 'Input',
   children: null
};

StackedInputGroup.propTypes = {
   /** Input and anything else   */
   children: PropTypes.node.isRequired,
   /** input label  */
   label: PropTypes.string.isRequired
};
