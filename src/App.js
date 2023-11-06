import {   Navigate, Route, Routes } from "react-router-dom";


import { useSelector } from "react-redux";


import LogInSignUp from "./Component/Pages/LogInSignUp";
import Welcome from "./Component/Pages/Welcome";
import Layout from "./Component/Layout/Layout";


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
    
      
      <Layout>
      <Routes>
      <Route path="/" element={!isLoggedIn ? <LogInSignUp /> : <Welcome />} />
        <Route path="/welcome" element={isLoggedIn ? <Welcome /> : null} />
        <Route path="*" element={<Navigate to="/" />} />
        
    </Routes>
    </Layout>
    
    </>
  );
}

export default App;

