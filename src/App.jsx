import React, { useEffect } from "react";
import Login from "./components/Login";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";
import RouterPaths from "./components/RouterPaths";

// 
function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;    
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
       
       
      }
    }
  }, [token, dispatch])

  return (
    <div>
      {
        token ? <RouterPaths/> : <Login/>
      }
    </div>
   
  )
}

export default App


