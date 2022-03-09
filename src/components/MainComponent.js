import React from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "./HeaderComponent";
import { Home } from "./HomeComponet";
import { About } from "./AboutUaComponent";
import { useLocation } from "react-router-dom";
import { Login } from "./LoginComponent";
import { AuctionsList } from "./AuctionListingComponent";
import { useState } from "react/cjs/react.development";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { SellerOptions } from "./sellerOptionsComponent";
import { SellCar } from "./SellCarComponent";
import { useEffect } from "react";
import { RegisteredCars } from "./RegisteredCarsComponent";
import { ViewAuctionsList } from "./ViewYourAucComponent";
import AuctionRoom from "./AuctionRoom";
import { Register } from "./RegisterUserComponent";
 
export function Main(props){
    const [loggedin,setlogin]=useState(false);
    const [isSeller,setSeller]=useState(false);
    const [isBuyer,setBuyer]=useState(false);
    
    const location=useLocation();
    useEffect(()=>{
        let user=window.localStorage.getItem("user");
        console.log(user);
        user=JSON.parse(user);

   if(user) 
    {setlogin(true);
        if(user.sellerID){
            setSeller(true)
        }}
    else
    setlogin(false);
    
    },[]);

    return(
        <React.Fragment>

        <Header loggedin={loggedin} setlogin={setlogin} seller={isSeller} buyer={isBuyer}/>
        {
            loggedin && isSeller?
            <SellerOptions/>
            :
            <div></div>
        }

<TransitionGroup>
                <CSSTransition key={location.key} classNames="page" timeout={1000}>
        <Switch location={location}>

        <Route path={"/yourAuctions"} component={()=><ViewAuctionsList sellerID={JSON.parse(window.localStorage.getItem("user")).sellerID}/>} />
        
        <Route path="/auction-room/:AuctionID">
            <AuctionRoom />
        </Route>
        <Route path={"/register"} component={Register} />
        <Route path={"/registeredCars"} component={RegisteredCars} />
        <Route path={"/SellYourCar"} component={SellCar} />
        <Route path={"/login/seller"} component={()=><Login setlogin={setlogin} setSeller={setSeller} setBuyer={setBuyer} as={location.pathname.split("/").pop()}/>} /> 
        <Route path={"/login/buyer"} component={()=><Login setlogin={setlogin} setSeller={setSeller} setBuyer={setBuyer} as={location.pathname.split("/").pop()}/>} /> 
        <Route exact path={'/about'} component={About}/>
        <Route exact path="/auctions" component={AuctionsList}/>
        <Route path={"/"} component={Home} /> 
         
        </Switch>
        </CSSTransition>
        </TransitionGroup>

        </React.Fragment>
    )
}