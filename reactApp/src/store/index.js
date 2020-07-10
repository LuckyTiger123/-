import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import reducers from "./reucers";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const PersistReducer = persistReducer(persistConfig, reducers);
const store = createStore(PersistReducer);

export const persistor = persistStore(store);
export default store;
