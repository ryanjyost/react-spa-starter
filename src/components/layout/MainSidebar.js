import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { Layout, Menu, Icon } from 'antd';
import STYLES, { useResponsive } from '../../styles';
import { AppRoutes } from '../../routes';
const { Sider } = Layout;
const { SubMenu } = Menu;

function MainSidebar({ isCollapsed, location }) {
   const isMediumOrSmaller = useResponsive('md');

   const sidebarStyle = {
      height: '100vh',
      position: 'fixed',
      left: 0,
      zIndex: 100,
      borderRight: '1px solid #f2f2f2',
      overflowX: 'hidden',
      overflowY: 'auto'
   };

   const logoContainerStyle = {
      height: STYLES.appHeaderHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isCollapsed ? 'center' : 'left',
      paddingLeft: isCollapsed ? 0 : 10,
      marginBottom: 1
   };

   return (
      <Sider
         style={sidebarStyle}
         theme={'light'}
         trigger={null}
         collapsible
         collapsed={isCollapsed}
         collapsedWidth={isMediumOrSmaller ? 0 : STYLES.collapsedSidebarWidth}>
         <div className="logo" style={logoContainerStyle}>
            <img src={logo} alt="logo" style={{ height: 40 }} />
            {!isCollapsed && <h1 style={{ margin: '0px 0px 0px 5px', fontSize: 16 }}>React Starter</h1>}
         </div>
         <Menu theme="light" mode="inline" selectedKeys={[location.pathname]} style={{ borderRight: 'none' }}>
            {AppRoutes.map((route, i) => displayRoute(route))}
         </Menu>
      </Sider>
   );
}

export default withRouter(MainSidebar);

// function to be able to recursively loop through routes
function displayRoute(route) {
   if (route.routes && route.showInMainNav) {
      return (
         <SubMenu
            key={route.key}
            title={
               <span>
                  {route.icon && <Icon type={route.icon} />}
                  <span>{route.title}</span>
               </span>
            }>
            {route.routes.map(r => displayRoute(r))}
         </SubMenu>
      );
   }

   // route can be skipped
   if (!route.showInMainNav) return null;

   return (
      <Menu.Item key={route.path}>
         <Link to={route.path}>
            {route.icon && <Icon type={route.icon} />}
            <span>{route.title}</span>
         </Link>
      </Menu.Item>
   );
}
