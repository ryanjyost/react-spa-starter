import update from 'immutability-helper';
import { createSagaActions } from '../actionGenerators';
import reduceReducers from '../reduceReducers';
import persist from '../persist';

/**
 * Initial state for this section of the store
 * @type {Object}
 */
const InitialState = {
   breeds: [],
   dog: null,
   randomDogs: [],
   breedDetailsDogs: {},
   fetching: false,
   error: null
};

/**
 * Get random dogs
 */
const getRandomDogs = createSagaActions(
   'GET_RANDOM_DOGS',
   {
      request: count => ({ count }),
      success: response => ({ response }),
      failure: error => ({ error })
   },
   'dogs'
);

function getRandomDogsReducer(state = InitialState, action) {
   const { payload } = action;
   switch (action.type) {
      case getRandomDogs.types.request:
         return update(state, {
            fetching: { $set: true },
            error: { $set: null }
         });
      case getRandomDogs.types.success:
         if (Array.isArray(payload.response)) {
            return update(state, {
               fetching: { $set: false },
               randomDogs: { $push: payload.response }
            });
         } else {
            return update(state, {
               fetching: { $set: false },
               dog: { $set: payload.response }
            });
         }

      case getRandomDogs.types.failure:
         return update(state, {
            fetching: { $set: false },
            error: { $set: `Failed to fetch a dog image` }
         });
      default:
         return state;
   }
}

/**
 * Get dog breeds
 */
const getBreeds = createSagaActions(
   'GET_BREEDS',
   {
      request: () => ({}),
      success: response => ({ response }),
      failure: error => ({ error })
   },
   'dogs'
);

function getBreedsReducer(state = InitialState, action) {
   const { payload } = action;
   switch (action.type) {
      case getBreeds.types.request:
         return update(state, {
            fetching: { $set: true },
            error: { $set: null }
         });
      case getBreeds.types.success:
         return update(state, {
            fetching: { $set: false },
            breeds: { $set: payload.response }
         });

      case getBreeds.types.failure:
         return update(state, {
            fetching: { $set: false },
            error: { $set: `Failed to fetch breeds` }
         });
      default:
         return state;
   }
}

/**
 * Get dog breeds
 */
const getDogsByBreed = createSagaActions(
   'GET_DOGS_BY_BREED',
   {
      request: (breed, count) => ({ breed, count }),
      success: (breed, dogs) => ({ breed, dogs }),
      failure: error => ({ error })
   },
   'dogs'
);

function getDogsByBreedReducer(state = InitialState, action) {
   const { payload } = action;

   switch (action.type) {
      case getDogsByBreed.types.request:
         return update(state, {
            fetching: { $set: true },
            error: { $set: null }
         });

      case getDogsByBreed.types.success:
         if (state.breedDetailsDogs[payload.breed]) {
            return update(state, {
               fetching: { $set: false },
               breedDetailsDogs: {
                  [payload.breed]: { $push: payload.dogs }
               }
            });
         }

         return update(state, {
            fetching: { $set: false },
            breedDetailsDogs: {
               [payload.breed]: { $set: payload.dogs }
            }
         });

      case getDogsByBreed.types.failure:
         return update(state, {
            fetching: { $set: false },
            error: { $set: `Failed to fetch breeds` }
         });
      default:
         return state;
   }
}

export const actions = {
   getRandomDogs,
   getBreeds,
   getDogsByBreed
};

export default persist(
   'dogs',
   ['breeds'], // only breeds will be saved to localStorage
   reduceReducers(InitialState, getRandomDogsReducer, getBreedsReducer, getDogsByBreedReducer)
);
