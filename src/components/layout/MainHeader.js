import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Icon, Typography } from 'antd';
import { RouteMap } from '../../routes';
import { Actions } from '../../store';
import STYLES, { useResponsive } from '../../styles';
import { $envDisplay } from '../../config';
const { Header } = Layout;
const { Title } = Typography;

function MainHeader({ logout, sidebarIsCollapsed, toggleCollapsed }) {
   console.log('SHOW UP IN STAGING');

   const isMediumOrSmaller = useResponsive('md');
   const currentContentOffset = isMediumOrSmaller
      ? 0
      : sidebarIsCollapsed
      ? STYLES.collapsedSidebarWidth
      : STYLES.expandedSidebarWidth;

   return (
      <Header
         style={{
            backgroundColor: '#fff',
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            borderBottom: '1px solid rgb(232, 232, 232)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: `0px 20px 0px ${currentContentOffset + 20}px`
         }}>
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon
               id={'sideBarToggle'}
               style={{ fontSize: 18, marginRight: 10 }}
               type={sidebarIsCollapsed ? 'menu-unfold' : 'menu-fold'}
               onClick={toggleCollapsed}
            />
            <Title level={4}>{`${$envDisplay} Environment`}</Title>
         </div>
         <div>
            <Link to={RouteMap.ROOT} style={{ margin: '0px 10px' }} onClick={logout}>
               Logout
            </Link>
         </div>
      </Header>
   );
}

const mapStateToProps = state => {
   return state.user;
};

const mapDispatchToProps = dispatch => {
   return {
      logout: () => dispatch(Actions.logout())
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainHeader));
