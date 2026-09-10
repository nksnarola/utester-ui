import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "@/features/auth/store/authSlice"
import themeReducer from "@/features/theme/store/themeSlice"

export const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
})

export type RootState = ReturnType<typeof rootReducer>
