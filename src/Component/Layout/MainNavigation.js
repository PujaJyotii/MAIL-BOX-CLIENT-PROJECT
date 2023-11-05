import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../Redux/Auth";



import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

//import { useContext } from 'react';
//import AuthContext from '../Store/auth-context';


const MainNavigation = () => {
  
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  const navigation = useNavigate()
  const logoutHandler = () => {
    //authCtx.logout()
    dispatch(authActions.logout())
    navigation('/')
  }

  return (
    
    
         
          
    <div >
    <Navbar
      expand="lg"
      bg= "light"
      variant="light"
    >
      <Container>
        <Navbar.Brand href='#home' >Mails</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
              
                <Button variant="primary" type="submit" onClick={logoutHandler}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link href="/">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
    
  );
};

export default MainNavigation;
