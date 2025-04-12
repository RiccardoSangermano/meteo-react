import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <Navbar  collapseOnSelect expand="lg"   style={{
      backgroundColor: '#4B0082',
      color: 'white',
      borderBottom: '1px solid rgba(182, 1, 210, 0.4)',
      fontSize: '1.2em',
    }} >
      <Container >
      <Link className="navbar-brand text-white" to={"/"}>
            Meteo Epicode
          </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features" className="text-white">About</Nav.Link>
            <Link className="nav-link text-white" to={"/"}>
                Home
              </Link>
           </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar