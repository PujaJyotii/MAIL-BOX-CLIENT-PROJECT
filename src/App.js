import {     Route, Routes } from "react-router-dom";


import { useSelector } from "react-redux";


import LogInSignUp from "./Component/Pages/LogInSignUp";
import Welcome from "./Component/Pages/Welcome";
import Layout from "./Component/Layout/Layout";
import AllMails from "./Component/Pages/AllMails";


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
    
      
      <Layout>
      <Routes>
        {
          !isLoggedIn ? (
          <>
           <Route path="/" element={<LogInSignUp />} />
           
          </>
        ) :
        <>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome /> } /> 
        <Route path="/allmails" element={<AllMails /> } /> 
        
       
        </>}
      
        
        
        
    </Routes>
    </Layout>
    
    </>
  );
}

export default App;

