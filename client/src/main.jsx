import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.jsx";

// 👇 Import GoogleOAuthProvider
import { GoogleOAuthProvider } from "@react-oauth/google";

// ⚠️ Use your own Client ID here
const clientId =
  "607620608532-bov4vifkve75bfh4sni739rdf40ln6u5.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
