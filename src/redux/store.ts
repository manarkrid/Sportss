import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import loginReducer from "./features/loginSlice"
import registerReducer from "./features/registerSlice"
import adminReducer from "./features/adminSlice"
import facilityReducer from "./features/addFacilitySlice"
import userReducer from "./features/userSlice"
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistUserConfig = {
  key:'user',
  storage
}

const persistedUserReducer = persistReducer(persistUserConfig,userReducer)

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    login:loginReducer,
    register:registerReducer,
    admin:adminReducer,
    user:persistedUserReducer,
    facility:facilityReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:false}).concat(baseApi.middleware),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch