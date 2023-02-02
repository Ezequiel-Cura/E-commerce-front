import { configureStore,ThunkAction,Action,combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";

//Reducers
import Products from "./reducer/Products/ProductsReducer";
import webPageReducer from "./reducer/webPage/webPageReducer";
import UserReducer from "./reducer/User/UserReducer";

const reducer = combineReducers({
    Products,
    webPageReducer,
    UserReducer
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({immutableCheck: false})]
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>  
>;