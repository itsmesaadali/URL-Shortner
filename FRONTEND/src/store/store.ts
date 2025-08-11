import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/authSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer
    },
})

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

