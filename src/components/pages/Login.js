import React, { useState } from 'react';
import { Card, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { Actions } from '../../store';
import { Redirect } from 'react-router-dom';
import { RouteMap } from '../../routes';
import { StackedInputGroup } from '../forms';
import { LoadingPageWrapper } from '../wrappers';
import {$clientUrl, $envDisplay} from '../../config';

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
         <div
            style={{
               height: '100vh',
               minHeight: 500,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center'
            }}>
            <Card
               title={`Log In to ${$envDisplay} Environment`}
               style={{ width: 500, padding: 40 }}
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
               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ width: 120 }}>
                     <Button type="primary" disabled={disableSubmit} block onClick={handleLogin}>
                        LOGIN
                     </Button>
                  </div>
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

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(LoginScreen);
