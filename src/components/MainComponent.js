import React from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "./HeaderComponent";
import { Home } from "./HomeComponet";
import { About } from "./AboutUaComponent";
import { useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Login } from "./LoginComponent";
import { AuctionsList } from "./AuctionListingComponent";
export function Main(props){
    const location=useLocation()
    return(
        <React.Fragment>
        <Header/>
        <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={500}>
        <Switch>
        <Route path={"/login"} component={()=><Login as={location.pathname.split("/").pop()}/>} /> 
        <Route exact path={'/about'} component={About}/>
        <Route exact path="/auctions" component={AuctionsList}/>
        <Route path={"/"} component={Home} /> 
         
        </Switch>
        </CSSTransition>
        </TransitionGroup>
        </React.Fragment>
    )
}