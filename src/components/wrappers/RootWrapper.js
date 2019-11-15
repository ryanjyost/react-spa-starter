import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { Layout, message, BackTop } from 'antd';
import { ErrorBoundary } from '../hoc';
import { ErrorPage } from '../pages';
import { $env, $envDisplay } from '../../config';

class RootWrapper extends React.Component {
   componentDidUpdate(prevProps) {
      // show error banner if one found in redux
      if (!prevProps.error && this.props.error) {
         message.error(this.props.error);
      }

      // when changing routes, make sure scroll to top
      if (this.props.location !== prevProps.location) {
         window.scrollTo(0, 0);
      }
   }

   render() {
      return (
         <Layout
            style={{
               minHeight: '100vh',
               width: '100%',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center'
            }}>
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
   const { dogs, user } = state;

   const error = dogs.error || user.error;
   return { error };
};

const mapDispatchToProps = dispatch => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RootWrapper));
