import { createContext, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
    const backUrl = import.meta.env.VITE_BACK;

    const [isLoggedin, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [product , setProduct] = useState('');
    const [sentEmail,setSentEmail ] = useState(false);
    const [verify,setVerify]= useState(false);
const [userEmail, setuserEmail]=useState('');
    const value = {
        backUrl,
        isLoggedin,
        setLoggedIn,
        userData,
        setUserData,
        sentEmail,
        setSentEmail,
        verify,
        setVerify,
        userEmail, setuserEmail,
        product , setProduct
    
         
        // setter for storing email
    };

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
};
