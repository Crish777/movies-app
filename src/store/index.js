import {configureStore} from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import sessionReducer from './sessionSlice'
import darkModeSlice from './darkModeSlice';
import { moviesApi } from '../api/moviesApi';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
    reducer: {
        session: sessionReducer,
        movies: moviesReducer,
        darkMode: darkModeSlice,
        [moviesApi.reducerPath]: moviesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware)
})

setupListeners(store.dispatch);

export default store;