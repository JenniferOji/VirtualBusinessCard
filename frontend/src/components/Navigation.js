import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
  return (
        // the theme of the naviagtion bar 
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            {/* clicking virtual card text brings you to the loading screen of the app */}
            <Navbar.Brand href="../App" >Virtual Business Card</Navbar.Brand>
            <Nav className="me-auto">
                {/* the routes present on the navigation bar */}
              <Nav.Link href="/SignUp">Sign Up</Nav.Link>
              <Nav.Link href="/Login">Log in</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
  );
};

export default Navigation;