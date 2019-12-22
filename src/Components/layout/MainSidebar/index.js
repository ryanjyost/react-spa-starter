// lib
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import logo from 'Assets/images/logo.svg';
import { Layout, Menu, Icon } from 'antd';
// util
import { useResponsive } from 'Components/hooks';
import { AppRoutes } from 'Routes';
import { COLLAPSED_SIDEBAR_WIDTH } from 'Constants';
// style
import style from './mainSidebar.module.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

/**
 * Main sidebar for the app
 */
function MainSidebar(props) {
   const { isCollapsed, location } = props;
   const isMediumOrSmaller = useResponsive('md');

   return (
      <Sider
         className={style.Sider}
         theme={'light'}
         trigger={null}
         collapsible
         collapsed={isCollapsed}
         collapsedWidth={isMediumOrSmaller ? 0 : COLLAPSED_SIDEBAR_WIDTH}>
         <div
            className={`logo ${style.logoWrapper} ${
               isCollapsed ? style.logoWrapperCollapsed : style.logoWrapperExpanded
            }`}>
            <img src={logo} alt="logo" className={style.logoImage} />
            {!isCollapsed && <h1 className={style.title}>React Starter</h1>}
         </div>
         <Menu theme="light" mode="inline" selectedKeys={[location.pathname]} className={style.Menu}>
            {AppRoutes.map((route, i) => displayRoute(route))}
         </Menu>
      </Sider>
   );
}

export default withRouter(MainSidebar);

MainSidebar.propTypes = {
   /** Is the sidebar collapsed? */
   isCollapsed: PropTypes.bool.isRequired,
   /** info from withRouter */
   location: PropTypes.object.isRequired
};

/**
 * Recursively loop through and render routes
 * @param {Object} route - route config
 * @returns {ReactElement} appropriate menu components
 */
function displayRoute(route) {
   // route can be skipped
   if (route.hideInMainNav) return null;

   if (route.routes) {
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

   return (
      <Menu.Item key={route.path}>
         <Link to={route.path}>
            {route.icon && <Icon type={route.icon} />}
            <span>{route.title}</span>
         </Link>
      </Menu.Item>
   );
}
