import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@/language/index"; //国际化
import '@/styles/index.scss'
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
//import "@/assets/iconfont/iconfont.scss";
import "@/assets/fonts/iconfont.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
