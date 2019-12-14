import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Layout, message } from 'antd';
// components, libs, helpers, etc
import { RouteMap } from 'Routes';
import { MainSidebar, MainHeader, OverlayBackground } from 'Components/layout';
import { ErrorBoundary } from 'Components/hoc';
import { ErrorPage, Login } from 'Components/pages';
import { usePrevious } from 'Components/hooks';
import { useResponsive } from 'Components/hooks';
// style
import style from './appRoutesWrapper.module.scss';
import PropTypes from 'prop-types';
const { Content } = Layout;

/**
 * Wraps around authed routes, handle any high-level stuff here
 */
function AppRoutesWrapper({ isAuthenticated, children, location }) {
   const [isCollapsed, toggleCollapsed] = useState(true);
   const isMediumOrSmaller = useResponsive('md');

   const { pathname } = location;
   const prevPathname = usePrevious(pathname);

   /**
    * Hide overlay sidebar if on small screen and changing routes
    */
   useEffect(() => {
      if (prevPathname && isMediumOrSmaller && pathname !== prevPathname) {
         toggleCollapsed(true);
      }
   }, [location]);

   // if user isn't authenticated, then send to login page
   if (!isAuthenticated) {
      message.error('You must login to access the app');
      return <Redirect to={RouteMap.ROOT} />;
   }

   return (
      <Layout className={style.Layout}>
         <MainSidebar isCollapsed={isCollapsed} />
         <Layout>
            <MainHeader sidebarIsCollapsed={isCollapsed} toggleCollapsed={() => toggleCollapsed(!isCollapsed)} />
            <Content
               className={`${style.Content} ${
                  isMediumOrSmaller ? null : isCollapsed ? style.sidebarCollapsed : style.sidebarExpanded
               }`}>
               {isMediumOrSmaller && !isCollapsed && (
                  <OverlayBackground handleClick={() => toggleCollapsed(!isCollapsed)} />
               )}
               <ErrorBoundary renderError={ErrorPage}>{children}</ErrorBoundary>
            </Content>
         </Layout>
      </Layout>
   );
}

const mapStateToProps = state => {
   return { isAuthenticated: state.user.isAuthenticated };
};

const mapDispatchToProps = dispatch => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppRoutesWrapper));

AppRoutesWrapper.propTypes = {
   /** is user authenticated? */
   isAuthenticated: PropTypes.bool,
   /** app route components */
   children: PropTypes.node,
   /** react router info */
   location: PropTypes.object
};
