import { takeLatest, takeLeading, all } from 'redux-saga/effects';
import createAuthApi from 'Services/AuthApi';
import { Actions } from 'Store/index';
import UserSagas from 'Store/user/sagas';

const AuthApi = createAuthApi();

function generateWatcher(action, sagas, api) {
   return takeLeading(action.types.request, sagas[action.key], {
      api,
      action
   });
}

export default function*() {
   yield all([generateWatcher(Actions.login, UserSagas, AuthApi)]);
}
