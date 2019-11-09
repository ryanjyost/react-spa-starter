import { call, put } from 'redux-saga/effects';

function* saga({ api, action }, { payload }) {
   try {
      const response = yield call(api.doThing);
      yield put(action.success(response.data));
   } catch (error) {
      yield put(action.failure(error));
   }
}

export default {
   saga
};
