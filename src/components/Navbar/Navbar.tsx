import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import logo from '../../assets/fast-food_v1.png';
import './Navbar.css';

export default function NavbarComponent() {
    const [expanded, setExpanded] = React.useState(false);
    const handleClick = () => {
        setTimeout(() => {
            setExpanded(false);
        }, 200);
    };
    return (
        <Navbar
            collapseOnSelect
            expand="false"
            expanded={expanded}
            bg="dark"
            variant="dark"
            sticky="top"
            className="nav-component">
            <Container>
                <Navbar.Brand className="nav-brand">
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Eatery Generator logo"
                    />
                    Eatery Generator
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto nav-options" onClick={handleClick}>
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                        <Link to="/history" className="nav-link">
                            History
                        </Link>
                        <Link to="/eateries" className="nav-link">
                            Eateries
                        </Link>
                        <Link to="/data" className="nav-link">
                            Data
                        </Link>
                        <Link to="/favorites" className="nav-link">
                            Favorites
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
