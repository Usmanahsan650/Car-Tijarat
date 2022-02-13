import React from "react";
import { Route, Switch } from "react-router-dom";
import { Col, Container,Row } from "reactstrap";
import { Header } from "./HeaderComponent";
import { Home } from "./HomeComponet";
import { About } from "./AboutUaComponent";
import { useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
export function Main(props){
    const location=useLocation()
    return(
        <React.Fragment>
        <Header/>
        <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={500}>
        <Switch>
        <Route exact path={'/about'} component={About}/>
         <Route path={"/"} component={Home} /> 
        </Switch>
        </CSSTransition>
        </TransitionGroup>
        </React.Fragment>
    )
}