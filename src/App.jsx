import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { router } from "./navigation/router";
import { useAuthState, useGetProfile } from "./lib/actions";
import { ThemeProvider, StylesProvider } from "./providers";

import "./index.css";

function App() {
  useAuthState();
  useGetProfile();

  return (
    <div className="app">
      <StylesProvider />
      <ToastContainer />

      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
