import { configureStore,ThunkAction,Action,combineReducers } from "@reduxjs/toolkit";

//Reducers
import Products from "./reducer/Products/ProductsReducer";
import webPageReducer from "./reducer/webPage/webPageReducer";

const reducer = combineReducers({
    Products,
    webPageReducer
})

export const store = configureStore({
    reducer
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;