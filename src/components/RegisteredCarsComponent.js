import React from "react";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react/cjs/react.development";
import { Button, Container,Col,Row ,Card,CardImg,CardBody,CardTitle,CardFooter,CardSubtitle} from "reactstrap";
import { apiServer } from "./HomeComponet";
export function RegisteredCars(props){
    const user=JSON.parse( localStorage.getItem("user"));
    const [Registeredcars,setRegisteredCars]=useState([]);
    useEffect(()=>{
        fetch(`${apiServer}/api/vehicle/vehicle/getRegisteredCars`,{
            method:"POST",
            mode:"cors",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
            ,body:JSON.stringify({CNIC:user.cnic})
        }).then(res=>res.json()).then(data=>{
            setRegisteredCars(data);
        })
    },[])
    let items = Registeredcars.map((car) => {
        return (
          <Col sm="12" md="4" lg="3" style={{ "box-shadow": "5px 10px 5px grey"}} key={car.regNo}>
            <Card>
              <CardImg src={apiServer+car.Image} height={"200px"}/>
              <CardBody>
                <CardTitle>
                  <h4 className="Headings">{car.name}</h4>
                </CardTitle>
                <CardSubtitle>
                  <b><h6>Model:{car.model}, Seats:{car.no_of_seats},Make:{car.manufacturer}</h6></b>
                </CardSubtitle>
              </CardBody>
              <CardFooter>
                  <Button outline color="dark">Set Car On Auction</Button>
              </CardFooter>
            </Card>
          </Col>
        )
      })
      if(RegisteredCars.length===0)
      items=(
          <h3>You dont have any registered cars on Car Tijarat</h3>
      )
    return(
        <Container>
            <Row>
           {items}
            </Row>
        </Container>
    )
}