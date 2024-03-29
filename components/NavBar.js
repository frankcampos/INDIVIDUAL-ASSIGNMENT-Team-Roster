/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Nav>
          <Image src="/soccer__ball.png" alt="No Simple Books" style={{ height: '40px', backgroundColor: 'transparent' }} />
        </Nav>
        <Link passHref href="/team">
          <Navbar.Brand>Team</Navbar.Brand>

        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Your other navigation links */}
            <Link passHref href="/players">
              <Nav.Link>PLAYERS</Nav.Link>
            </Link>
          </Nav>
          <SearchBar />
          <Nav>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
