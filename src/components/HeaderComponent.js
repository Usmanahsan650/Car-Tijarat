import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem, NavbarToggler, NavbarBrand, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, Nav, Button, Collapse } from 'reactstrap'
export function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [LoginOpen, setLoginOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (<div>
        <Navbar id='navbar' dark expand="lg" >
            <NavbarBrand id="Logo" href="/" ><img src="/logo.png" height={"40px"} width={"60px"} /></NavbarBrand>
                 
            <Nav id="Login">
                <NavItem><Button style={{"marginRight":"5px"}} color="warning">Register</Button></NavItem>
                <NavItem><div className="dropdown" style={{"marginRight":"10px"}}>
                    <ButtonDropdown isOpen={LoginOpen} toggle={() => setLoginOpen(!LoginOpen)}>
                        <DropdownToggle color="primary" caret >
                            Login
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Login</DropdownItem>
                            <Link to="/login/seller"> <DropdownItem>As Seller</DropdownItem></Link>
                            <DropdownItem>As Buyer</DropdownItem>
                            
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>

                </NavItem>
                </Nav>
                
                <NavbarToggler id='toggleButton' onClick={toggle} />
                <Collapse id='collapseableMenu' isOpen={isOpen} navbar>
                <Nav className="toggleOptions"> 
                        <NavItem >
                            <Link  to={"/"}><Button className="NavOptions"  color="light" outline>Home</Button></Link></NavItem>
                    </Nav>
                    <Nav className="toggleOptions">
                        <NavItem><Button className="NavOptions" color="light" outline>How It Works</Button></NavItem>
                    </Nav>
                    <Nav className="toggleOptions">
                        <NavItem>
                            <Link to={"/about"}><Button className="NavOptions"  color="light" outline>About Us</Button></Link></NavItem>
                    </Nav>
                    <Nav className="toggleOptions">
                        <NavItem>
                            <Link to="/auctions"><Button className="NavOptions"  color="light" outline>Auctions</Button>
                            </Link>
                            </NavItem>
                            
                    </Nav>
                    <Nav className="toggleOptions">
                        <NavItem><Button className="NavOptions"  color="light" outline>Sell A Car</Button></NavItem>
                    </Nav>
                </Collapse>
               
                
        </Navbar>
    </div >)
}