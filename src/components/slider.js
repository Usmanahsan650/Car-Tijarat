import React from "react";
import { Crouselitems } from "../utils";
import { UncontrolledCarousel } from "reactstrap";
export function Slider(){
    return (
        <UncontrolledCarousel   controls={false} items={Crouselitems}/>
            )
    
}