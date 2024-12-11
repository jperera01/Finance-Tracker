import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { combineReducers } from 'redux';
import profileReducer from './features/profileSlice.js'; // Your profile slice

// Configure persist
const persistConfig = {
  key: 'root', // The key to store your persisted data
  storage,
};

// Combine your reducers
const rootReducer = combineReducers({
  profile: profileReducer,
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
