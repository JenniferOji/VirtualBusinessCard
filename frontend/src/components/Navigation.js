import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Navigation = () => {
  // uses browser history to navigate to the previous page 
  const goBack = () => {
    window.history.back(); 
  };

  return (
        // the theme of the naviagtion bar 
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            {/* clicking virtual card text brings you to the loading screen of the app */}
            <Navbar.Brand href="/" >Virtual Business Card</Navbar.Brand>
            <Nav className="me-auto">
                {/* the routes present on the navigation bar */}
              <Nav.Link href="/SignUp">Sign Up</Nav.Link>
              <Nav.Link href="/Login">Log in</Nav.Link>
              {/* <img src="/images/back.png" alt="back" width={35} onClick={goBack}></img> */}
            </Nav>
          </Container>
      </Navbar>
  );
};

export default Navigation;