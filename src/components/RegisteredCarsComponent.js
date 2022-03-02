import React from "react";
import Datetime from 'react-datetime';
import { useState } from "react/cjs/react.development";
import { useEffect } from "react/cjs/react.development";
import { Button, Container,Col,Row ,Card,CardImg,CardBody,CardTitle,CardFooter,CardSubtitle, Modal, ModalHeader, ModalBody, Form, Input, FormGroup, Label} from "reactstrap";
import { apiServer } from "./HomeComponet";
export function RegisteredCars(props){
    const user=JSON.parse( localStorage.getItem("user"));
    const [Registeredcars,setRegisteredCars]=useState([]);
    const [Auction,setAuction]=useState("");
    const [isOpen,SetIsOpen]=useState(false);
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
    let showForm=(regNo)=>{ 
      SetIsOpen(true);
      setAuction(regNo);
    }
    let handleSubmit=(e)=>{
      e.preventDefault();
      const target=e.target;
      console.log(target.end.value);

    }
    let items = Registeredcars.map((car) => {
        return (
          <Col sm="12" md="4" lg="3" style={{ "box-shadow": "5px 10px 5px grey"}} key={car.RegNo}>
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
                  <Button onClick={()=>showForm(car.RegNo)} outline color="dark">Set Car On Auction</Button>
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
        <div>
          
        <Container>
            <Row>
           {items}
            </Row>
        </Container>
        <Modal class="popup" isOpen={isOpen}toggle={()=>SetIsOpen(!isOpen)}>
          <ModalHeader> Register Auction for {Auction}</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
             <FormGroup>
              <label for="start_date_time">Auction Starting Date {"&"} Time</label>
             <Datetime  dateFormat={"YYYY-M-DD"} timeFormat={"H:mm:ss"} inputProps={{required:true,name:"start_date_time", placeholder:"Starting Date&Time"}}/>
             </FormGroup>
             <FormGroup>
             <label for="end_date_time">Auction Ending date {"&"} time</label>  
              <Datetime dateFormat={"YYYY-M-DD"} timeFormat={"H:mm:ss"} inputProps={{required:true,name:"end_date_time",placeholder:"Ending Date&Time"}}/>
              </FormGroup>
              <FormGroup>
                <Label for="startingPrice">Starting Bid Price</Label>
              <Input  type="number" name="startingPrice"placeholder="Starting bid price(if any)"/>
              </FormGroup>
              <FormGroup>
              <label for="buyNow">Buy Now Clause Price</label>  
              <Input type="number" name="buyNow"placeholder="buy now price(if any)"/>
              </FormGroup>
              <Input type="hidden" name="sellerID" value={user.sellerID}/>
              <Input type="hidden" name="aucVehicle" value={Auction}/>
              <Button type="submit" outline color="light" className="expanded mt-2">Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
        </div>
    )
}