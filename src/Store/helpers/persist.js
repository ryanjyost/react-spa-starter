import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

/***********************
Allows us to specify what to persist on top and lower levels of redux state
 ***********************/
export default function persist(key, whitelist, reducer) {
   return persistReducer(
      {
         key,
         storage,
         whitelist
      },
      reducer
   );
}
