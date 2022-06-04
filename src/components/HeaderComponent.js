import { Link } from "react-router-dom";
import { Navbar, NavItem, NavbarToggler, NavbarBrand, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, Nav, Button, Collapse } from 'reactstrap'
import { useState } from "react";
import { useHistory } from "react-router-dom";


function Logout(setlogin){
    window.localStorage.removeItem("user")
    setlogin(false);
    fetch(`${process.env.REACT_APP_API_URL}/api/logout`,{
        method:"GET",
        credentials:"include",
        mode:"cors"
    })
    
}
export function Header(props) {
    const user=JSON.parse(window.localStorage.getItem("user"));
    const [isOpen, setIsOpen] = useState(false);
    const [LoginOpen, setLoginOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    const history = useHistory();

    return (<div id="Header">
        <Navbar id='navbar' dark expand="lg" >
            <NavbarBrand id="Logo" href="/" ><img alt="Car Tijarat" src="/LogoAlpha1.png" height={"25px"} width={"40px"} /></NavbarBrand>
            { props.loggedin===false?
            <Nav id="Login">
                <NavItem >
                    <Link to="/register"> 
                    <Button outline color="warning" className="mx-2">Register</Button>
                    </Link></NavItem>
                    
                <NavItem><div className="dropdown" style={{"marginRight":"10px"}}>

                    <ButtonDropdown isOpen={LoginOpen} toggle={() => setLoginOpen(!LoginOpen)}>
                        <DropdownToggle color="primary" caret >
                            Login
                        </DropdownToggle>
                        <DropdownMenu className="ddButton">
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
                    <ButtonDropdown isOpen={LoginOpen} toggle={() => setLoginOpen(!LoginOpen)}>
                        <DropdownToggle color="primary" caret >
                            Logged in 
                        </DropdownToggle>
                        <DropdownMenu style={{"backgroundColor":"#ffffff" ,"zIndex":"1"} } className="ddButton">
                            <DropdownItem header>{user.name}</DropdownItem>
                           <DropdownItem ><button className="transButton" onClick={()=>{Logout(props.setlogin); history.push('/'); }}>Logout</button></DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown></NavItem>
                </Nav>
                }   
                <NavbarToggler id='toggleButton' onClick={toggle} />
                <Collapse id='collapseableMenu' isOpen={isOpen} navbar>
                <Nav className="toggleOptions"> 
                        <NavItem >
                            <Link  to={"/"}><Button className="NavOptions mx-2"  color="light" outline>Home</Button></Link></NavItem>
                    </Nav>
                    <Nav className="toggleOptions">
                        <NavItem><Button className="NavOptions mx-2" color="light" outline>How It Works</Button></NavItem>
                    </Nav>
                    <Nav className="toggleOptions">
                        <NavItem>
                            <Link to="/auctions"><Button className="NavOptions mx-2"  color="light" outline>Auctions</Button>
                            </Link>
                        </NavItem>
                    </Nav>
                    <Nav className="toggleOptions">
                        <NavItem>
                            <Link to={"/complaint"}><Button className="NavOptions mx-2"  color="light" outline>Lodge Complaint</Button></Link></NavItem>
                    </Nav>
                    {/* <Nav className="toggleOptions">
                        <NavItem><Button className="NavOptions"  color="light" outline>Sell A Car</Button></NavItem>
                    </Nav> */}
                </Collapse>
               
                
        </Navbar>
    </div >)
}