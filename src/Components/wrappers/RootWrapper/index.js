import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { Layout, message, BackTop } from 'antd';
// components, constants, etc.
import { ErrorBoundary } from 'Components/hoc';
import { ErrorPage } from 'Components/pages';
import { $env, $envDisplay } from 'Config';
import style from './rootWrapper.module.scss';

/**
 * Wraps the entire app
 */
class RootWrapper extends React.Component {
   componentDidUpdate(prevProps) {
      // show error banner if one found in redux
      if (!prevProps.error && this.props.error) {
         message.error(this.props.error);
      }

      // when changing Routes, make sure scroll to top
      if (this.props.location !== prevProps.location) {
         window.scrollTo(0, 0);
      }
   }

   render() {
      return (
         <Layout className={style.Layout}>
            <Helmet>
               <title>{$env === 'PRODUCTION' ? 'React SPA Starter' : `${$envDisplay} - React SPA Starter`}</title>
            </Helmet>
            <ErrorBoundary renderError={ErrorPage}>{this.props.children}</ErrorBoundary>
            <BackTop />
         </Layout>
      );
   }
}

const mapStateToProps = state => {
   const { user } = state;

   const error = user.error;
   return { error };
};

const mapDispatchToProps = dispatch => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RootWrapper));

RootWrapper.propTypes = {
   /** any redux error */
   error: PropTypes.bool,
   /** all routes */
   children: PropTypes.node
};
