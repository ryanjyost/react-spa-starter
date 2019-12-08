// lib
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// style
import style from './component.module.scss';

/**
 * Template for a class component connected to the redux store
 */
class CHANGE_ME extends Component {
   state = {};

   /**
    * Render the component.
    * @return {ReactElement}
    */
   render() {
      return null;
   }
}

const mapStateToProps = state => {
   return {};
};

const mapDispatchToProps = dispatch => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CHANGE_ME);
