import { call, put } from 'redux-saga/effects';

function* getRandomDogs({ api, action }, { payload }) {
   const { count } = payload;
   try {
      const response = yield call(api.getRandomDogs, count);
      yield put(action.success(response.data.message.length === 1 ? response.data.message[0] : response.data.message));
   } catch (error) {
      yield put(action.failure(error));
   }
}

function* getBreeds({ api, action }, { payload }) {
   try {
      const response = yield call(api.getBreeds);
      const breeds = Object.keys(response.data.message);
      yield put(action.success(breeds));
   } catch (error) {
      yield put(action.failure(error));
   }
}

function* getDogsByBreed({ api, action }, { payload }) {
   const { breed, count } = payload;
   try {
      const response = yield call(api.getDogsByBreed, breed, count);
      yield put(action.success(breed, response.data.message));
   } catch (error) {
      yield put(action.failure(error));
   }
}

export default {
   getRandomDogs,
   getBreeds,
   getDogsByBreed
};
