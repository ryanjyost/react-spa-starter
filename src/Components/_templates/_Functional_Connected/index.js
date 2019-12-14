import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './component.module.scss';

/**
 * Template for a functional component connected to the store
 */
function CHANGE_ME({}) {
   return null;
}

const mapStateToProps = state => {
   return {};
};

const mapDispatchToProps = dispatch => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CHANGE_ME);

CHANGE_ME.defaultProps = {};

CHANGE_ME.propTypes = {
   /** Comment prop  */
};
