import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import booksReducer from './Reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['bookmarks']
  };

const rootReducer = combineReducers({
    booksReducer: persistReducer(persistConfig, booksReducer)
  });
  
  export const store = createStore(rootReducer, applyMiddleware(thunk));
  export const persistor = persistStore(store);