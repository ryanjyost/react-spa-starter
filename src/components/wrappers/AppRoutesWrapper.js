import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RouteMap } from '../../routes';
import { MainSidebar, MainHeader, OverlayBackground } from '../layout';
import { ErrorBoundary } from '../hoc';
import { ErrorPage } from '../pages';
import STYLES, { useResponsive } from '../../styles';
import { Layout, message } from 'antd';
const { Content } = Layout;

function AppRoutesWrapper({ isAuthenticated, children }) {
   const [isCollapsed, toggleCollapsed] = useState(true);
   const isMediumOrSmaller = useResponsive('md');
   const currentContentOffset = isMediumOrSmaller
      ? 0
      : isCollapsed
      ? STYLES.collapsedSidebarWidth
      : STYLES.expandedSidebarWidth;

   // if user isn't authenticated, then send to login page
   if (!isAuthenticated) {
      message.error('You must login to access the app');
      return <Redirect to={RouteMap.ROOT} />;
   }

   return (
      <Layout style={{ width: '100%' }}>
         <MainSidebar isCollapsed={isCollapsed} />
         <Layout>
            <MainHeader sidebarIsCollapsed={isCollapsed} toggleCollapsed={() => toggleCollapsed(!isCollapsed)} />

            <Content
               style={{
                  padding: `${STYLES.appHeaderHeight + 20}px 0px 0px 0px`,
                  marginLeft: currentContentOffset,
                  position: 'relative',
                  float: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100vh'
               }}>
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

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(AppRoutesWrapper);
