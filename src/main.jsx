import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

// react router
import { BrowserRouter, HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HashRouter>
            {/* <BrowserRouter> */}
            <Provider store={store}>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <App />
                </ThemeProvider>
            </Provider>
            {/* </BrowserRouter> */}
        </HashRouter>
    </React.StrictMode>
);
