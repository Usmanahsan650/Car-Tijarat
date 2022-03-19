import React from "react";
import Datetime from 'react-datetime';
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react/cjs/react.development";
import { Button, Container,Col,Row ,Card,CardImg,CardBody,CardTitle,CardFooter,CardSubtitle, Modal, ModalHeader, ModalBody, Form, Input, FormGroup, Label} from "reactstrap";
import { apiServer } from "./HomeComponent";

function validateDate(start,end){
  const d1=new Date(start);
  const d2=new Date(end);
  if(d2>d1)
 { return true
  }
  return false 
}

export function RegisteredCars(props){
    const user=JSON.parse( localStorage.getItem("user"));
    const [Registeredcars,setRegisteredCars]=useState([]);
    const [Auction,setAuction]=useState("");
    const [isOpen,SetIsOpen]=useState(false);
    const history=useHistory();

    useEffect(()=>{
        if(!user){
          history.replace('/login/seller')
        }
        else
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
      console.log(validateDate(target.start_date_time,target.end_date_time));
      const form=new FormData(target);
      const data=Object.fromEntries(form.entries());
      console.log(data);
      fetch(`${apiServer}/api/auction/register_for_auction`,{
        method:"POST",
        mode:"cors",
        headers:{
          'Content-Type':'application/json'
        },
        credentials:"include",
        body:JSON.stringify(data)
      }).then(res=>res.json()).then(res=>{alert(res)}).catch((err)=>{console.log(err)});

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
                  <b><h6>Model:{car.modelNo}, Seats:{car.no_of_seats}, Make:{car.manufacturer}</h6></b>
                </CardSubtitle>
              </CardBody>
              <CardFooter>
                  <Button onClick={()=>showForm(car.RegNo)} style={{"float":"right"}} color="success">Set Car On Auction</Button>
              </CardFooter>
            </Card>
          </Col>
        )
      })

    return(
        <div>
          
        <Container>
            <Row>
              <h3 className="Headings">Your cars</h3>
              { items.length > 0 ? items : <div>Currently you don't have any registered cars on Car Tijarat</div>}
            </Row>
        </Container>

        <Modal class="popup" isOpen={isOpen}toggle={()=>SetIsOpen(!isOpen)}>
          <ModalHeader> Register Auction for {Auction}</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
             <FormGroup>
              <label for="start_date_time">Auction Starting Date {"&"} Time</label>
             <Datetime className="inputBlack" dateFormat={"YYYY-M-DD"} timeFormat={"H:mm:ss"} inputProps={{required:true,name:"start_date_time", placeholder:"Starting Date&Time"}}/>
             </FormGroup>
             <FormGroup>
             <label for="end_date_time">Auction Ending date {"&"} time</label>  
              <Datetime className="inputBlack" dateFormat={"YYYY-M-DD"} timeFormat={"H:mm:ss"} inputProps={{required:true,name:"end_date_time",placeholder:"Ending Date&Time"}}/>
              </FormGroup>
              <FormGroup>
                <Label for="startingPrice">Starting Bid Price</Label>
              <Input className="inputBlack"  type="number" name="startingPrice"placeholder="Starting bid price(if any)"/>
              </FormGroup>
              <FormGroup>
              <label for="buyNow">Buy Now Clause Price</label>  
              <Input className="inputBlack" type="number" name="buyNow"placeholder="buy now price(if any)"/>
              </FormGroup>
              <Input type="hidden" name="sellerID" value={user?user.sellerID:null}/>
              <Input type="hidden" name="auc_vehicle" value={Auction}/>
              <Button  type="submit" outline color="dark" className="inputBlack expanded mt-2">Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
        </div>
    )
}