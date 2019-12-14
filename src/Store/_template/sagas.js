import { call, put } from 'redux-saga/effects';

/**
 *
 * @param api
 * @param action
 * @param payload
 * @returns {Generator}
 */
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
