import React from "react";
import ReactDOM from "react-dom";

// third-party
import { Provider as ReduxProvider } from "react-redux";

// project import
import App from "./App";
import { store } from "./store";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(sendToVercelAnalytics);
