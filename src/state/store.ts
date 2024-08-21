import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';

import rootReducer from './index';

const persistConfig = {
    key: 'plant-app',
    storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export async function signOut() {
    await storage.removeItem('persist:plant-app');
    persistor.purge().then(() => {
        persistor.flush().then(() => {
            persistor.pause();
        });
    });
}

const getStore = () => store;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);
export default getStore;