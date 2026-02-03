import { createContext, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [product, setProduct] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const [verify, setVerify] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const value = {
    backUrl,
    isLoggedin,
    setLoggedIn,
    userData,
    setUserData,
    product,
    setProduct,
    sentEmail,
    setSentEmail,
    verify,
    setVerify,
    userEmail,
    setUserEmail,
  };

  return (
    <AppContent.Provider value={value}>
      {children}
    </AppContent.Provider>
  );
};
