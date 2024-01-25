import { Navbar, Nav, Container, NavbarBrand, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector(state => state.cart);
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <NavbarBrand>Eshop</NavbarBrand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart" style={{marginRight: "20px", position: "relative"}}>
                <Nav.Link href="/cart"><FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="danger" style={{ position: "absolute", top: "3px", marginLeft: "-1px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link href="/login"><FaUser /> Login</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;