import { combineReducers, legacy_createStore } from 'redux'
import { AuthReducer } from './Auth/AuthReducer.js'
import { productreducer } from './Products/ProductReducer.js'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootreducer = combineReducers({
  AuthReducer: AuthReducer,
  Productreducer: productreducer
})

const persistConfig = {
  key: 'redux-root',
  storage
}
const persistedReducer = persistReducer(persistConfig, rootreducer)

export const store = legacy_createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export const persistor = persistStore(store)
