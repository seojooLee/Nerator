import Layout from "../src/layout/Layout";
import { Provider } from "react-redux";
import rootReducer from "./module/rootRedux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(rootReducer, composeWithDevTools());
console.log(store.getState());

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
