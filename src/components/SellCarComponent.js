import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React from "react";
import { apiServer } from "./HomeComponet";
import { Container,Row,Col, Form, Input, Label, FormGroup, Button } from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function SellCar(props){
    const history=useHistory();
    const user=JSON.parse(window.localStorage.getItem("user"));
    console.log(user)
    const handleSubmit=(e)=>{
        e.preventDefault();
        
        const f=new FormData(e.target)
       const data=Object.fromEntries(f.entries());
        fetch(`${apiServer}/api/vehicle/vehicle/register`,{
            mode:'cors',
            method:'POST',
           
            credentials:'include',
            body:f
        }).then((res)=>res.josn()).then(saved=> {
            if(saved)
            {
                alert("Your Car is registered successfully!");
                history.replace("/home")
            }
    
        })
    }
    return(
        <Container className="SellCarContainer">
            <Row>
                <Col sm="12" md="6">

                </Col>
                <Col sm="12" md="12" className="FormContainer">
                    <h4 >Car Information</h4>
                    <hr/>
                    <Form id="registerCar" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <Row>
                        <Col md="6">
                        <FormGroup>
                        <Label for="name"> Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Car Name"/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="manufacturer"> Manufacturer</Label>
                        <Input type="text" name="manufacturer" id="manufacturer" placeholder="Make**"/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="modelNo">Model Year</Label>
                        <Input type="number" min={1980} max={2022} name="modelNo" id="modelNo" placeholder="Model"/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="no_of_seats">Seats</Label>
                        <Input type="number" min={2} max={15} name="no_of_seats" id="no_of_seats" placeholder="seats"/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="RegNO">Registration #</Label>
                        <Input type="text" minLength={7} maxLength={7} placeholder="Registration ###-###" name="RegNo"/>
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                        <Label for="body_type">Body Type</Label>
                        <Input type="select" name="body_type" id="body_type">
                        <option>SEDAN</option>
                        <option>SPORTS CAR</option>
                        <option>COUPE</option>
                        <option>HATCHBACK</option>
                        <option>CONVERTIBLE</option>
                        <option>SPORT-UTILITY VEHICLE (SUV) </option>
                        <option>MINIVAN</option>
                        <option>Other</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="km_driven">Kilometers driven</Label>
                        <Input type="number" placeholder="KM driven.." name="km_driven" id="km_driven" />
                        </FormGroup>
                        <FormGroup>
                        <Label for="fuel_type">Fuel Type</Label>
                        <Input type="select" name="fuel_type" id="body_type">
                        <option>Petrol</option>
                        <option>Diesel</option>
                        <option>Compressed natural gas (CNG)</option>
                        <option>Electric Charge</option>
                        <option>Hydrogen</option>
                        <option>Liquefied petroleum gas (LPG)</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="engine_type">Engine Type</Label>
                        <Input type="select" name="engine_type" id="body_type">
                        <option>Internal combustion engines.</option>
                        <option>Hybrid engine (Internal combustion engine + electric engine)</option>
                        <option>Electric engine</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">
                                Description
                            </Label>
                            <Input type="textarea" maxLength={200} name="description" id="description"/>
                        </FormGroup>
                        
                        <Input type="hidden" name="ownerCNIC" value={user.cnic}/>
                        </Col>
                        </Row>
                        <Col sm="12" md="6" className="offset-md-3">
                        <FormGroup>
                            <Label for="Image">
                                Image
                            </Label>
                            <Input type="file"  name="Image" id="Image"/>
                        </FormGroup>
                        </Col>
                        <Col sm="12" md="4" className="offset-md-4">
                            <Button className="m-auto expanded"  color="warning" type="submit">Submit</Button>
                        </Col>
                        
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}