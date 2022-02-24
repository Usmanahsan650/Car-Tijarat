import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem, NavbarToggler, NavbarBrand, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, Nav, Button, Collapse } from 'reactstrap'
export function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [LoginOpen, setLoginOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (<div id="Header">
        <Navbar id='navbar' dark expand="lg" >
            <NavbarBrand id="Logo" href="/" ><img src="/LogoAlpha1.png" height={"25px"} width={"40px"} /></NavbarBrand>
            { props.loggedin===false?
            <Nav id="Login">
                <NavItem> 
                    <Button style={{"marginRight":"5px"}} outline color="warning">Register</Button></NavItem>
                <NavItem><div className="dropdown" style={{"marginRight":"10px"}}>

                    <ButtonDropdown isOpen={LoginOpen} toggle={() => setLoginOpen(!LoginOpen)}>
                        <DropdownToggle color="primary" caret >
                            Login
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Login</DropdownItem>
                            <Link to="/login/seller"> <DropdownItem>As Seller</DropdownItem></Link>
                            <Link to="/login/buyer"><DropdownItem>As Buyer</DropdownItem></Link>
                            
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>

                </NavItem>
                </Nav>
                :
                <Nav>
                    <NavItem>
                        {
                            props.seller?
                            <p>Hey Seller</p>
                            :
                            <p>Hey Buyer</p>
                        }
                    </NavItem>
                    <NavItem>
                    <Button style={{"marginRight":"5px"}} outline color="primary">Logout</Button>
                    </NavItem>
                </Nav>
                }   
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