import { takeLatest, takeLeading, all } from 'redux-saga/effects';
import createDogApi from 'Services/DogApi';
import createAuthApi from 'Services/AuthApi';
import { Actions } from 'Store/index';
import DogSagas from 'Store/dogs/sagas';
import UserSagas from 'Store/user/sagas';

const DogApi = createDogApi();
const AuthApi = createAuthApi();

function generateWatcher(action, sagas, api) {
   return takeLeading(action.types.request, sagas[action.key], {
      api,
      action
   });
}

export default function*() {
   yield all([
      generateWatcher(Actions.getRandomDogs, DogSagas, DogApi),
      generateWatcher(Actions.getBreeds, DogSagas, DogApi),
      generateWatcher(Actions.getDogsByBreed, DogSagas, DogApi),
      generateWatcher(Actions.login, UserSagas, AuthApi)
   ]);
}
