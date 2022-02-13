import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Navbar, NavItem, NavbarToggler, NavbarBrand, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, Nav, Button, Collapse } from 'reactstrap'
export function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [LoginOpen, setLoginOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (<div>
        <Navbar id='navbar' dark expand="lg" >
            <NavbarBrand href="/">Car Tijarat</NavbarBrand>
                 
            <Nav id="Login">
                <NavItem><Button style={{"marginRight":"5px"}} color="warning">Register</Button></NavItem>
                <NavItem><div className="dropdown" style={{"marginRight":"10px"}}>
                    <ButtonDropdown isOpen={LoginOpen} toggle={() => setLoginOpen(!LoginOpen)}>
                        <DropdownToggle color="primary" caret >
                            Login
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Login</DropdownItem>
                            <DropdownItem>As Seller</DropdownItem>
                            <DropdownItem>As Buyer</DropdownItem>
                            
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>

                </NavItem>
                </Nav>
                
                <NavbarToggler id='toggleButton' onClick={toggle} />
                <Collapse id='collapseableMenu' isOpen={isOpen} navbar>
                <Nav>
                        <NavItem>
                            <Link to={"/"}><Button color="light" outline>Home</Button></Link></NavItem>
                    </Nav>
                    <Nav>
                        <NavItem><Button color="light" outline>How It Works</Button></NavItem>
                    </Nav>
                    <Nav>
                        <NavItem>
                            <Link to={"/about"}><Button color="light" outline>About Us</Button></Link></NavItem>
                    </Nav>
                    <Nav>
                        <NavItem><Button color="light" outline>Auctions</Button></NavItem>
                    </Nav>
                    <Nav>
                        <NavItem><Button color="light" outline>Sell A Car</Button></NavItem>
                    </Nav>
                </Collapse>
               
                
        </Navbar>
    </div >)
}