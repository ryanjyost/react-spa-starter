import React, { useState } from 'react';
import { Card, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { Actions } from '../../../Store';
import { Redirect } from 'react-router-dom';
import { RouteMap } from '../../../Routes';
import { StackedInputGroup } from '../../forms';
import { LoadingPageWrapper } from '../../wrappers';
import { $envDisplay } from '../../../Config';
import style from './login.module.scss';

const LoginScreen = ({ login, isAuthenticated, fetching }) => {
   const [username, updateUsername] = useState('');
   const [password, updatePassword] = useState('');

   const disableSubmit = !username.length || !password.length;

   function handleLogin() {
      login(username, password);
   }

   // no need to login, enter the app
   if (isAuthenticated) {
      return <Redirect to={RouteMap.APP} />;
   }

   return (
      <LoadingPageWrapper showLoading={fetching} message={'Authenticating...'}>
         <div className={style.container}>
            <Card
               title={`Log In to ${$envDisplay} Environment`}
               className={style.Card}
               headStyle={{ border: 'none', fontSize: 24 }}>
               <StackedInputGroup label={'Username'}>
                  <Input
                     value={username}
                     onChange={e => updateUsername(e.target.value)}
                     name={'username'}
                     placeholder="Enter your username"
                  />
               </StackedInputGroup>
               <StackedInputGroup label={'Password'}>
                  <Input.Password
                     value={password}
                     onChange={e => updatePassword(e.target.value)}
                     name={'password'}
                     type={'password'}
                     placeholder="Enter your password"
                  />
               </StackedInputGroup>
               <div className={style.buttonWrapper}>
                  <Button type="primary" disabled={disableSubmit} block onClick={handleLogin}>
                     LOGIN
                  </Button>
               </div>
            </Card>
         </div>
      </LoadingPageWrapper>
   );
};

const mapStateToProps = state => {
   return { isAuthenticated: state.user.isAuthenticated, fetching: state.user.fetching };
};

const mapDispatchToProps = dispatch => {
   return {
      login: (username, password) => dispatch(Actions.login.request(username, password))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
