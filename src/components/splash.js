import React, { useState } from "react";

export function Splash(){
    const [className,setClass]=useState("splash");
    setTimeout(()=>setClass("display-none"),3000)

    return(
        <div className={className}>
            <div className="Splashlogo"> </div>
            <div className="loading"><div className="dot"></div> </div> 
        </div>
    )
}