import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Icon, Typography } from 'antd';
import { RouteMap } from 'Routes';
import { Actions } from '../../../Store';
import style from './mainHeader.module.scss';
import { useResponsive } from '../../hooks';
import { $envDisplay } from '../../../Config';
const { Header } = Layout;
const { Title } = Typography;

function MainHeader({ logout, sidebarIsCollapsed, toggleCollapsed }) {
   const isMediumOrSmaller = useResponsive('md');

   return (
      <Header
         className={`${style.Header} ${
            isMediumOrSmaller ? style.noSidebar : sidebarIsCollapsed ? style.collapsed : style.expanded
         }`}>
         <div className={style.titleWrapper}>
            <Icon
               id={'sideBarToggle'}
               className={style.icon}
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

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
