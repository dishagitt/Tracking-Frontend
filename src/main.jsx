import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import store, { persistor } from "./Redux/store";
import store from "./redux/store.js";
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>  
   {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
   {/* </PersistGate> */}
  </Provider>,
)
