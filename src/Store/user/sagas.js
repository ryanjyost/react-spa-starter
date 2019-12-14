import { call, put } from 'redux-saga/effects';

function* login({ api, action }, { payload }) {
   const { username, password } = payload;
   try {
      const response = yield call(api.login);
      yield put(action.success(username));
   } catch (error) {
      yield put(action.failure(error));
   }
}

export default {
   login
};
