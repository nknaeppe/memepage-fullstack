import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const MemepageNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Memepage</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#top">Top</Nav.Link>
            <Nav.Link href="#hot">Hot</Nav.Link>
            <Nav.Link href="#new">New</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <a id="upload"></a>
    </Navbar>
  );
};

export default MemepageNavbar;
